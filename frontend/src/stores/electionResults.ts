import { defineStore } from 'pinia'

import { getAllRidings } from '@/api/ridings'
import { getPoliticalParties } from '@/api/parties'
import { createRidingTableRow, mapRidingResult } from '@/mappers/ridings'
import { mapPoliticalParty } from '@/mappers/parties'

import type { ElectionFilters, ResultsMode, Outcome, MarginMeasure } from '@/types/filters'
import type { PaginationState } from '@/types/pagination'
import type { RidingSortKey, SortState } from '@/types/sorting'
import type { PoliticalParty } from '@/types/parties'
import type { RidingResult, RidingTableRow } from '@/types/ridings'

const createDefaultFilters = (): ElectionFilters => ({
  selectedPartyKey: null,
  resultsMode: 'all',
  outcome: 'both',
  marginMeasure: 'percentagePoints',
  maximumMarginVotes: 1_000,
  maximumMarginPercentagePoints: 10,
  ridingSearch: '',
})

const createDefaultSort = (): SortState => ({
  key: 'districtNumber',
  direction: 'ascending',
})

const createDefaultPagination = (): PaginationState => ({
  currentPage: 1,
  rowsPerPage: 5,
})

const filterRowsBySearch = (rows: RidingTableRow[], searchTerm: string): RidingTableRow[] => {
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('en-CA')

  if (!normalizedSearch) {
    return rows
  }

  return rows.filter((row) => {
    const districtName = row.districtName.toLocaleLowerCase('en-CA')
    const districtNumber = row.districtNumber.toString()

    return districtName.includes(normalizedSearch) || districtNumber.includes(normalizedSearch)
  })
}

const filterRowsBySwingCriteria = (
  rows: RidingTableRow[],
  filters: ElectionFilters,
): RidingTableRow[] => {
  if (!filters.selectedPartyKey || filters.resultsMode !== 'swing') {
    return rows
  }

  return rows.filter((row) => {
    const candidate = row.selectedParty

    if (!candidate) {
      return false
    }

    const matchesOutcome = filters.outcome === 'both' || candidate.outcome === filters.outcome

    const margin =
      filters.marginMeasure === 'votes' ? candidate.marginVotes : candidate.marginPercentagePoints

    const maximumMargin =
      filters.marginMeasure === 'votes'
        ? filters.maximumMarginVotes
        : filters.maximumMarginPercentagePoints

    return matchesOutcome && margin <= maximumMargin
  })
}

type SortValue = string | number | null

const sortValueGetters: Record<RidingSortKey, (row: RidingTableRow) => SortValue> = {
  districtName: (row) => row.districtName,
  districtNumber: (row) => row.districtNumber,

  winnerParty: (row) => row.winner.partyName,
  winnerVoteShare: (row) => row.winner.voteShare,
  winnerMarginVotes: (row) => row.winner.marginVotes,
  winnerMarginPercentagePoints: (row) => row.winner.marginPercentagePoints,

  selectedPartyVoteShare: (row) => row.selectedParty?.voteShare ?? null,
  selectedPartyMarginVotes: (row) => row.selectedParty?.marginVotes ?? null,
  selectedPartyMarginPercentagePoints: (row) => row.selectedParty?.marginPercentagePoints ?? null,
}

const compareSortValues = (firstValue: string | number, secondValue: string | number): number => {
  if (typeof firstValue === 'string' && typeof secondValue === 'string') {
    return firstValue.localeCompare(secondValue, 'en-CA', {
      sensitivity: 'base',
      numeric: true,
    })
  }

  return Number(firstValue) - Number(secondValue)
}

const sortRidingRows = (rows: RidingTableRow[], sort: SortState): RidingTableRow[] => {
  const getSortValue = sortValueGetters[sort.key]

  const directionMultiplier = sort.direction === 'ascending' ? 1 : -1

  return [...rows].sort((firstRow, secondRow) => {
    const firstValue = getSortValue(firstRow)
    const secondValue = getSortValue(secondRow)

    // Missing selected-party candidates remain at the end
    // regardless of sort direction.
    if (firstValue === null && secondValue === null) {
      return firstRow.districtNumber - secondRow.districtNumber
    }

    if (firstValue === null) {
      return 1
    }

    if (secondValue === null) {
      return -1
    }

    const comparison = compareSortValues(firstValue, secondValue) * directionMultiplier

    if (comparison !== 0) {
      return comparison
    }

    // Deterministic secondary ordering for equal values.
    return firstRow.districtNumber - secondRow.districtNumber
  })
}

interface ElectionResultsState {
  allRidingResults: RidingResult[]
  politicalParties: PoliticalParty[]
  filters: ElectionFilters
  sort: SortState
  pagination: PaginationState
  isLoading: boolean
  error: string | null
}

export const useElectionResultsStore = defineStore('electionResults', {
  state: (): ElectionResultsState => ({
    // API data
    allRidingResults: [],
    politicalParties: [],

    // Interaction state
    filters: createDefaultFilters(),
    sort: createDefaultSort(),
    pagination: createDefaultPagination(),

    // Request state
    isLoading: false,
    error: null,
  }),

  actions: {
    async loadElectionData(signal?: AbortSignal) {
      this.isLoading = true
      this.error = null

      try {
        const [apiRidingResults, apiPoliticalParties] = await Promise.all([
          getAllRidings(2025, signal),
          getPoliticalParties(signal),
        ])

        this.allRidingResults = apiRidingResults.map(mapRidingResult)
        this.politicalParties = apiPoliticalParties.map(mapPoliticalParty)
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        this.error = error instanceof Error ? error.message : 'Unable to load election data'
      } finally {
        this.isLoading = false
      }
    },

    changeSort(inKey: RidingSortKey) {
      if (this.sort.key === inKey) {
        this.sort.direction = this.sort.direction === 'ascending' ? 'descending' : 'ascending'
      } else {
        this.sort = {
          key: inKey,
          direction: 'ascending',
        }
      }

      this.pagination.currentPage = 1
    },

    setSelectedPartyKey(partyKey: string | null) {
      this.filters.selectedPartyKey = partyKey
      this.pagination.currentPage = 1

      if (partyKey === null) {
        this.filters.resultsMode = 'all'

        // Check if the sort criteria is not present in new results mode, and if not, assign default criteria
        if (
          this.sort.key === 'selectedPartyMarginPercentagePoints' ||
          this.sort.key === 'selectedPartyMarginVotes' ||
          this.sort.key === 'selectedPartyVoteShare'
        )
          this.sort = createDefaultSort()
      } else {
        // Check if the sort criteria is not present in new results mode, and if not, assign default criteria
        if (
          this.sort.key === 'winnerMarginPercentagePoints' ||
          this.sort.key === 'winnerMarginVotes'
        )
          this.sort = createDefaultSort()
      }
    },

    setResultsMode(resultsMode: ResultsMode) {
      this.filters.resultsMode = resultsMode
      this.pagination.currentPage = 1
    },

    setOutcome(outcome: Outcome) {
      this.filters.outcome = outcome
      this.pagination.currentPage = 1
    },

    setMarginMeasure(marginMeasure: MarginMeasure) {
      this.filters.marginMeasure = marginMeasure
      this.pagination.currentPage = 1
    },

    setMaximumMarginVotes(value: number) {
      this.filters.maximumMarginVotes = value
      this.pagination.currentPage = 1
    },

    setMaximumMarginPercentagePoints(value: number) {
      this.filters.maximumMarginPercentagePoints = value
      this.pagination.currentPage = 1
    },

    setRidingSearch(ridingSearch: string) {
      this.filters.ridingSearch = ridingSearch
      this.pagination.currentPage = 1
    },

    setCurrentPage(pageNumber: number) {
      const lastAvailablePage = Math.max(1, this.totalPages)

      this.pagination.currentPage = Math.min(Math.max(pageNumber, 1), lastAvailablePage)
    },

    reset() {
      this.filters = createDefaultFilters()
      this.sort = createDefaultSort()
      this.pagination = createDefaultPagination()
    },
  },
  getters: {
    tableRows(state): RidingTableRow[] {
      return state.allRidingResults.map((riding) =>
        createRidingTableRow(riding, state.filters.selectedPartyKey),
      )
    },
    filteredRows(state): RidingTableRow[] {
      const searchFilteredRows = filterRowsBySearch(this.tableRows, state.filters.ridingSearch)

      return filterRowsBySwingCriteria(searchFilteredRows, state.filters)
    },
    sortedRows(state): RidingTableRow[] {
      return sortRidingRows(this.filteredRows, state.sort)
    },
    hasSelectedParty: (state): boolean => state.filters.selectedPartyKey !== null,
    selectedPoliticalParty(state): PoliticalParty | null {
      if (!state.filters.selectedPartyKey) {
        return null
      }

      return (
        state.politicalParties.find((party) => party.partyKey === state.filters.selectedPartyKey) ??
        null
      )
    },
    filteredRowCount(): number {
      return this.filteredRows.length
    },
    totalPages(state): number {
      return Math.ceil(this.filteredRowCount / state.pagination.rowsPerPage)
    },
    paginatedRows(): RidingTableRow[] {
      const startIndex = (this.pagination.currentPage - 1) * this.pagination.rowsPerPage

      return this.sortedRows.slice(startIndex, startIndex + this.pagination.rowsPerPage)
    },

    firstVisibleResult(state): number {
      if (this.filteredRowCount === 0) {
        return 0
      }

      return (state.pagination.currentPage - 1) * state.pagination.rowsPerPage + 1
    },

    lastVisibleResult(state): number {
      if (this.filteredRowCount === 0) {
        return 0
      }

      return Math.min(
        state.pagination.currentPage * state.pagination.rowsPerPage,
        this.filteredRowCount,
      )
    },

    visiblePageNumbers(state): number[] {
      const maximumVisiblePages = 5

      if (this.totalPages <= maximumVisiblePages) {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1)
      }

      const pagesOnEachSide = Math.floor(maximumVisiblePages / 2)

      let firstPage = Math.max(1, state.pagination.currentPage - pagesOnEachSide)

      let lastPage = firstPage + maximumVisiblePages - 1

      if (lastPage > this.totalPages) {
        lastPage = this.totalPages
        firstPage = lastPage - maximumVisiblePages + 1
      }

      return Array.from({ length: maximumVisiblePages }, (_, index) => firstPage + index)
    },

    noFilteredRowsMessage(state): string {
      const noRidingsFoundWithSearch =
        filterRowsBySearch(this.tableRows, state.filters.ridingSearch).length === 0
      const noRidingsFoundWithSwingCriteria =
        filterRowsBySwingCriteria(this.tableRows, state.filters).length === 0

      if (noRidingsFoundWithSearch) {
        if (noRidingsFoundWithSwingCriteria)
          return 'No ridings match either the search term or the swing-riding criteria.'
        else return 'No ridings match the search term.'
      } else {
        if (noRidingsFoundWithSwingCriteria) return 'No ridings match the swing-riding criteria.'
        else return 'No ridings match both the search term and the swing-riding criteria.'
      }
    },
  },
})

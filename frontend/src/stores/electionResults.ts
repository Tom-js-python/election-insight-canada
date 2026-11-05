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

import { createDefaultFilters, createDefaultSort, createDefaultPagination } from '@/utils/defaults'
import {
  filterRowsBySearch,
  filterRowsBySwingCriteria,
  getNoFilteredRowsMessage,
} from '@/utils/filtering'
import { sortRidingRows } from '@/utils/sorting'
import { getVisiblePageNumbers } from '@/utils/pagination'

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
      this.filters.resultsMode = this.filters.selectedPartyKey === null ? 'all' : resultsMode

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
    paginatedRows(): RidingTableRow[] {
      const startIndex = (this.pagination.currentPage - 1) * this.pagination.rowsPerPage

      return this.sortedRows.slice(startIndex, startIndex + this.pagination.rowsPerPage)
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
    noFilteredRowsMessage(state): string {
      return getNoFilteredRowsMessage(this.tableRows, state.filters)
    },

    totalPages(state): number {
      return Math.ceil(this.filteredRowCount / state.pagination.rowsPerPage)
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
      return getVisiblePageNumbers(state.pagination.currentPage, this.totalPages)
    },
  },
})

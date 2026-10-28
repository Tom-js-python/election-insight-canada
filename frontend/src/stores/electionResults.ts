import { defineStore } from 'pinia'

import { getAllRidings } from '@/api/ridings'
import { getPoliticalParties } from '@/api/parties'
import { createRidingTableRow, mapRidingResult } from '@/mappers/ridings'
import { mapPoliticalParty } from '@/mappers/parties'

import type { ElectionFilters } from '@/types/filters'
import type { PaginationState } from '@/types/pagination'
import type { SortState } from '@/types/sorting'
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
  },
  getters: {
    ridingTableRows(state): RidingTableRow[] {
      return state.allRidingResults.map((riding) =>
        createRidingTableRow(riding, state.filters.selectedPartyKey),
      )
    },
  },
})

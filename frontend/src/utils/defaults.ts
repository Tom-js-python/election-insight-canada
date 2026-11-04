import type { ElectionFilters } from '@/types/filters'
import type { SortState } from '@/types/sorting'
import type { PaginationState } from '@/types/pagination'

export const createDefaultFilters = (): ElectionFilters => ({
  selectedPartyKey: null,
  resultsMode: 'all',
  outcome: 'both',
  marginMeasure: 'percentagePoints',
  maximumMarginVotes: 1_000,
  maximumMarginPercentagePoints: 10,
  ridingSearch: '',
})

export const createDefaultSort = (): SortState => ({
  key: 'districtNumber',
  direction: 'ascending',
})

export const createDefaultPagination = (): PaginationState => ({
  currentPage: 1,
  rowsPerPage: 5,
})

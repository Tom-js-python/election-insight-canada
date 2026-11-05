import type { RidingSortKey, SortState } from '@/types/sorting'
import type { RidingTableRow } from '@/types/ridings'

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

export const sortRidingRows = (rows: RidingTableRow[], sort: SortState): RidingTableRow[] => {
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

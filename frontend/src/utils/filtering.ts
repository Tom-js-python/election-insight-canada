import type { RidingTableRow } from '@/types/ridings'
import type { ElectionFilters } from '@/types/filters'

// normalize('NFD') splits accented characters into base and diacritical mark - then
// regex replacement removes diacritical marks
const removeAccents = (str: string): string => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const filterRowsBySearch = (
  rows: RidingTableRow[],
  searchTerm: string,
): RidingTableRow[] => {
  const normalizedSearch = removeAccents(searchTerm.trim().toLocaleLowerCase('en-CA'))

  if (!normalizedSearch) {
    return rows
  }

  return rows.filter((row) => {
    const districtName = removeAccents(row.districtName.toLocaleLowerCase('en-CA'))
    const districtNumber = row.districtNumber.toString()

    return districtName.includes(normalizedSearch) || districtNumber.includes(normalizedSearch)
  })
}

export const filterRowsBySwingCriteria = (
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

export const getNoFilteredRowsMessage = (
  rows: RidingTableRow[],
  filters: ElectionFilters,
): string => {
  const noRidingsFoundWithSearch = filterRowsBySearch(rows, filters.ridingSearch).length === 0
  const noRidingsFoundWithSwingCriteria = filterRowsBySwingCriteria(rows, filters).length === 0

  if (noRidingsFoundWithSearch) {
    if (noRidingsFoundWithSwingCriteria)
      return 'No ridings match either the search term or the swing-riding criteria.'
    else return 'No ridings match the search term.'
  } else {
    if (noRidingsFoundWithSwingCriteria) return 'No ridings match the swing-riding criteria.'
    else return 'No ridings match both the search term and the swing-riding criteria.'
  }
}

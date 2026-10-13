import { mapRidingResult, createRidingTableRow } from '@/mappers/ridings'
import {
  apiRidingResults,
  expectedConservativeTableRows,
  noGreenApiRidingResults,
  noGreenFilteredRidings,
  noWinnerApiRidingResults,
} from '@/mocks/electionResults'
import type { RidingResult } from '@/types/ridings'

describe('mapRidingResult and createTableRow', () => {
  it('converts API data into data appropriate for a riding table row', () => {
    const ridingResults = apiRidingResults.map(mapRidingResult)
    const result = ridingResults.map((riding) => createRidingTableRow(riding, 'conservative'))
    expect(result).toEqual(expectedConservativeTableRows)
  })

  it('throws an error when the riding has no winner', () => {
    const [riding] = noWinnerApiRidingResults.map(mapRidingResult)
    expect(() => createRidingTableRow(riding as RidingResult, 'conservative')).toThrow(
      'No winning candidate found for district 35001',
    )
  })

  it('returns null for selected party when party missing', () => {
    const ridingResults = noGreenApiRidingResults.map(mapRidingResult)
    const result = ridingResults.map((riding) => createRidingTableRow(riding, 'green'))
    expect(result).toEqual(noGreenFilteredRidings)
  })
})

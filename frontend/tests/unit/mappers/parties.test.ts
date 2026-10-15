import { mapPoliticalParty } from '@/mappers/parties'
import { apiPoliticalParties, politicalParties } from '@/mocks/politicalParties'

describe('mapPoliticalParties', () => {
  it('converts political party data from API type to front-end type', () => {
    const result = apiPoliticalParties.map(mapPoliticalParty)
    expect(result).toEqual(politicalParties)
  })
})

import { createPinia, setActivePinia } from 'pinia'

import { getPoliticalParties } from '@/api/parties'
import { getAllRidings } from '@/api/ridings'
import { apiPoliticalParties } from '@/mocks/politicalParties'
import { apiRidingResults } from '@/mocks/electionResults'
import { mapPoliticalParty } from '@/mappers/parties'
import { mapRidingResult } from '@/mappers/ridings'
import { useElectionResultsStore } from '@/stores/electionResults'

import type { ApiPoliticalParty } from '@/types/api/parties.ts'
import type { ApiRidingResult } from '@/types/api/ridings'

vi.mock('@/api/parties', () => ({
  getPoliticalParties: vi.fn<() => Promise<ApiPoliticalParty[]>>(),
}))

vi.mock('@/api/ridings', () => ({
  getAllRidings: vi.fn<() => Promise<ApiRidingResult[]>>(),
}))

describe('Election results store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('initializes with empty collections', () => {
      const store = useElectionResultsStore()

      expect(store.allRidingResults).toEqual([])
      expect(store.politicalParties).toEqual([])
    })

    it('initializes with the Conservative Party selected', () => {
      const store = useElectionResultsStore()

      expect(store.selectedPartyKey).toBe('conservative')
    })

    it('is initially neither loading nor in error', () => {
      const store = useElectionResultsStore()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('loadElectionData', () => {
    it('successfully populates parties and ridings', async () => {
      vi.mocked(getPoliticalParties).mockResolvedValue(apiPoliticalParties)

      vi.mocked(getAllRidings).mockResolvedValue(apiRidingResults)

      const store = useElectionResultsStore()

      await store.loadElectionData()

      expect(getPoliticalParties).toHaveBeenCalledOnce()
      expect(getAllRidings).toHaveBeenCalledOnce()

      expect(store.politicalParties).toEqual(apiPoliticalParties.map(mapPoliticalParty))

      expect(store.allRidingResults).toEqual(apiRidingResults.map(mapRidingResult))

      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })
  })
})

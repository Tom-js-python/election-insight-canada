import { createPinia, setActivePinia } from 'pinia'

import { getPoliticalParties } from '@/api/parties'
import { getAllRidings } from '@/api/ridings'
import { apiPoliticalParties } from '@/mocks/politicalParties'
import { apiRidingResults } from '@/mocks/electionResults'
import { mapPoliticalParty } from '@/mappers/parties'
import { mapRidingResult } from '@/mappers/ridings'
import { useElectionResultsStore } from '@/stores/electionResults'
import { expectedConservativeTableRows } from '@/mocks/electionResults'

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
    vi.resetAllMocks()
  })

  describe('state', () => {
    it('initializes with empty collections', () => {
      const store = useElectionResultsStore()

      expect(store.allRidingResults).toEqual([])
      expect(store.politicalParties).toEqual([])
    })

    it('initializes with correct filter defaults', () => {
      const store = useElectionResultsStore()

      expect(store.filters).toEqual({
        selectedPartyKey: null,
        resultsMode: 'all',
        outcome: 'both',
        marginMeasure: 'percentagePoints',
        maximumMarginVotes: 1_000,
        maximumMarginPercentagePoints: 10,
        ridingSearch: '',
      })
    })

    it('initializes with correct sort state defaults', () => {
      const store = useElectionResultsStore()

      expect(store.sort).toEqual({
        key: 'districtNumber',
        direction: 'ascending',
      })
    })

    it('initializes with correct pagination defaults', () => {
      const store = useElectionResultsStore()

      expect(store.pagination).toEqual({
        currentPage: 1,
        rowsPerPage: 5,
      })
    })

    it('is initially neither loading nor in error', () => {
      const store = useElectionResultsStore()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('loadElectionData', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
      vi.resetAllMocks()
    })

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

  it('stores the error and stops loading when a request fails', async () => {
    vi.mocked(getAllRidings).mockRejectedValue(new Error('Unable to load ridings'))

    vi.mocked(getPoliticalParties).mockResolvedValue(apiPoliticalParties)

    const store = useElectionResultsStore()

    await store.loadElectionData()

    expect(store.error).toBe('Unable to load ridings')
    expect(store.isLoading).toBe(false)
    expect(store.allRidingResults).toEqual([])
    expect(store.politicalParties).toEqual([])
  })

  it('clears a previous error when retrying successfully', async () => {
    vi.mocked(getAllRidings)
      .mockRejectedValueOnce(new Error('Unable to load ridings'))
      .mockResolvedValueOnce(apiRidingResults)

    vi.mocked(getPoliticalParties).mockResolvedValue(apiPoliticalParties)

    const store = useElectionResultsStore()

    await store.loadElectionData()

    expect(store.error).toBe('Unable to load ridings')

    await store.loadElectionData()

    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)

    expect(store.allRidingResults).toEqual(apiRidingResults.map(mapRidingResult))

    expect(store.politicalParties).toEqual(apiPoliticalParties.map(mapPoliticalParty))
  })

  it('does not store an error when loading is cancelled', async () => {
    const abortError = new DOMException('The operation was aborted', 'AbortError')

    vi.mocked(getAllRidings).mockRejectedValue(abortError)

    vi.mocked(getPoliticalParties).mockResolvedValue(apiPoliticalParties)

    const store = useElectionResultsStore()
    const controller = new AbortController()

    await store.loadElectionData(controller.signal)

    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('uses a fallback message for a non-Error rejection', async () => {
    vi.mocked(getAllRidings).mockRejectedValue('Non-Error rejection')

    vi.mocked(getPoliticalParties).mockResolvedValue(apiPoliticalParties)

    const store = useElectionResultsStore()

    await store.loadElectionData()

    expect(getAllRidings).toHaveBeenCalledOnce()
    expect(getPoliticalParties).toHaveBeenCalledOnce()

    expect(store.error).toBe('Unable to load election data')

    expect(store.isLoading).toBe(false)
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('creates table rows using the selected party', () => {
    const store = useElectionResultsStore()

    store.$patch({
      allRidingResults: apiRidingResults.map(mapRidingResult),
      filters: {
        selectedPartyKey: 'conservative',
      },
    })

    expect(store.ridingTableRows).toEqual(expectedConservativeTableRows)
  })

  it('reports whether a political party is selected', () => {
    const store = useElectionResultsStore()

    expect(store.hasSelectedParty).toBe(false)

    store.setSelectedPartyKey('conservative')

    expect(store.hasSelectedParty).toBe(true)
  })
})

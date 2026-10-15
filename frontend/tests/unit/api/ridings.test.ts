import { apiRidingResults } from '@/mocks/electionResults'
import { getAllRidings } from '@/api/ridings'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getAllRidings', () => {
  it('fetches and returns parsed ridings electon result JSON', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(apiRidingResults), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    const result = await getAllRidings(2025)

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://localhost:8000/ridings/all/2025', {
      signal: undefined,
    })
    expect(result).toEqual(apiRidingResults)
  })
})

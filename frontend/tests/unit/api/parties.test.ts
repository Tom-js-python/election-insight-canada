import { politicalParties } from '@/mocks/politicalParties'
import { getPoliticalParties } from '@/api/parties'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getPoliticalParties', () => {
  it('fetches and returns parsed political party JSON', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(politicalParties), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    const result = await getPoliticalParties()

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://localhost:8000/political-parties', {
      signal: undefined,
    })
    expect(result).toEqual(politicalParties)
  })
})

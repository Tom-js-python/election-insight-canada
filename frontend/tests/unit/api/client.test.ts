import { ApiError, getJson } from '@/api/client'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getJson', () => {
  it('fetches and returns parsed JSON', async () => {
    const responseData = {
      district_number: 35001,
      district_name: 'Ajax',
    }

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    const result = await getJson<typeof responseData>('/ridings/all/2025')

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://localhost:8000/ridings/all/2025', {
      signal: undefined,
    })
    expect(result).toEqual(responseData)
  })

  it('passes the abort signal to fetch', async () => {
    const controller = new AbortController()

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    await getJson<unknown[]>('/ridings/all/2025', controller.signal)

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/ridings/all/2025', {
      signal: controller.signal,
    })
  })

  it('throws an ApiError when the response is unsuccessful', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Resource not found', {
        status: 404,
        statusText: 'Not Found',
      }),
    )

    await expect(getJson('/missing-endpoint')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      statusText: 'Not Found',
    })
  })

  it('throws an instance of ApiError', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, {
        status: 500,
        statusText: 'Internal Server Error',
      }),
    )

    await expect(getJson('/broken-endpoint')).rejects.toBeInstanceOf(ApiError)
  })
})

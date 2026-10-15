const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not configured')
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(`API request failed with status ${status}: ${statusText}`)
    this.name = 'ApiError'
  }
}

export const getJson = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal,
  })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  const data = await response.json()

  // Note that JavaScript / TypeScript wraps the output of an asychronous function in a promise
  // that eventually resolves to type T
  return data as T
}

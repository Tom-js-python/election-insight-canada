describe('API client configuration', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('throws when VITE_API_BASE_URL is not configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')
    vi.resetModules()

    await expect(import('@/api/client')).rejects.toThrow('VITE_API_BASE_URL is not configured')
  })
})

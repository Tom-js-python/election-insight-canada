import { getJson } from './client.ts'

import type { ApiPoliticalParty } from '@/types/api/parties.ts'

export const getPoliticalParties = (signal?: AbortSignal): Promise<ApiPoliticalParty[]> =>
  getJson<ApiPoliticalParty[]>('/political-parties', signal)

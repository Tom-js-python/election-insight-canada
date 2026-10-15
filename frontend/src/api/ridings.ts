import { getJson } from './client.ts'

import type { ApiRidingResult } from '@/types/api/ridings.ts'

export const getAllRidings = (
  electionYear: number,
  signal?: AbortSignal,
): Promise<ApiRidingResult[]> => getJson<ApiRidingResult[]>(`/ridings/all/${electionYear}`, signal)

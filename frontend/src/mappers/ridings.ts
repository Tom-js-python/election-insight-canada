import type { ApiCandidateResult, ApiRidingResult } from '@/types/api/ridings.ts'

import type { CandidateResult, RidingResult, RidingTableRow } from '@/types/ridings.ts'

export const mapCandidateResult = (candidate: ApiCandidateResult): CandidateResult => ({
  candidateName: candidate.candidate_name,
  partyKey: candidate.party_key,
  partyName: candidate.party_name,
  voteCount: candidate.vote_count,
  voteShare: candidate.vote_share,
  outcome: candidate.outcome,
  marginVotes: candidate.margin_votes,
  marginPercentagePoints: candidate.margin_percentage_points,
})

export const mapRidingResult = (riding: ApiRidingResult): RidingResult => ({
  districtNumber: riding.district_number,
  districtName: riding.district_name,
  results: riding.results.map(mapCandidateResult),
})

export const createRidingTableRow = (
  riding: RidingResult,
  selectedPartyKey: string,
): RidingTableRow => {
  const winner = riding.results.find((candidate) => candidate.outcome === 'win')

  if (!winner) {
    throw new Error(`No winning candidate found for district ${riding.districtNumber}`)
  }

  const selectedParty =
    riding.results.find((candidate) => candidate.partyKey === selectedPartyKey) ?? null

  return {
    districtNumber: riding.districtNumber,
    districtName: riding.districtName,
    winner,
    selectedParty,
  }
}

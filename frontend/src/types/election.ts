interface CandidateResult {
  candidate_name: string
  party_name: string
  vote_count: number
}

interface RidingResult {
  district_number: number
  district_name: string
  results: CandidateResult[]
}

interface RidingSummary extends RidingResult {
  totalVotes: number
  winner: CandidateResult
  winnerShare: number
  selectedPartyResult?: CandidateResult
  selectedPartyShare?: number
  marginVotes?: number
  marginPercentagePoints?: number
}

export type { CandidateResult, RidingResult, RidingSummary }

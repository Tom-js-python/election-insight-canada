export interface CandidateResult {
  candidateName: string
  partyKey: string
  partyName: string
  voteCount: number
  voteShare: number
  outcome: 'win' | 'loss'
  marginVotes: number
  marginPercentagePoints: number
}

export interface RidingIdentity {
  districtNumber: number
  districtName: string
}

export interface RidingResult extends RidingIdentity {
  results: CandidateResult[]
}

export interface RidingTableRow extends RidingIdentity {
  winner: CandidateResult
  selectedParty: CandidateResult | null
}

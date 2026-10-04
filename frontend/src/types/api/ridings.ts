export interface ApiCandidateResult {
  candidate_name: string
  party_key: string
  party_name: string
  vote_count: number
  vote_share: number
  outcome: 'win' | 'loss'
  margin_votes: number
  margin_percentage_points: number
}

export interface ApiRidingIdentity {
  district_number: number
  district_name: string
}

export interface ApiRidingResult extends ApiRidingIdentity {
  results: ApiCandidateResult[]
}

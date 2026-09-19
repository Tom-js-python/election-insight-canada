interface SortState {
  key: string
  direction: 'ascending' | 'descending'
}

interface CandidateResult {
  candidateName: string
  partyKey: string
  partyName: string
  voteShare: number
}

interface RidingResult {
  districtNumber: number
  districtName: string
}

interface selectedPartyResult extends CandidateResult {
  outcome: 'win' | 'loss'
  marginVotes: number
  marginPercentagePoints: number
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

interface RidingTableRow extends RidingResult {
  winner: CandidateResult
  selectedParty: selectedPartyResult | null
  winningMarginVotes: number
  winningMarginPercentagePoints: number
}

export type { SortState, CandidateResult, RidingResult, RidingSummary, RidingTableRow }

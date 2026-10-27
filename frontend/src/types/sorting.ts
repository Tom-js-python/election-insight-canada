export type SortDirection = 'ascending' | 'descending'

export type RidingSortKey =
  | 'districtName'
  | 'districtNumber'
  | 'winnerParty'
  | 'winnerVoteShare'
  | 'winnerMarginVotes'
  | 'winnerMarginPercentagePoints'
  | 'selectedPartyVoteShare'
  | 'selectedPartyMarginVotes'
  | 'selectedPartyMarginPercentagePoints'

export interface SortState {
  key: RidingSortKey
  direction: SortDirection
}

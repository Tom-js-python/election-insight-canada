export type ResultsMode = 'all' | 'swing'
export type Outcome = 'both' | 'win' | 'loss'
export type MarginMeasure = 'votes' | 'percentagePoints'

export interface ElectionFilters {
  selectedPartyKey: string | null
  resultsMode: ResultsMode
  outcome: Outcome
  marginMeasure: MarginMeasure
  maximumMarginVotes: number
  maximumMarginPercentagePoints: number
  ridingSearch: string
}

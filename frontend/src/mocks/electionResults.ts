import type { RidingTableRow } from '@/types/election'

export const filteredRidings: RidingTableRow[] = [
  {
    districtNumber: 35001,
    districtName: 'Ajax',

    winner: {
      candidateName: 'Example Candidate',
      partyKey: 'liberal',
      partyName: 'Liberal Party of Canada',
      voteShare: 0.437,
    },

    selectedParty: {
      candidateName: 'Example Conservative',
      partyKey: 'conservative',
      partyName: 'Conservative Party of Canada',
      voteShare: 0.401,
      outcome: 'loss',
      marginVotes: 2_146,
      marginPercentagePoints: 3.6,
    },

    winningMarginVotes: 2_146,
    winningMarginPercentagePoints: 3.6,
  },
]

export const paginatedRidings: RidingTableRow[] = filteredRidings.slice(0, 10)

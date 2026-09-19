import type { RidingTableRow } from '@/types/election'

export const filteredRidings: RidingTableRow[] = [
  {
    districtNumber: 35001,
    districtName: 'Ajax',

    winner: {
      candidateName: 'Jennifer McKelvie',
      partyKey: 'liberal',
      partyName: 'Liberal',
      voteShare: 0.563214,
    },

    selectedParty: {
      candidateName: 'Greg Brady',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.3908302,
      outcome: 'loss',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },

    winningMarginVotes: 11_317,
    winningMarginPercentagePoints: 17.2384,
  },
  {
    districtNumber: 24020,
    districtName: 'Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata',

    winner: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.4583598,
    },

    selectedParty: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.4583598,
      outcome: 'win',
      marginVotes: 9_776,
      marginPercentagePoints: 15.519431,
    },

    winningMarginVotes: 9_776,
    winningMarginPercentagePoints: 15.519431,
  },
  {
    districtNumber: 24066,
    districtName: 'Saint-Hyacinthe--Bagot--Acton',

    winner: {
      candidateName: 'Simon-Pierre Savard-Tremblay',
      partyKey: 'bloc',
      partyName: 'Bloc Québécois',
      voteShare: 0.4388473,
    },

    selectedParty: {
      candidateName: 'Gaëtan Deschênes',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.1798882,
      outcome: 'loss',
      marginVotes: 15_016,
      marginPercentagePoints: 25.89590591,
    },

    winningMarginVotes: 5_943,
    winningMarginPercentagePoints: 10.249026,
  },
  {
    districtNumber: 62001,
    districtName: 'Nunavut',

    winner: {
      candidateName: 'Lori Idlout',
      partyKey: 'ndp',
      partyName: 'New Democratic Party',
      voteShare: 0.3726,
    },

    selectedParty: {
      candidateName: 'James T. Arreak',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.2601541,
      outcome: 'loss',
      marginVotes: 861,
      marginPercentagePoints: 11.24461,
    },

    winningMarginVotes: 41,
    winningMarginPercentagePoints: 0.53546,
  },
  {
    districtNumber: 59029,
    districtName: 'Saanich--Gulf Islands',

    winner: {
      candidateName: 'Elizabeth May',
      partyKey: 'green',
      partyName: 'Green Party of Canada',
      voteShare: 0.39103,
    },

    selectedParty: {
      candidateName: 'Cathie Ounsted',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.2508585,
      outcome: 'loss',
      marginVotes: 11_184,
      marginPercentagePoints: 14.0175,
    },

    winningMarginVotes: 5_790,
    winningMarginPercentagePoints: 7.256912,
  },
]

export const paginatedRidings: RidingTableRow[] = filteredRidings.slice(0, 10)

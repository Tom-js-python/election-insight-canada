import type { RidingTableRow } from '@/types/ridings'

export const filteredRidings: RidingTableRow[] = [
  {
    districtNumber: 35001,
    districtName: 'Ajax',

    winner: {
      candidateName: 'Jennifer McKelvie',
      partyKey: 'liberal',
      partyName: 'Liberal',
      voteCount: 36975,
      voteShare: 0.563214,
      outcome: 'win',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },

    selectedParty: {
      candidateName: 'Greg Brady',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 25658,
      voteShare: 0.3908302,
      outcome: 'loss',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },
  },
  {
    districtNumber: 24020,
    districtName: 'Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata',

    winner: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 28_873,
      voteShare: 0.4583598,
      outcome: 'win',
      marginVotes: 9_776,
      marginPercentagePoints: 15.519431,
    },

    selectedParty: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 28_873,
      voteShare: 0.4583598,
      outcome: 'win',
      marginVotes: 9_776,
      marginPercentagePoints: 15.519431,
    },
  },
  {
    districtNumber: 24066,
    districtName: 'Saint-Hyacinthe--Bagot--Acton',

    winner: {
      candidateName: 'Simon-Pierre Savard-Tremblay',
      partyKey: 'bloc',
      partyName: 'Bloc Québécois',
      voteCount: 25_447,
      voteShare: 0.4388473,
      outcome: 'win',
      marginVotes: 5_943,
      marginPercentagePoints: 10.249026,
    },

    selectedParty: {
      candidateName: 'Gaëtan Deschênes',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 10_431,
      voteShare: 0.1798882,
      outcome: 'loss',
      marginVotes: 15_016,
      marginPercentagePoints: 25.89590591,
    },
  },
  {
    districtNumber: 62001,
    districtName: 'Nunavut',

    winner: {
      candidateName: 'Lori Idlout',
      partyKey: 'ndp',
      partyName: 'New Democratic Party',
      voteCount: 2_853,
      voteShare: 0.3726,
      outcome: 'win',
      marginVotes: 41,
      marginPercentagePoints: 0.53546,
    },

    selectedParty: {
      candidateName: 'James T. Arreak',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 1_992,
      voteShare: 0.2601541,
      outcome: 'loss',
      marginVotes: 861,
      marginPercentagePoints: 11.24461,
    },
  },
  {
    districtNumber: 59029,
    districtName: 'Saanich--Gulf Islands',

    winner: {
      candidateName: 'Elizabeth May',
      partyKey: 'green',
      partyName: 'Green Party of Canada',
      voteCount: 31_199,
      voteShare: 0.39103,
      outcome: 'win',
      marginVotes: 5_790,
      marginPercentagePoints: 7.256912,
    },

    selectedParty: {
      candidateName: 'Cathie Ounsted',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 20_015,
      voteShare: 0.2508585,
      outcome: 'loss',
      marginVotes: 11_184,
      marginPercentagePoints: 14.0175,
    },
  },
]

export const paginatedRidings: RidingTableRow[] = filteredRidings.slice(0, 10)

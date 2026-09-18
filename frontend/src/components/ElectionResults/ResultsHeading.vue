<template>
  <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
    <p aria-live="polite" class="text-sm font-medium text-slate-900 dark:text-slate-100">
      {{ filteredRidings.length }} ridings
    </p>

    <p class="text-xs text-slate-500 dark:text-slate-400">
      Select a column heading to sort. Select a riding for all candidates.
    </p>
  </div>
</template>

<script lang="ts">
interface RidingTableRow {
  districtNumber: number
  districtName: string

  winner: {
    candidateName: string
    partyKey: string
    partyName: string
    voteShare: number
  }

  selectedParty: {
    candidateName: string
    partyKey: string
    partyName: string
    voteShare: number
    outcome: 'win' | 'loss'
    marginVotes: number
    marginPercentagePoints: number
  } | null

  winningMarginVotes: number
  winningMarginPercentagePoints: number
}

export default {
  name: 'ResultsHeading',
  data() {
    return {
      filteredRidings: [
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
      ] as RidingTableRow[],
    }
  },
}
</script>

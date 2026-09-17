<template>
  <footer
    class="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
  >
    <p class="text-xs text-slate-500">
      Showing {{ firstVisibleResult }}–{{ lastVisibleResult }} of {{ filteredRidings.length }}
    </p>

    <nav class="flex items-center gap-1" aria-label="Table pages">
      <button
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        type="button"
        class="min-h-[36px] min-w-[36px] rounded-md border px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        :class="
          pageNumber === currentPage
            ? 'border-red-700 bg-red-700 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
        "
        :aria-current="pageNumber === currentPage ? 'page' : undefined"
        @click="currentPage = pageNumber"
      >
        {{ pageNumber }}
      </button>
    </nav>
  </footer>
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
  data() {
    return {
      firstVisibleResult: 1,
      lastVisibleResult: 1,
      pageNumbers: 3,
      currentPage: 1,
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

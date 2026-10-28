<template>
  <main class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <page-heading />

    <p v-if="isLoading" role="status">Loading election results…</p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <template v-else>
      <election-filters :political-parties="politicalParties" />

      <results-heading :total-results="ridingTableRows.length" />

      <div
        class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <riding-results-table :ridings="ridingTableRows" />

        <page-footer :total-results="ridingTableRows.length" />
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import ElectionFilters from '@/components/ElectionResults/ElectionFilters.vue'
import PageFooter from '@/components/ElectionResults/PageFooter.vue'
import PageHeading from '@/components/ElectionResults/PageHeading.vue'
import ResultsHeading from '@/components/ElectionResults/ResultsHeading.vue'
import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'

import { mapActions, mapState } from 'pinia'

import { useElectionResultsStore } from '@/stores/electionResults'

interface ElectionResultsViewData {
  controller: AbortController
}

export default {
  name: 'ElectionResultsView',

  components: {
    PageHeading,
    ElectionFilters,
    ResultsHeading,
    RidingResultsTable,
    PageFooter,
  },

  data(): ElectionResultsViewData {
    return {
      controller: new AbortController(),
    }
  },

  computed: {
    ...mapState(useElectionResultsStore, [
      'politicalParties',
      'ridingTableRows',
      'isLoading',
      'error',
    ]),
  },

  async mounted() {
    await this.loadElectionData(this.controller.signal)
  },

  beforeUnmount() {
    this.controller.abort()
  },

  methods: {
    ...mapActions(useElectionResultsStore, ['loadElectionData']),
  },
}
</script>

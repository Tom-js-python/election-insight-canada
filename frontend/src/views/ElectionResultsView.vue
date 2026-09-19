<template>
  <main class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <page-heading />
    <election-filters />
    <results-heading />
    <div
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <riding-results-table />
      <page-footer />
    </div>
  </main>
</template>

<script lang="ts">
import PageHeading from '@/components/ElectionResults/PageHeading.vue'
import ElectionFilters from '@/components/ElectionResults/ElectionFilters.vue'
import ResultsHeading from '@/components/ElectionResults/ResultsHeading.vue'
import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'
import PageFooter from '@/components/ElectionResults/PageFooter.vue'

export default {
  name: 'ElectionResultsView',
  components: {
    PageHeading,
    ElectionFilters,
    ResultsHeading,
    RidingResultsTable,
    PageFooter,
  },
}
</script>

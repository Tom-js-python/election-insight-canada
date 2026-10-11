<template>
  <main class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <page-heading />
    <election-filters />
    <results-heading :total-results="paginatedRidings.length" />
    <div
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <riding-results-table :ridings="paginatedRidings" />
      <page-footer :total-results="paginatedRidings.length" />
    </div>
  </main>
</template>

<script lang="ts">
import PageHeading from '@/components/ElectionResults/PageHeading.vue'
import ElectionFilters from '@/components/ElectionResults/ElectionFilters.vue'
import ResultsHeading from '@/components/ElectionResults/ResultsHeading.vue'
import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'
import PageFooter from '@/components/ElectionResults/PageFooter.vue'

import { getAllRidings } from '@/api/ridings'
import { createRidingTableRow, mapRidingResult } from '@/mappers/ridings'
import type { RidingTableRow } from '@/types/ridings'

interface MyComponentData {
  paginatedRidings: RidingTableRow[]
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
  data(): MyComponentData {
    return {
      paginatedRidings: [],
      controller: new AbortController(),
    }
  },
  async mounted() {
    try {
      const apiRidingResults = await getAllRidings(2025, this.controller.signal)
      const ridingResults = apiRidingResults.map(mapRidingResult)
      this.paginatedRidings = ridingResults.map((riding) =>
        createRidingTableRow(riding, 'conservative'),
      )
    } catch (error) {
      console.error('Unable to load riding results', error)
    }
  },
  unmounted() {
    this.controller.abort()
  },
}
</script>

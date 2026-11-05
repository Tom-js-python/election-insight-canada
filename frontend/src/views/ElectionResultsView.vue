<template>
  <main class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <page-heading />

    <p v-if="isLoading" role="status">Loading election results…</p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <template v-else>
      <election-filters />

      <template v-if="filteredRowCount > 0">
        <results-heading :total-results="filteredRowCount" />

        <div
          class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <riding-results-table :ridings="paginatedRows" />

          <page-footer
            :current-page="pagination.currentPage"
            :total-pages="totalPages"
            :visible-page-numbers="visiblePageNumbers"
            :total-results="filteredRowCount"
            :first-visible-result="firstVisibleResult"
            :last-visible-result="lastVisibleResult"
            @page-change="setCurrentPage"
          />
        </div>
      </template>
      <p
        v-else
        role="status"
        class="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-lg font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
      >
        {{ noFilteredRowsMessage }}
      </p>
    </template>
  </main>
</template>

<script lang="ts">
import ElectionFilters from '@/components/ElectionResults/ElectionFilters/ElectionFilters.vue'
import PageFooter from '@/components/ElectionResults/PageFooter.vue'
import PageHeading from '@/components/ElectionResults/PageHeading.vue'
import ResultsHeading from '@/components/ElectionResults/ResultsHeading.vue'
import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable/RidingResultsTable.vue'

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
      'pagination',
      'totalPages',
      'visiblePageNumbers',
      'paginatedRows',
      'filteredRowCount',
      'noFilteredRowsMessage',
      'firstVisibleResult',
      'lastVisibleResult',
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
    ...mapActions(useElectionResultsStore, ['loadElectionData', 'setCurrentPage']),
  },
}
</script>

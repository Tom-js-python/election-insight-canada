<template>
  <footer
    class="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
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
import { filteredRidings } from '@/mocks/electionResults'

export default {
  name: 'PageFooter',
  data() {
    return {
      firstVisibleResult: 1,
      lastVisibleResult: 1,
      pageNumbers: 3,
      currentPage: 1,
      filteredRidings,
    }
  },
}
</script>

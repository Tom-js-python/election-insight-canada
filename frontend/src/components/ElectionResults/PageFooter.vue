<template>
  <footer
    class="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
  >
    <p class="text-xs text-slate-500">
      Showing {{ firstVisibleResult }}–{{ lastVisibleResult }} of {{ totalResults }}
    </p>

    <nav aria-label="Results pages" class="flex items-center gap-1">
      <button
        v-if="currentPage !== 1"
        type="button"
        aria-label="Go to first page"
        class="pagination-button"
        @click="$emit('pageChange', 1)"
      >
        «
      </button>

      <button
        v-if="currentPage !== 1"
        type="button"
        aria-label="Go to previous page"
        class="pagination-button"
        @click="$emit('pageChange', currentPage - 1)"
      >
        ‹
      </button>

      <button
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        type="button"
        :aria-label="`Go to page ${pageNumber}`"
        :aria-current="pageNumber === currentPage ? 'page' : undefined"
        :class="[
          'h-9 min-w-9 rounded-md px-2 text-sm font-medium',
          pageNumber === currentPage
            ? 'bg-red-700 text-white'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        ]"
        @click="$emit('pageChange', pageNumber)"
      >
        {{ pageNumber }}
      </button>

      <button
        v-if="currentPage !== totalPages"
        type="button"
        aria-label="Go to next page"
        class="pagination-button"
        @click="$emit('pageChange', currentPage + 1)"
      >
        ›
      </button>

      <button
        v-if="currentPage !== totalPages"
        type="button"
        aria-label="Go to last page"
        class="pagination-button"
        @click="$emit('pageChange', totalPages)"
      >
        »
      </button>
    </nav>
  </footer>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {
  name: 'PageFooter',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    visiblePageNumbers: {
      type: Array as PropType<number[]>,
      required: true,
    },
    totalResults: {
      type: Number,
      required: true,
    },
    firstVisibleResult: {
      type: Number,
      required: true,
    },
    lastVisibleResult: {
      type: Number,
      required: true,
    },
  },
  emits: ['pageChange'],
}
</script>

<style scoped>
.pagination-button {
  @apply h-9 min-w-9 rounded-md px-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800;
}
</style>

<template>
  <div class="flex justify-end pt-2">
    <button
      type="button"
      class="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
      @click="reset"
    >
      Reset
    </button>
  </div>
</template>

<script lang="ts">
import { useElectionResultsStore } from '@/stores/electionResults'
import { mapActions } from 'pinia'

export default {
  name: 'ResetButton',

  methods: {
    ...mapActions(useElectionResultsStore, ['reset']),
  },
}
</script>

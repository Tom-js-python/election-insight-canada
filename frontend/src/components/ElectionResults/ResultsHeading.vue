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
import { filteredRidings } from '@/mocks/electionResults'

export default {
  name: 'ResultsHeading',
  data() {
    return {
      filteredRidings,
    }
  },
}
</script>

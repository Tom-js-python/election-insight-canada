<template>
  <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 class="text-2xl font-medium tracking-tight sm:text-3xl">General election results</h1>

      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Compare winners, vote shares and margins across Canada's 343 ridings.
      </p>
    </div>

    <label class="flex w-full flex-col gap-1.5 md:w-52">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Election </span>

      <select
        v-model="selectedElection"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <option value="2025">2025 general election</option>
      </select>
    </label>
  </section>
</template>

<script lang="ts">
export default {
  name: 'PageHeading',
  data() {
    return {
      selectedElection: 2025,
    }
  },
}
</script>

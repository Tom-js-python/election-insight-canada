<template>
  <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 class="text-2xl font-medium tracking-tight sm:text-3xl">General election results</h1>

      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Compare winners, vote shares and margins across Canada's 343 ridings.
      </p>
    </div>

    <div class="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-end md:gap-4">
      <p id="election-help" class="text-xs text-slate-500 dark:text-slate-500 md:pb-2.5">
        Additional elections will be added later.
      </p>

      <label class="flex w-full flex-col gap-1.5 md:w-52">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-500"> Election </span>

        <select
          disabled
          aria-describedby="election-help"
          class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:disabled:border-slate-800 dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
        >
          <option value="2025">2025 general election</option>
        </select>
      </label>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'PageHeading',
}
</script>

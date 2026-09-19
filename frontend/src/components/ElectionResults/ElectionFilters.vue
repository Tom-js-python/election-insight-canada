<template>
  <form
    class="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-6 dark:border-slate-800 dark:bg-slate-900"
    @submit.prevent
  >
    <label class="flex flex-col gap-1.5 sm:col-span-2">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Riding </span>

      <input
        v-model.trim="filters.search"
        type="search"
        placeholder="Name or district number"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
      />
    </label>

    <label class="flex flex-col gap-1.5">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Party </span>

      <select
        v-model="filters.party"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
      >
        <option value="">All parties</option>

        <option v-for="party in partyNames" :key="party" :value="party">
          {{ party }}
        </option>
      </select>
    </label>

    <label class="flex flex-col gap-1.5">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Outcome </span>

      <select
        v-model="filters.outcome"
        :disabled="!filters.party"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
      >
        <option value="both">Win or loss</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
    </label>

    <label class="flex flex-col gap-1.5">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400">
        Margin measured by
      </span>

      <select
        v-model="filters.marginType"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
      >
        <option value="votes">Votes</option>
        <option value="percentage">Percentage points</option>
      </select>
    </label>

    <label class="flex flex-col gap-1.5">
      <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Maximum margin </span>

      <input
        v-model.number="filters.maximumMargin"
        type="number"
        min="0"
        :step="filters.marginType === 'votes' ? 1 : 0.1"
        class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm tabular-nums focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
      />
    </label>

    <div class="flex items-end lg:col-start-6">
      <button
        type="button"
        class="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="resetFilters"
      >
        Reset
      </button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: 'ElectionFilters',
  data() {
    return {
      filters: {
        outcome: 'win',
        party: 'Conservative',
        marginType: 'votes',
        search: '',
        maximumMargin: 100,
      },
      partyNames: [
        'Animal Protection Party',
        'Bloc Québécois',
        'Canadian Future Party',
        'Centrist',
        'Christian Heritage Party',
        'Communist',
        'Conservative',
        'Green Party of Canada',
        'Independent',
        'Liberal',
        'Libertarian',
        'Marijuana Party',
        'Marxist-Leninist',
        'New Democratic Party',
        'No Affiliation',
        "People's Party of Canada",
        'Rhinoceros Party',
        'United Party of Canada',
      ],
    }
  },
  methods: {
    resetFilters() {
      this.filters.outcome = 'win'

      this.filters.party = 'Conservative'
      this.filters.marginType = 'votes'
      this.filters.search = ''
      this.filters.maximumMargin = 100
    },
  },
}
</script>

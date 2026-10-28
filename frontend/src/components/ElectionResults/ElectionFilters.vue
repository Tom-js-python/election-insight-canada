<template>
  <form
    class="mb-6 grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    @submit.prevent
  >
    <div class="grid content-start gap-4 sm:grid-cols-2 lg:pt-9">
      <label class="flex flex-col gap-1.5">
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

          <option v-for="party in politicalParties" :key="party.partyKey" :value="party.partyKey">
            {{ party.longDisplayNameEnglish }}
          </option>
        </select>
      </label>

      <fieldset class="flex justify-start sm:col-span-2 lg:pt-4">
        <legend class="sr-only">Results</legend>

        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span aria-hidden="true" class="text-sm font-medium text-slate-900 dark:text-slate-100">
            Results
          </span>

          <label class="inline-flex items-center gap-2">
            <input
              v-model="filters.resultsMode"
              type="radio"
              name="results-mode"
              value="all"
              class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600"
            />

            <span class="text-sm text-slate-700 dark:text-slate-300"> All ridings </span>
          </label>

          <label class="inline-flex items-center gap-2">
            <input
              v-model="filters.resultsMode"
              type="radio"
              name="results-mode"
              value="swing"
              class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600"
            />

            <span class="text-sm text-slate-700 dark:text-slate-300"> Swing ridings </span>
          </label>
        </div>
      </fieldset>
    </div>

    <fieldset
      class="rounded-lg border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/30"
    >
      <legend class="px-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
        Find swing ridings
      </legend>

      <div class="grid gap-4 sm:grid-cols-3">
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Outcome </span>

          <select
            v-model="filters.outcome"
            :disabled="!filters.party"
            class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950"
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
            v-model="filters.marginMeasure"
            class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="votes">Votes</option>
            <option value="percentagePoints">Percentage points</option>
          </select>
        </label>

        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-slate-600 dark:text-slate-400">
            Maximum margin
          </span>

          <input
            v-model.number="filters.maximumMargin"
            type="number"
            min="1"
            :step="filters.marginMeasure === 'votes' ? 1 : 0.1"
            class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm tabular-nums focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>

        <div class="flex justify-end sm:col-span-3">
          <button
            type="button"
            class="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
            @click="resetFilters"
          >
            Reset
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import type { PoliticalParty } from '@/types/parties'
import type { PropType } from 'vue'
import type { Outcome, MarginMeasure } from '@/types/filters'

interface MyComponentData {
  filters: {
    outcome: Outcome
    party: string
    resultsMode: string
    marginMeasure: MarginMeasure
    search: string | null
    maximumMargin: number
  }
}

export default {
  name: 'ElectionFilters',
  props: {
    politicalParties: {
      type: Array as PropType<PoliticalParty[]>,
      required: true,
    },
  },
  data(): MyComponentData {
    return {
      filters: {
        outcome: 'win',
        resultsMode: 'all',
        party: 'conservative',
        marginMeasure: 'votes',
        search: null,
        maximumMargin: 100,
      },
    }
  },

  methods: {
    resetFilters() {
      this.filters.outcome = 'win'
      this.filters.party = 'conservative'
      this.filters.marginMeasure = 'votes'
      this.filters.search = null
      this.filters.maximumMargin = 100
    },
  },
}
</script>

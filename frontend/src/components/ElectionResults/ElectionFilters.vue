<template>
  <form
    class="mb-6 grid grid-cols-1 gap-x-6 gap-y-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    @submit.prevent
  >
    <div class="grid content-start gap-4 sm:grid-cols-2 lg:pt-7">
      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Riding </span>

        <input
          v-model.trim="ridingSearch"
          type="search"
          placeholder="Name or district number"
          class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
        />
      </label>

      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Party </span>

        <select
          v-model="selectedPartyKey"
          class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="">All parties</option>

          <option v-for="party in politicalParties" :key="party.partyKey" :value="party.partyKey">
            {{ party.longDisplayNameEnglish }}
          </option>
        </select>
      </label>

      <fieldset
        :disabled="resultsModeDisabled"
        :aria-describedby="resultsModeDisabled ? 'results-mode-help' : undefined"
        class="sm:col-span-2 lg:pt-4"
      >
        <legend class="sr-only">Results</legend>

        <div class="flex flex-col items-start gap-1">
          <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span
              aria-hidden="true"
              :class="[
                'text-sm font-medium transition-colors',
                resultsModeDisabled
                  ? 'text-slate-400 dark:text-slate-600'
                  : 'text-slate-900 dark:text-slate-100',
              ]"
            >
              Results
            </span>

            <label class="inline-flex items-center gap-2">
              <input
                v-model="resultsMode"
                type="radio"
                name="results-mode"
                value="all"
                class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:opacity-60 dark:disabled:border-slate-700 dark:disabled:bg-slate-900"
              />

              <span
                :class="[
                  'text-sm transition-colors',
                  resultsModeDisabled
                    ? 'text-slate-400 dark:text-slate-600'
                    : 'text-slate-700 dark:text-slate-300',
                ]"
              >
                All ridings
              </span>
            </label>

            <label class="inline-flex items-center gap-2">
              <input
                v-model="resultsMode"
                type="radio"
                name="results-mode"
                value="swing"
                class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:opacity-60 dark:disabled:border-slate-700 dark:disabled:bg-slate-900"
              />

              <span
                :class="[
                  'text-sm transition-colors',
                  resultsModeDisabled
                    ? 'text-slate-400 dark:text-slate-600'
                    : 'text-slate-700 dark:text-slate-300',
                ]"
              >
                Swing ridings
              </span>
            </label>
          </div>

          <p
            v-if="resultsModeDisabled"
            id="results-mode-help"
            class="mt-4 text-xs text-slate-500 dark:text-slate-500"
          >
            Select a party to enable swing-riding results.
          </p>
        </div>
      </fieldset>
    </div>

    <div class="flex flex-col gap-2">
      <fieldset
        :disabled="swingControlsDisabled"
        :aria-describedby="swingControlsDisabled ? 'swing-controls-help' : undefined"
        :class="[
          'rounded-lg border px-4 pb-1 pt-2 transition-colors lg:min-h-32',
          swingControlsDisabled
            ? 'border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/50'
            : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/30',
        ]"
      >
        <legend
          :class="[
            'px-1 text-sm font-medium transition-colors',
            swingControlsDisabled
              ? 'text-slate-400 dark:text-slate-600'
              : 'text-slate-900 dark:text-slate-100',
          ]"
        >
          Find swing ridings
        </legend>

        <div class="grid gap-x-3 gap-y-2 lg:grid-cols-3">
          <label class="flex flex-col gap-1.5">
            <span
              :class="[
                'text-xs font-medium transition-colors',
                swingControlsDisabled
                  ? 'text-slate-400 dark:text-slate-600'
                  : 'text-slate-600 dark:text-slate-400',
              ]"
            >
              Outcome
            </span>

            <select
              v-model="outcome"
              class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:border-slate-800 dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
            >
              <option value="both">Win or loss</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
            </select>
          </label>

          <label class="flex flex-col gap-1.5">
            <span
              :class="[
                'text-xs font-medium transition-colors',
                swingControlsDisabled
                  ? 'text-slate-400 dark:text-slate-600'
                  : 'text-slate-600 dark:text-slate-400',
              ]"
            >
              Margin measured by
            </span>

            <select
              v-model="marginMeasure"
              class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:border-slate-800 dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
            >
              <option value="votes">Votes</option>
              <option value="percentagePoints">Percentage points</option>
            </select>
          </label>

          <label class="flex flex-col gap-1.5">
            <span
              :class="[
                'text-xs font-medium transition-colors',
                swingControlsDisabled
                  ? 'text-slate-400 dark:text-slate-600'
                  : 'text-slate-600 dark:text-slate-400',
              ]"
            >
              Maximum margin {{ filters.marginMeasure === 'votes' ? 'votes' : 'percentage points' }}
            </span>

            <input
              v-model.number="maximumMargin"
              type="number"
              :min="filters.marginMeasure === 'votes' ? 1 : 0.1"
              :max="filters.marginMeasure === 'percentagePoints' ? 100 : undefined"
              :step="filters.marginMeasure === 'votes' ? 1 : 0.1"
              class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:border-slate-800 dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
            />
          </label>
        </div>
        <p
          v-if="swingControlsDisabled"
          id="swing-controls-help"
          class="mt-2 text-xs text-slate-500 dark:text-slate-500"
        >
          Select a party and Swing ridings to enable these controls.
        </p>
      </fieldset>

      <div class="flex justify-end pt-2">
        <button
          type="button"
          class="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { useElectionResultsStore } from '@/stores/electionResults'
import type { ResultsMode, Outcome, MarginMeasure } from '@/types/filters'

export default {
  name: 'ElectionFilters',

  computed: {
    ...mapState(useElectionResultsStore, ['filters', 'politicalParties']),

    selectedPartyKey: {
      get(): string {
        return this.filters.selectedPartyKey ?? ''
      },

      set(value: string) {
        this.setSelectedPartyKey(value || null)
      },
    },

    resultsMode: {
      get(): ResultsMode {
        return this.filters.resultsMode
      },

      set(value: ResultsMode) {
        this.setResultsMode(value)
      },
    },

    outcome: {
      get(): Outcome {
        return this.filters.outcome
      },

      set(value: Outcome) {
        this.setOutcome(value)
      },
    },

    marginMeasure: {
      get(): MarginMeasure {
        return this.filters.marginMeasure
      },

      set(value: MarginMeasure) {
        this.setMarginMeasure(value)
      },
    },

    maximumMargin: {
      get(): number {
        return this.filters.marginMeasure === 'votes'
          ? this.filters.maximumMarginVotes
          : this.filters.maximumMarginPercentagePoints
      },

      set(value: number | string) {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
          return
        }

        if (this.filters.marginMeasure === 'votes') {
          if (!Number.isInteger(value) || value < 1) {
            return
          }

          this.setMaximumMarginVotes(value)
          return
        }

        if (value <= 0 || value > 100) {
          return
        }

        this.setMaximumMarginPercentagePoints(value)
      },
    },

    ridingSearch: {
      get(): string {
        return this.filters.ridingSearch
      },

      set(value: string) {
        this.setRidingSearch(value)
      },
    },

    resultsModeDisabled(): boolean {
      return !this.filters.selectedPartyKey
    },

    swingControlsDisabled(): boolean {
      return !this.filters.selectedPartyKey || this.filters.resultsMode !== 'swing'
    },
  },

  methods: {
    ...mapActions(useElectionResultsStore, [
      'setSelectedPartyKey',
      'setResultsMode',
      'setOutcome',
      'setMarginMeasure',
      'setMaximumMarginVotes',
      'setMaximumMarginPercentagePoints',
      'setRidingSearch',
      'reset',
    ]),
  },
}
</script>

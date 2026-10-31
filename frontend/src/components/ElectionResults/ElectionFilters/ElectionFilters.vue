<template>
  <form
    class="mb-6 grid grid-cols-1 gap-x-6 gap-y-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    @submit.prevent
  >
    <div class="grid content-start gap-4 sm:grid-cols-2 lg:pt-7">
      <riding-party-controls
        v-model:riding-search="ridingSearch"
        v-model:selected-party-key="selectedPartyKey"
        :political-parties="politicalParties"
      />

      <results-mode-toggle
        v-model:results-mode="resultsMode"
        :disabled="resultsModeDisabled"
        class="sm:col-span-2 lg:pt-4"
      />
    </div>

    <div class="flex flex-col gap-2">
      <swing-riding-controls
        v-model:outcome="outcome"
        v-model:margin-measure="marginMeasure"
        v-model:maximum-margin="maximumMargin"
        :disabled="swingControlsDisabled"
      />

      <reset-button />
    </div>
  </form>
</template>

<script lang="ts">
import RidingPartyControls from './RidingPartyControls.vue'
import ResultsModeToggle from './ResultsModeToggle.vue'
import SwingRidingControls from './SwingRidingControls.vue'
import ResetButton from './ResetButton.vue'
import { mapState, mapActions } from 'pinia'
import { useElectionResultsStore } from '@/stores/electionResults'
import type { ResultsMode, Outcome, MarginMeasure } from '@/types/filters'

export default {
  name: 'ElectionFilters',

  components: {
    RidingPartyControls,
    ResultsModeToggle,
    SwingRidingControls,
    ResetButton,
  },

  computed: {
    ...mapState(useElectionResultsStore, ['filters', 'politicalParties', 'hasSelectedParty']),

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
      return !this.hasSelectedParty
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
    ]),
  },
}
</script>

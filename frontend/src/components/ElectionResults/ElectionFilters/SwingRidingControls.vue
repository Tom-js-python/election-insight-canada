<template>
  <fieldset
    :disabled="disabled"
    :aria-describedby="disabled ? 'swing-controls-help' : undefined"
    :class="[
      'rounded-lg border px-4 pb-1 pt-2 transition-colors lg:min-h-32',
      disabled
        ? 'border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/50'
        : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/30',
    ]"
  >
    <legend
      :class="[
        'px-1 text-sm font-medium transition-colors',
        disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100',
      ]"
    >
      Find swing ridings
    </legend>

    <div class="grid gap-x-3 gap-y-2 lg:grid-cols-3">
      <label class="flex flex-col gap-1.5">
        <span
          :class="[
            'text-xs font-medium transition-colors',
            disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400',
          ]"
        >
          Outcome
        </span>

        <select
          v-model="outcomeModel"
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
            disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400',
          ]"
        >
          Margin measured by
        </span>

        <select
          v-model="marginMeasureModel"
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
            disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400',
          ]"
        >
          Maximum margin {{ marginMeasureModel === 'votes' ? 'votes' : 'percentage points' }}
        </span>

        <input
          v-model.number="maximumMarginModel"
          type="number"
          :min="marginMeasureModel === 'votes' ? 1 : 0.1"
          :max="marginMeasureModel === 'percentagePoints' ? 100 : undefined"
          :step="marginMeasureModel === 'votes' ? 1 : 0.1"
          class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:border-slate-800 dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
        />
      </label>
    </div>
    <p
      v-if="disabled"
      id="swing-controls-help"
      class="mt-2 text-xs text-slate-500 dark:text-slate-500"
    >
      Select a party and Swing ridings to enable these controls.
    </p>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Outcome, MarginMeasure } from '@/types/filters'

export default defineComponent({
  name: 'SwingRidingControls',

  props: {
    outcome: {
      type: String as PropType<Outcome>,
      required: true,
    },

    marginMeasure: {
      type: String as PropType<MarginMeasure>,
      required: true,
    },

    maximumMargin: {
      type: Number,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['update:outcome', 'update:marginMeasure', 'update:maximumMargin'],

  computed: {
    outcomeModel: {
      get(): string {
        return this.outcome
      },

      set(value: string) {
        this.$emit('update:outcome', value)
      },
    },
    marginMeasureModel: {
      get(): string {
        return this.marginMeasure
      },

      set(value: string) {
        this.$emit('update:marginMeasure', value)
      },
    },
    maximumMarginModel: {
      get(): number {
        return this.maximumMargin
      },

      set(value: number) {
        this.$emit('update:maximumMargin', value)
      },
    },
  },
})
</script>

<template>
  <fieldset
    :disabled="disabled"
    :aria-describedby="disabled ? 'results-mode-help' : undefined"
    class="sm:col-span-2 lg:pt-4"
  >
    <legend class="sr-only">Results</legend>

    <div class="flex flex-col items-start gap-1">
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span
          aria-hidden="true"
          :class="[
            'text-sm font-medium transition-colors',
            disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100',
          ]"
        >
          Results
        </span>

        <label class="inline-flex items-center gap-2">
          <input
            v-model="resultsModeModel"
            type="radio"
            name="results-mode"
            value="all"
            class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:opacity-60 dark:disabled:border-slate-700 dark:disabled:bg-slate-900"
          />

          <span
            :class="[
              'text-sm transition-colors',
              disabled
                ? 'text-slate-400 dark:text-slate-600'
                : 'text-slate-700 dark:text-slate-300',
            ]"
          >
            All ridings
          </span>
        </label>

        <label class="inline-flex items-center gap-2">
          <input
            v-model="resultsModeModel"
            type="radio"
            name="results-mode"
            value="swing"
            class="h-4 w-4 border-slate-300 text-red-700 focus:ring-red-600 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:opacity-60 dark:disabled:border-slate-700 dark:disabled:bg-slate-900"
          />

          <span
            :class="[
              'text-sm transition-colors',
              disabled
                ? 'text-slate-400 dark:text-slate-600'
                : 'text-slate-700 dark:text-slate-300',
            ]"
          >
            Swing ridings
          </span>
        </label>
      </div>

      <p
        v-if="disabled"
        id="results-mode-help"
        class="mt-4 text-xs text-slate-500 dark:text-slate-500"
      >
        Select a party to enable swing-riding results.
      </p>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ResultsMode } from '@/types/filters'

export default defineComponent({
  name: 'ResultsModeToggle',

  props: {
    resultsMode: {
      type: String as PropType<ResultsMode>,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['update:resultsMode'],

  computed: {
    resultsModeModel: {
      get(): string {
        return this.resultsMode
      },

      set(value: string) {
        this.$emit('update:resultsMode', value)
      },
    },
  },
})
</script>

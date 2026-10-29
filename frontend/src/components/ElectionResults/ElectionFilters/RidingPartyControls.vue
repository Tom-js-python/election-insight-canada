<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Riding </span>

    <input
      v-model.trim="ridingSearchModel"
      type="search"
      placeholder="Name or district number"
      class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-600"
    />
  </label>

  <label class="flex flex-col gap-1.5">
    <span class="text-xs font-medium text-slate-600 dark:text-slate-400"> Party </span>

    <select
      v-model="selectedPartyKeyModel"
      class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-950"
    >
      <option value="">All parties</option>

      <option v-for="party in politicalParties" :key="party.partyKey" :value="party.partyKey">
        {{ party.longDisplayNameEnglish }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import type { PoliticalParty } from '@/types/parties'

export default defineComponent({
  name: 'RidingPartyControls',

  props: {
    ridingSearch: {
      type: String,
      required: true,
    },

    selectedPartyKey: {
      type: String,
      required: true,
    },

    politicalParties: {
      type: Array as PropType<PoliticalParty[]>,
      required: true,
    },
  },

  emits: ['update:ridingSearch', 'update:selectedPartyKey'],

  computed: {
    ridingSearchModel: {
      get(): string {
        return this.ridingSearch
      },

      set(value: string) {
        this.$emit('update:ridingSearch', value)
      },
    },

    selectedPartyKeyModel: {
      get(): string {
        return this.selectedPartyKey
      },

      set(value: string) {
        this.$emit('update:selectedPartyKey', value)
      },
    },
  },
})
</script>

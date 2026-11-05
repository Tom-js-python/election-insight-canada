<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[900px] table-fixed border-collapse text-sm">
      <colgroup v-if="hasSelectedParty">
        <col class="w-[29%]" />
        <col class="w-[9%]" />
        <col class="w-[14%]" />
        <col class="w-[12%]" />
        <col class="w-[12%]" />
        <col class="w-[12%]" />
        <col class="w-[12%]" />
      </colgroup>

      <colgroup v-else>
        <col class="w-[34%]" />
        <col class="w-[10%]" />
        <col class="w-[14%]" />
        <col class="w-[14%]" />
        <col class="w-[14%]" />
        <col class="w-[14%]" />
      </colgroup>

      <RidingResultsTableHead
        :has-selected-party="hasSelectedParty"
        :selected-party-heading="selectedPartyHeading"
        :sort="sort"
        @sort="changeSort"
      />

      <RidingResultsTableBody :ridings="ridings" :has-selected-party="hasSelectedParty" />
    </table>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'

import type { PropType } from 'vue'

import { useElectionResultsStore } from '@/stores/electionResults.ts'

import RidingResultsTableHead from './RidingResultsTableHead.vue'
import RidingResultsTableBody from './RidingResultsTableBody.vue'

import type { RidingTableRow } from '@/types/ridings.ts'

export default {
  name: 'RidingResultsTable',

  components: {
    RidingResultsTableHead,
    RidingResultsTableBody,
  },

  props: {
    ridings: {
      type: Array as PropType<RidingTableRow[]>,
      required: true,
    },
  },

  computed: {
    ...mapState(useElectionResultsStore, ['sort', 'hasSelectedParty', 'selectedPoliticalParty']),

    selectedPartyHeading(): string {
      return this.selectedPoliticalParty?.longDisplayNameEnglish ?? 'Selected party'
    },
  },

  methods: {
    ...mapActions(useElectionResultsStore, ['changeSort']),
  },
}
</script>

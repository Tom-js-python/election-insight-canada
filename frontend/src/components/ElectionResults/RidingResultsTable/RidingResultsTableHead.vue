<template>
  <thead class="bg-slate-100/80 dark:bg-slate-800/70">
    <tr class="border-b border-slate-200 dark:border-slate-700">
      <th
        colspan="2"
        scope="colgroup"
        class="px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300"
      >
        Riding / District
      </th>

      <th
        :colspan="hasSelectedParty ? 2 : 4"
        scope="colgroup"
        class="border-l border-slate-200 px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:text-slate-300"
      >
        Winner
      </th>

      <th
        v-if="hasSelectedParty"
        colspan="3"
        scope="colgroup"
        class="border-l border-slate-200 px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:text-slate-300"
      >
        {{ selectedPartyHeading }}
      </th>
    </tr>
    <tr class="border-b border-slate-200 dark:border-slate-700">
      <SortableHeading
        label="Name"
        sort-key="districtName"
        :sort="sort"
        @sort="$emit('sort', $event)"
      />

      <SortableHeading
        label="Number"
        sort-key="districtNumber"
        :sort="sort"
        @sort="$emit('sort', $event)"
      />

      <SortableHeading
        label="Party"
        sort-key="winnerParty"
        :sort="sort"
        @sort="$emit('sort', $event)"
      />

      <SortableHeading
        label="Vote share"
        sort-key="winnerVoteShare"
        alignment="center"
        :sort="sort"
        @sort="$emit('sort', $event)"
      />

      <template v-if="!hasSelectedParty">
        <SortableHeading
          label="Vote margin"
          sort-key="winnerMarginVotes"
          alignment="center"
          :sort="sort"
          @sort="$emit('sort', $event)"
        />

        <SortableHeading
          label="Margin %"
          sort-key="winnerMarginPercentagePoints"
          alignment="center"
          :sort="sort"
          @sort="$emit('sort', $event)"
        />
      </template>

      <template v-else>
        <SortableHeading
          label="Vote share"
          sort-key="selectedPartyVoteShare"
          alignment="center"
          :sort="sort"
          @sort="$emit('sort', $event)"
        />

        <SortableHeading
          label="Vote margin"
          sort-key="selectedPartyMarginVotes"
          alignment="center"
          :sort="sort"
          @sort="$emit('sort', $event)"
        />

        <SortableHeading
          label="Margin %"
          sort-key="selectedPartyMarginPercentagePoints"
          alignment="center"
          :sort="sort"
          @sort="$emit('sort', $event)"
        />
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { SortState, RidingSortKey } from '@/types/sorting.ts'
import SortableHeading from '../SortableHeading.vue'

export default {
  name: 'RidingResultsTableHead',

  components: { SortableHeading },

  props: {
    hasSelectedParty: {
      type: Boolean,
      required: true,
    },
    selectedPartyHeading: {
      type: String,
      required: true,
    },
    sort: {
      type: Object as PropType<SortState>,
      required: true,
    },
  },

  emits: {
    sort: (key: RidingSortKey) => typeof key === 'string',
  },
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[900px] border-collapse text-sm">
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
            colspan="2"
            scope="colgroup"
            class="border-l border-slate-200 px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            Winner
          </th>

          <th
            colspan="3"
            scope="colgroup"
            class="border-l border-slate-200 px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            {{ selectedPartyHeading }}
          </th>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <SortableHeading label="Name" sort-key="districtName" :sort="sort" @sort="changeSort" />

          <SortableHeading
            label="Number"
            sort-key="districtNumber"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading label="Party" sort-key="winnerParty" :sort="sort" @sort="changeSort" />

          <SortableHeading
            label="Vote share"
            sort-key="winnerVoteShare"
            alignment="center"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Vote share"
            sort-key="selectedPartyVoteShare"
            alignment="center"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Vote margin"
            sort-key="selectedPartyMarginVotes"
            alignment="center"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Margin %"
            sort-key="selectedPartyMarginPercentagePoints"
            alignment="center"
            :sort="sort"
            @sort="changeSort"
          />
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <tr
          v-for="riding in ridings"
          :key="riding.districtNumber"
          class="transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <th
            scope="row"
            class="border-l border-slate-200 px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-100"
          >
            {{ riding.districtName }}
          </th>

          <td
            class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-left text-xs tabular-nums text-slate-500"
          >
            {{ riding.districtNumber }}
          </td>

          <td class="whitespace-nowrap border-l border-slate-200 px-4 py-3">
            <span class="inline-flex items-center gap-2">
              <span
                class="h-2.5 w-2.5 rounded-full"
                :class="partyColor(riding.winner.partyKey)"
                :data-party-key="riding.winner.partyKey"
                aria-hidden="true"
              ></span>
              {{ riding.winner.partyName }}
            </span>
          </td>

          <td
            class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-center tabular-nums"
          >
            {{ formatPercent(riding.winner.voteShare) }}
          </td>

          <td
            class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-center tabular-nums"
          >
            {{ formatPercent(riding.selectedParty?.voteShare) }}
          </td>

          <td
            class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-center tabular-nums"
          >
            {{ formatNumber(riding.selectedParty?.marginVotes) }}
          </td>

          <td
            class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-center tabular-nums"
          >
            {{ formatPercentagePoints(riding.selectedParty?.marginPercentagePoints) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'

import type { PropType } from 'vue'

import { useElectionResultsStore } from '@/stores/electionResults.ts'

import SortableHeading from './SortableHeading.vue'

import type { RidingTableRow } from '@/types/ridings.ts'

export default {
  name: 'RidingResultsTable',

  components: {
    SortableHeading,
  },

  props: {
    ridings: {
      type: Array as PropType<RidingTableRow[]>,
      required: true,
    },
  },

  computed: {
    ...mapState(useElectionResultsStore, ['sort', 'filters', 'politicalParties']),

    selectedPartyHeading(): string {
      if (!this.filters.selectedPartyKey) {
        return 'Selected party'
      }

      const selectedParty = this.politicalParties.find(
        (party) => party.partyKey === this.filters.selectedPartyKey,
      )

      return selectedParty?.longDisplayNameEnglish ?? 'Selected party'
    },
  },

  methods: {
    ...mapActions(useElectionResultsStore, ['changeSort']),

    formatPercent(proportion: number | undefined) {
      if (typeof proportion === 'number') {
        const percentageFormatter = new Intl.NumberFormat('en-CA', {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
        return percentageFormatter.format(proportion)
      } else {
        return 'NA'
      }
    },
    formatNumber(num: number | undefined) {
      if (typeof num === 'number') {
        return num.toLocaleString('en-US')
      } else {
        return 'NA'
      }
    },
    formatPercentagePoints(percent: number | undefined) {
      if (typeof percent === 'number') {
        const roundToDecimal = (num: number, decimals: number) => {
          const factor = Math.pow(10, decimals)
          return Math.round((num + Number.EPSILON) * factor) / factor
        }
        return `${roundToDecimal(percent, 1)}%`
      } else {
        return 'NA'
      }
    },
    partyColor(partyKey: string): string {
      const tailwindKey = partyKey.replaceAll('_', '-')

      return `bg-party-${tailwindKey}`
    },
  },
}
</script>

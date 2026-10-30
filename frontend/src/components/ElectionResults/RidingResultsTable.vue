<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[900px] border-collapse text-sm">
      <thead class="bg-slate-100/80 dark:bg-slate-800/70">
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <SortableHeading
            label="Riding Name"
            sort-key="districtName"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="District Number"
            sort-key="districtNumber"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading label="Winner" sort-key="winnerParty" :sort="sort" @sort="changeSort" />

          <SortableHeading
            label="Winner share"
            sort-key="winnerVoteShare"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            :label="filters.party || 'Selected party'"
            sort-key="selectedPartyVoteShare"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Vote margin"
            sort-key="selectedPartyMarginVotes"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Margin %"
            sort-key="selectedPartyMarginPercentagePoints"
            alignment="right"
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
            class="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-100"
          >
            {{ riding.districtName }}
          </th>

          <td class="whitespace-nowrap px-4 py-3 text-left text-xs tabular-nums text-slate-500">
            {{ riding.districtNumber }}
          </td>

          <td class="whitespace-nowrap px-4 py-3">
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

          <td class="whitespace-nowrap px-4 py-3 text-center tabular-nums">
            {{ formatPercent(riding.winner.voteShare) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-center tabular-nums">
            {{ formatPercent(riding.selectedParty?.voteShare) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-center tabular-nums">
            {{ formatNumber(riding.selectedParty?.marginVotes) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-center tabular-nums">
            {{ formatPercentagePoints(riding.selectedParty?.marginPercentagePoints) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { RidingSortKey } from '@/types/sorting.ts'

import SortableHeading from './SortableHeading.vue'

import type { SortState } from '@/types/sorting.ts'
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
  data() {
    return {
      sort: {
        key: 'districtNumber',
        direction: 'ascending',
      } as SortState,
      filters: {
        outcome: 'win',
        party: 'Conservative',
        marginType: 'votes',
        search: '',
        maximumMargin: 100,
      },
    }
  },
  methods: {
    changeSort(inKey: RidingSortKey) {
      this.sort = {
        key: inKey,
        direction: 'ascending',
      }
    },
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

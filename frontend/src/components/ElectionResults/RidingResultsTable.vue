<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[900px] border-collapse text-sm">
      <thead class="bg-slate-100/80 dark:bg-slate-800/70">
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <SortableHeading label="Riding" sort-key="districtName" :sort="sort" @sort="changeSort" />

          <SortableHeading label="Winner" sort-key="winnerParty" :sort="sort" @sort="changeSort" />

          <SortableHeading
            label="Winner share"
            sort-key="winnerShare"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            :label="filters.party || 'Selected party'"
            sort-key="selectedPartyShare"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Vote margin"
            sort-key="marginVotes"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <SortableHeading
            label="Margin %"
            sort-key="marginPercentagePoints"
            alignment="right"
            :sort="sort"
            @sort="changeSort"
          />

          <th class="w-20 px-4 py-3">
            <span class="sr-only">Riding details</span>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <tr
          v-for="riding in paginatedRidings"
          :key="riding.districtNumber"
          class="transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <td class="px-4 py-3">
            <p class="font-medium text-slate-900 dark:text-slate-100">
              {{ riding.districtName }}
            </p>

            <p class="mt-0.5 text-xs text-slate-500">District {{ riding.districtNumber }}</p>
          </td>

          <td class="whitespace-nowrap px-4 py-3">
            <span class="inline-flex items-center gap-2">
              <span
                class="h-2.5 w-2.5 rounded-full"
                :class="partyColor(riding.winner.partyKey)"
                aria-hidden="true"
              ></span>
              {{ riding.winner.partyName }}
            </span>
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-right tabular-nums">
            {{ formatPercent(riding.winner.voteShare) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-right tabular-nums">
            {{ formatPercent(riding.selectedParty?.voteShare) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-right tabular-nums">
            {{ formatNumber(riding.selectedParty?.marginVotes) }}
          </td>

          <td class="whitespace-nowrap px-4 py-3 text-right tabular-nums">
            {{ formatPercentagePoints(riding.selectedParty?.marginPercentagePoints) }}
          </td>

          <td class="px-4 py-3 text-right">
            <button
              type="button"
              class="font-medium text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-blue-400"
              @click="openRiding(riding)"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import SortableHeading from './SortableHeading.vue'

import type { SortState, RidingTableRow } from '@/types/election.ts'
import { paginatedRidings } from '@/mocks/electionResults.ts'

export default {
  name: 'RidingResultsTable',
  components: {
    SortableHeading,
  },
  data() {
    return {
      sort: {
        key: 'party',
        direction: 'ascending',
      } as SortState,
      filters: {
        outcome: 'win',
        party: 'Conservative',
        marginType: 'votes',
        search: '',
        maximumMargin: 100,
      },
      paginatedRidings,
    }
  },
  methods: {
    changeSort(inKey: string) {
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
    openRiding(riding: RidingTableRow) {
      console.log(riding)
    },
    partyColor(partyKey: string): string {
      const tailwindKey = partyKey.replaceAll('_', '-')

      return `bg-party-${tailwindKey}`
    },
  },
}
</script>

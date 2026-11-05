<template>
  <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
    <tr
      v-for="riding in ridings"
      :key="riding.districtNumber"
      class="transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
    >
      <th
        scope="row"
        class="border-l border-slate-200 px-4 py-2 text-left font-medium text-slate-900 dark:text-slate-100"
      >
        {{ riding.districtName }}
      </th>

      <td
        class="whitespace-nowrap border-l border-slate-200 px-4 py-2 text-left text-xs tabular-nums text-slate-500"
      >
        {{ riding.districtNumber }}
      </td>

      <td class="whitespace-nowrap border-l border-slate-200 px-4 py-2">
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

      <td class="whitespace-nowrap border-l border-slate-200 px-4 py-2 text-center tabular-nums">
        {{ formatPercent(riding.winner.voteShare) }}
      </td>

      <template v-if="!hasSelectedParty">
        <td class="border-l border-slate-200 px-4 py-2 text-center tabular-nums">
          {{ formatNumber(riding.winner.marginVotes) }}
        </td>

        <td class="border-l border-slate-200 px-4 py-2 text-center tabular-nums">
          {{ formatPercentagePoints(riding.winner.marginPercentagePoints) }}
        </td>
      </template>

      <template v-else-if="riding.selectedParty">
        <td class="whitespace-nowrap border-l border-slate-200 px-4 py-2 text-center tabular-nums">
          {{ formatPercent(riding.selectedParty.voteShare) }}
        </td>

        <td class="whitespace-nowrap border-l border-slate-200 px-4 py-2 text-center tabular-nums">
          {{ formatNumber(riding.selectedParty.marginVotes) }}
        </td>

        <td class="whitespace-nowrap border-l border-slate-200 px-4 py-2 text-center tabular-nums">
          {{ formatPercentagePoints(riding.selectedParty.marginPercentagePoints) }}
        </td>
      </template>

      <td
        v-else
        colspan="3"
        class="border-l border-slate-200 px-4 py-2 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        No candidate
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { RidingTableRow } from '@/types/ridings'

export default {
  name: 'RidingResultsTableBody',

  props: {
    ridings: {
      type: Array as PropType<RidingTableRow[]>,
      required: true,
    },
    hasSelectedParty: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
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

<template>
  <th
    scope="col"
    class="whitespace-nowrap border-l border-slate-200 px-4 py-3 text-xs font-medium text-slate-600 dark:text-slate-300"
    :class="'text-' + alignment"
    :aria-sort="isActive() ? sort.direction : 'none'"
    :data-column-key="sortKey"
  >
    <button
      type="button"
      class="inline-flex items-center gap-1 rounded hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:hover:text-white"
      @click="emit('sort', sortKey)"
    >
      {{ label }}

      <span aria-hidden="true">
        {{ !isActive() ? '↕' : sort.direction === 'ascending' ? '↑' : '↓' }}
      </span>
    </button>
  </th>
</template>

<script setup lang="ts">
import type { SortState, RidingSortKey } from '@/types/sorting'

const props = withDefaults(
  defineProps<{
    label: string
    sortKey: RidingSortKey
    sort: SortState
    alignment?: 'left' | 'right' | 'center'
  }>(),
  {
    alignment: 'left',
  },
)

const emit = defineEmits<{
  sort: [key: RidingSortKey]
}>()

const isActive = () => props.sort.key === props.sortKey
</script>

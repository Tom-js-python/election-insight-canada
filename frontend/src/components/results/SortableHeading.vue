<!-- SortableHeading.vue -->

<script setup lang="ts">
interface SortState {
  key: string
  direction: 'ascending' | 'descending'
}

const props = withDefaults(
  defineProps<{
    label: string
    sortKey: string
    sort: SortState
    alignment?: 'left' | 'right'
  }>(),
  {
    alignment: 'left',
  },
)

const emit = defineEmits<{
  sort: [key: string]
}>()

const isActive = () => props.sort.key === props.sortKey
</script>

<template>
  <th
    scope="col"
    class="whitespace-nowrap px-4 py-3 text-xs font-medium text-slate-600 dark:text-slate-300"
    :class="alignment === 'right' ? 'text-right' : 'text-left'"
    :aria-sort="isActive() ? sort.direction : 'none'"
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

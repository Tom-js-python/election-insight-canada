<template>
  <main class="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <page-heading />
    <election-filters />
  </main>
</template>

<script lang="ts">
import PageHeading from '@/components/ElectionResults/PageHeading.vue'
import ElectionFilters from '@/components/ElectionResults/ElectionFilters.vue'

export default {
  components: {
    PageHeading,
    ElectionFilters,
  },
}
</script>

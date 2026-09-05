<template>
  <header class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div
      class="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
    >
      <the-brand />
      <main-nav />
    </div>
  </header>
</template>

<script lang="ts" setup>
import TheBrand from '@/components/Header/TheBrand.vue'
import MainNav from '@/components/Header/MainNav.vue'
</script>

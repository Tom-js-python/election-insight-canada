<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <app-header />
    <router-view />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/Header/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
}
</script>

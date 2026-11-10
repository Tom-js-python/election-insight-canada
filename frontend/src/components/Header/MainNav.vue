<template>
  <nav aria-label="Primary navigation" class="flex items-center gap-1 overflow-x-auto">
    <span
      class="whitespace-nowrap px-3 py-2 text-sm text-slate-400 dark:text-slate-600"
      aria-disabled="true"
    >
      Summary · later
    </span>

    <RouterLink
      to="/"
      class="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:text-slate-200 dark:hover:bg-slate-800"
      exact-active-class="bg-slate-100 dark:bg-slate-800"
    >
      Results
    </RouterLink>

    <span
      class="whitespace-nowrap px-3 py-2 text-sm text-slate-400 dark:text-slate-600"
      aria-disabled="true"
    >
      Map · later
    </span>

    <span
      class="whitespace-nowrap px-3 py-2 text-sm text-slate-400 dark:text-slate-600"
      aria-disabled="true"
    >
      Projection Lab · later
    </span>

    <RouterLink
      to="/about"
      class="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:text-slate-200 dark:hover:bg-slate-800"
      exact-active-class="bg-slate-100 dark:bg-slate-800"
    >
      About
    </RouterLink>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'MainNav',
}
</script>

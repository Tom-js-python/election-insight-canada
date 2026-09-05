<template>
  <nav aria-label="Primary navigation" class="flex items-center gap-1 overflow-x-auto">
    <RouterLink
      to="/"
      class="whitespace-nowrap rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
    >
      Results
    </RouterLink>

    <span class="whitespace-nowrap px-3 py-2 text-sm text-slate-400 dark:text-slate-600">
      Map · later
    </span>

    <span class="whitespace-nowrap px-3 py-2 text-sm text-slate-400 dark:text-slate-600">
      Projection lab · later
    </span>

    <RouterLink
      to="/about"
      class="whitespace-nowrap rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      About
    </RouterLink>
  </nav>
</template>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <!-- Application header -->
    <header class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div
        class="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <!-- Brand -->
        <RouterLink
          to="/"
          class="flex items-center gap-3 font-medium text-slate-900 dark:text-slate-100"
        >
          <span
            class="grid h-9 w-9 place-items-center rounded-lg bg-red-700 text-sm font-medium text-white dark:bg-red-600"
          >
            EI
          </span>

          <span>Election Insight Canada</span>
        </RouterLink>

        <!-- Navigation -->
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
      </div>
    </header>
  </div>
</template>

<template>
  <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <header class="border-l-4 border-red-700 pl-5 dark:border-red-500 sm:pl-7">
      <p class="text-sm font-semibold text-red-700 dark:text-red-400">
        Independent portfolio project
      </p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        About Election Insight Canada
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
        Election Insight Canada makes Canadian federal election results easier to explore. Look up a
        riding, compare how a party performed across the country, or find races decided by fewer
        than 300 votes.
      </p>
      <RouterLink
        to="/"
        class="mt-5 inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
      >
        Explore the results <span aria-hidden="true">→</span>
      </RouterLink>
    </header>

    <dl
      class="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-3"
    >
      <div class="flex flex-col-reverse gap-1 bg-white px-5 py-4 dark:bg-slate-900">
        <dt class="text-sm text-slate-600 dark:text-slate-400">Federal election</dt>
        <dd class="text-2xl font-bold tabular-nums text-slate-950 dark:text-white">2025</dd>
      </div>
      <div class="flex flex-col-reverse gap-1 bg-white px-5 py-4 dark:bg-slate-900">
        <dt class="text-sm text-slate-600 dark:text-slate-400">Ridings to explore</dt>
        <dd class="text-2xl font-bold tabular-nums text-slate-950 dark:text-white">343</dd>
      </div>
      <div class="flex flex-col-reverse gap-1 bg-white px-5 py-4 dark:bg-slate-900">
        <dt class="text-sm text-slate-600 dark:text-slate-400">Rows of source data</dt>
        <dd class="text-2xl font-bold tabular-nums text-slate-950 dark:text-white">470,000+</dd>
      </div>
    </dl>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <section
        class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      >
        <h2 class="text-lg font-semibold text-slate-950 dark:text-white">
          From raw data to useful answers
        </h2>
        <p class="mt-2 leading-7 text-slate-600 dark:text-slate-300">
          Elections Canada publishes detailed results as CSV files. To find close races across the
          country, you’d otherwise need to combine data from many ridings. This project brings those
          results together in one searchable, sortable table.
        </p>
      </section>

      <section
        class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
      >
        <h2 class="text-lg font-semibold text-slate-950 dark:text-white">Why ridings matter</h2>
        <p class="mt-2 leading-7 text-slate-600 dark:text-slate-300">
          Each riding elects one candidate. A party can win more seats if its support is
          concentrated in places where it can win, rather than spread thinly across the country. In
          a close race, a small shift in votes can change who wins the seat.
        </p>
        <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          The site explores recorded election results, not forecasts. Exploring how shifts in voter
          support might change seat counts is a future goal.
        </p>
      </section>
    </div>

    <section
      class="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 class="font-semibold text-slate-950 dark:text-white">Data source and independence</h2>
      <p class="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
        This project uses publicly available data from Elections Canada. It is not affiliated with
        or endorsed by Elections Canada.
      </p>
    </section>

    <section
      class="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 class="font-semibold text-slate-950 dark:text-white">Project status</h2>
      <p class="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
        Election Insight Canada is a work in progress. The
        <a
          href="https://github.com/Tom-js-python/election-insight-canada/blob/main/docs/roadmap.md"
          class="rounded-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          project roadmap on GitHub
        </a>
        tracks what’s been built and what’s planned next.
      </p>
    </section>

    <section class="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
      <h2 class="text-lg font-semibold text-slate-950 dark:text-white">About the developer</h2>
      <p class="mt-2 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
        I’m Tom Brown. I built this project to make election data easier to explore and to show how
        I take a web application from raw data to a usable interface.
      </p>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        The interface uses Vue and TypeScript, the API uses Python and FastAPI, and pandas and
        PostgreSQL handle data preparation and storage.
      </p>

      <div class="mt-4 flex flex-wrap gap-3">
        <a
          href="https://github.com/Tom-js-python/election-insight-canada"
          class="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          View source on GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/thomas-brown-823364326/"
          class="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Connect on LinkedIn
        </a>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
}
</script>

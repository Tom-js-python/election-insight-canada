import { render, screen } from '@testing-library/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import MainNav from '@/components/Header/MainNav.vue'

const ResultsView = {
  template: '<div>Results view</div>',
}

const AboutView = {
  template: '<div>About view</div>',
}

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'results',
        component: ResultsView,
      },
      {
        path: '/about',
        name: 'about',
        component: AboutView,
      },
    ],
  })
}

describe('MainNav', () => {
  it('displays links to Results and About', async () => {
    const router = createTestRouter()

    render(MainNav, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()

    expect(screen.getByRole('link', { name: 'Results' })).toBeTruthy()

    expect(screen.getByRole('link', { name: 'About' })).toBeTruthy()
  })
})

import { render, screen } from '@testing-library/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import MainNav from '@/components/Header/MainNav.vue'

const ResultsView = {
  template: '<div>Results view</div>',
}

const AboutView = {
  template: '<div>About view</div>',
}

const createTestRouter = () =>
  createRouter({
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

describe('MainNav', () => {
  it('displays links to Results and About', async () => {
    const router = createTestRouter()

    render(MainNav, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()

    const navigationMenuItems = screen.getAllByRole('link')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent?.trim())

    expect(navigationMenuTexts).toEqual(['Results', 'About'])
  })
})

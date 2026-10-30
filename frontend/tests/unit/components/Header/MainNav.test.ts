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

const renderMainNav = async () => {
  const router = createTestRouter()

  render(MainNav, {
    global: {
      plugins: [router],
    },
  })

  await router.isReady()
}

describe('MainNav', () => {
  it('[FR-NAV-001] displays links to Results and About', async () => {
    await renderMainNav()

    const navigationMenuItems = screen.getAllByRole('link')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent?.trim())

    expect(navigationMenuTexts).toEqual(['Results', 'About'])
  })

  it('[FR-NAV-002] displays disabled items for planned sections', async () => {
    await renderMainNav()

    const summaryItem = screen.getByText(/^summary · later$/i)
    const mapItem = screen.getByText(/^map · later$/i)
    const projectionLabItem = screen.getByText(/^projection lab · later$/i)

    for (const item of [summaryItem, mapItem, projectionLabItem]) {
      expect(item).toHaveAttribute('aria-disabled', 'true')
      expect(item).not.toHaveAttribute('href')
    }
  })
})

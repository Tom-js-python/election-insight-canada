import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import TheBrand from '@/components/Header/TheBrand.vue'

describe('TheBrand', () => {
  it('displays the site name', () => {
    render(TheBrand, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const siteName = screen.getByText('Election Insight Canada')
    expect(siteName).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/vue'

import TheBrand from '@/components/Header/TheBrand.vue'

describe('TheBrand', () => {
  it('displays the site name', () => {
    render(TheBrand)
    const siteName = screen.getByText('Election Insight Canada')
    expect(siteName).toBeInTheDocument()
  })
})

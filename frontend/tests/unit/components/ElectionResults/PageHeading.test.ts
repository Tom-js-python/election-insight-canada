import { render, screen, within } from '@testing-library/vue'

import PageHeading from '@/components/ElectionResults/PageHeading.vue'

describe('PageHeading', () => {
  it('renders the page heading', () => {
    render(PageHeading)

    const pageHeading = screen.getByRole('heading', {
      name: /general election results/i,
      level: 1,
    })
    expect(pageHeading).toBeInTheDocument()
  })

  it('displays the 2025 general election as the selected election', () => {
    render(PageHeading)

    const electionSelect = screen.getByRole('combobox', {
      name: /election/i,
    })

    const electionOptions = within(electionSelect).getAllByRole('option')

    expect(electionOptions).toHaveLength(1)
    expect(electionOptions[0]).toHaveTextContent(/2025 general election/i)
    expect(electionSelect).toHaveValue('2025')
  })
})

import { render, screen } from '@testing-library/vue'

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

  it('displays the current election as unavailable for selection', () => {
    render(PageHeading)

    const electionSelect = screen.getByRole('combobox', {
      name: /election/i,
    })

    expect(electionSelect).toBeDisabled()
    expect(electionSelect).toHaveValue('2025')
    expect(electionSelect).toHaveAccessibleDescription(/additional elections will be added later/i)

    const electionOptions = screen.getAllByRole('option')

    expect(electionOptions).toHaveLength(1)

    const electionOption = electionOptions[0] as HTMLOptionElement

    expect(electionOption).toHaveTextContent(/2025 general election/i)
    expect(electionOption.selected).toBe(true)
  })
})

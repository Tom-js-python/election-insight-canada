import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import PageFooter from '@/components/ElectionResults/PageFooter.vue'

const renderPageFooter = (totalResults = 27) =>
  render(PageFooter, {
    props: {
      totalResults,
    },
  })

describe('PageFooter', () => {
  it('displays the total number of filtered results', () => {
    renderPageFooter()

    const resultsSummary = screen.getByRole('status')

    expect(resultsSummary).toHaveTextContent(/of 27$/i)
  })

  it('marks a selected page as the current page', async () => {
    const user = userEvent.setup()

    renderPageFooter()

    const firstPageButton = screen.getByRole('button', {
      name: /go to page 1/i,
    })
    const secondPageButton = screen.getByRole('button', {
      name: /go to page 2/i,
    })

    expect(firstPageButton).toHaveAttribute('aria-current', 'page')
    expect(secondPageButton).not.toHaveAttribute('aria-current')

    await user.click(secondPageButton)

    expect(firstPageButton).not.toHaveAttribute('aria-current')
    expect(secondPageButton).toHaveAttribute('aria-current', 'page')
  })
})

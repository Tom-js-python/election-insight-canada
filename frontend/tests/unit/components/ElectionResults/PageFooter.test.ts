import { render, screen } from '@testing-library/vue'

import PageFooter from '@/components/ElectionResults/PageFooter.vue'

const renderPageFooter = (
  currentPage = 4,
  totalPages = 69,
  visiblePageNumbers = [2, 3, 4, 5, 6],
  totalResults = 343,
  firstVisibleResult = 16,
  lastVisibleResult = 20,
) =>
  render(PageFooter, {
    props: {
      currentPage,
      totalPages,
      visiblePageNumbers,
      totalResults,
      firstVisibleResult,
      lastVisibleResult,
    },
  })

describe('PageFooter', () => {
  it('displays the total number of filtered results', () => {
    renderPageFooter()

    const resultsSummary = screen.getByText(/showing/i)

    expect(resultsSummary).toHaveTextContent(/of 343$/i)
  })

  it('marks a selected page as the current page', () => {
    renderPageFooter()

    const currentPageButton = screen.getByRole('button', {
      name: /go to page 4/i,
    })
    const notCurrentPageButton = screen.getByRole('button', {
      name: /go to page 5/i,
    })

    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    expect(notCurrentPageButton).not.toHaveAttribute('aria-current')
  })
})

import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import SortableHeading from '@/components/ElectionResults/SortableHeading.vue'

const getSortButton = () =>
  screen.getByRole('button', {
    name: /winner share/i,
  })

const getSortSymbol = () => {
  const sortSymbol = getSortButton().querySelector('span[aria-hidden="true"]')

  if (!sortSymbol) {
    throw new Error('Expected the sort indicator to render')
  }

  return sortSymbol
}

describe('SortableHeading', () => {
  it('emits its sort key when clicked', async () => {
    const user = userEvent.setup()
    const changeSort = vi.fn<(sortKey: string) => void>()

    render(SortableHeading, {
      props: {
        label: 'Winner share',
        sortKey: 'winnerShare',
        sort: {
          key: 'districtName',
          direction: 'ascending',
        },
        onSort: changeSort,
      },
    })

    await user.click(getSortButton())

    expect(changeSort).toHaveBeenCalledExactlyOnceWith('winnerShare')
  })

  it.each([
    ['districtName', 'ascending', '↕'],
    ['winnerShare', 'ascending', '↑'],
    ['winnerShare', 'descending', '↓'],
  ] as const)(
    'displays the correct indicator when sorting by %s in %s order',
    (activeSortKey, direction, expectedSymbol) => {
      render(SortableHeading, {
        props: {
          label: 'Winner share',
          sortKey: 'winnerShare',
          sort: {
            key: activeSortKey,
            direction,
          },
        },
      })

      expect(getSortSymbol()).toHaveTextContent(expectedSymbol)
    },
  )

  it.each([
    [undefined, 'text-left'],
    ['right', 'text-right'],
  ] as const)('applies the expected class when alignment is %s', (alignment, expectedClass) => {
    render(SortableHeading, {
      props: {
        label: 'Winner share',
        sortKey: 'winnerShare',
        alignment,
        sort: {
          key: 'districtName',
          direction: 'ascending',
        },
      },
    })

    const tableHeading = screen.getByRole('columnheader', {
      name: /winner share/i,
    })

    expect(tableHeading).toHaveClass(expectedClass)
  })
})

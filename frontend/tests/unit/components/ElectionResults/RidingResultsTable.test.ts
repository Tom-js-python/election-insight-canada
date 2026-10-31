import { render, screen, within } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'

import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'

import type { RidingTableRow } from '@/types/ridings'
import type { RidingSortKey } from '@/types/sorting'

import { politicalParties } from '@/mocks/politicalParties'

const getCellByColumn = (row: HTMLElement, columnKey: RidingSortKey): HTMLTableCellElement => {
  if (!(row instanceof HTMLTableRowElement)) {
    throw new Error('Expected an HTML table row')
  }

  const table = row.closest('table')

  if (!table) {
    throw new Error('Expected the row to be inside a table')
  }

  const columnHeader = table.querySelector<HTMLTableCellElement>(
    `th[data-column-key="${columnKey}"]`,
  )

  if (!columnHeader) {
    throw new Error(`Could not find column header with key "${columnKey}"`)
  }

  const cell = row.cells.item(columnHeader.cellIndex)

  if (!cell) {
    throw new Error(`Could not find cell for column "${columnKey}"`)
  }

  return cell
}

const renderRidingResultsTable = () =>
  render(RidingResultsTable, {
    props: {
      ridings,
    },

    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            electionResults: {
              filters: {
                selectedPartyKey: 'conservative',
                resultsMode: 'all',
                outcome: 'both',
                marginMeasure: 'percentagePoints',
                maximumMarginVotes: 1000,
                maximumMarginPercentagePoints: 10,
                ridingSearch: '',
              },

              sort: {
                key: 'districtNumber',
                direction: 'ascending',
              },

              politicalParties,
            },
          },
        }),
      ],
    },
  })

const ridings: RidingTableRow[] = [
  {
    districtNumber: 35001,
    districtName: 'Ajax',

    winner: {
      candidateName: 'Jennifer McKelvie',
      partyKey: 'liberal',
      partyName: 'Liberal',
      voteCount: 36975,
      voteShare: 0.563214,
      outcome: 'win',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },

    selectedParty: {
      candidateName: 'Greg Brady',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 25658,
      voteShare: 0.3908302,
      outcome: 'loss',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },
  },
  {
    districtNumber: 24020,
    districtName: 'Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata',

    winner: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteCount: 28_873,
      voteShare: 0.4583598,
      outcome: 'win',
      marginVotes: 9_776,
      marginPercentagePoints: 15.519431,
    },

    selectedParty: null,
  },
]

describe('RidingResultsTable', () => {
  it('has the correct column headers', () => {
    renderRidingResultsTable()

    const table = screen.getByRole('table')
    const headerRows = within(table).getAllByRole('row').slice(0, 2)

    expect(headerRows).toHaveLength(2)

    const groupHeaderRow = headerRows[0]
    const columnHeaderRow = headerRows[1]

    if (!groupHeaderRow || !columnHeaderRow) {
      throw new Error('Expected the table to contain two header rows')
    }

    const groupHeaders = within(groupHeaderRow).getAllByRole('columnheader')
    const columnHeaders = within(columnHeaderRow).getAllByRole('columnheader')

    expect(groupHeaders).toHaveLength(3)
    expect(groupHeaders[0]).toHaveTextContent('Riding / District')
    expect(groupHeaders[1]).toHaveTextContent('Winner')
    expect(groupHeaders[2]).toHaveTextContent('Conservative')

    expect(columnHeaders).toHaveLength(7)

    expect(columnHeaders[0]).toHaveTextContent(/^Name/)
    expect(columnHeaders[1]).toHaveTextContent(/^Number/)
    expect(columnHeaders[2]).toHaveTextContent(/^Party/)
    expect(columnHeaders[3]).toHaveTextContent(/^Vote share/)
    expect(columnHeaders[4]).toHaveTextContent(/^Vote share/)
    expect(columnHeaders[5]).toHaveTextContent(/^Vote margin/)
    expect(columnHeaders[6]).toHaveTextContent(/^Margin %/)
  })

  it('renders a supplied riding', () => {
    renderRidingResultsTable()

    const rows = screen.getAllByRole('row')

    // Two heading rows plus two riding rows
    expect(rows).toHaveLength(4)

    let ridingRow = screen.getByRole('row', {
      name: /ajax/i,
    })

    expect(within(ridingRow).getByText('Ajax')).toBeInTheDocument()
    expect(within(ridingRow).getByText(/35001/i)).toBeInTheDocument()
    expect(within(ridingRow).getByText('Liberal')).toBeInTheDocument()
    expect(getCellByColumn(ridingRow, 'winnerVoteShare')).toHaveTextContent('56.3%')
    expect(getCellByColumn(ridingRow, 'selectedPartyVoteShare')).toHaveTextContent('39.1%')
    expect(getCellByColumn(ridingRow, 'selectedPartyMarginVotes')).toHaveTextContent('11,317')
    expect(getCellByColumn(ridingRow, 'selectedPartyMarginPercentagePoints')).toHaveTextContent(
      '17.2%',
    )

    // Test that the correct party-color class is applied
    const winnerCell = getCellByColumn(ridingRow, 'winnerParty')
    const partyColorMarker = winnerCell.querySelector('[data-party-key="liberal"]')

    expect(partyColorMarker).toBeInTheDocument()
    expect(partyColorMarker).toHaveClass('bg-party-liberal')

    // Test the fallbacks in the format functions
    ridingRow = screen.getByRole('row', {
      name: /Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata/i,
    })

    expect(within(ridingRow).getAllByText('No candidate')).toHaveLength(1)
  })
})

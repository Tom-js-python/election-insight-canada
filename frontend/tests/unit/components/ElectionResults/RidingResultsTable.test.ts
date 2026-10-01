import { render, screen, within } from '@testing-library/vue'

import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'

import type { RidingTableRow } from '@/types/election.ts'

const getCellByColumn = (row: HTMLElement, columnName: string | RegExp): HTMLTableCellElement => {
  const columnHeader = screen.getByRole('columnheader', {
    name: columnName,
  }) as HTMLTableCellElement

  return (row as HTMLTableRowElement).cells[columnHeader.cellIndex]
}

const ridings: RidingTableRow[] = [
  {
    districtNumber: 35001,
    districtName: 'Ajax',
    winner: {
      candidateName: 'Jennifer McKelvie',
      partyKey: 'liberal',
      partyName: 'Liberal',
      voteShare: 0.563214,
    },
    selectedParty: {
      candidateName: 'Greg Brady',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.3908302,
      outcome: 'loss',
      marginVotes: 11_317,
      marginPercentagePoints: 17.2384,
    },
    winningMarginVotes: 11_317,
    winningMarginPercentagePoints: 17.2384,
  },
  {
    districtNumber: 24020,
    districtName: 'Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata',

    winner: {
      candidateName: 'Bernard Généreux',
      partyKey: 'conservative',
      partyName: 'Conservative',
      voteShare: 0.4583598,
    },

    winningMarginVotes: 9_776,
    winningMarginPercentagePoints: 15.519431,
  },
]

describe('RidingResultsTable', () => {
  it('renders a supplied riding', () => {
    render(RidingResultsTable, {
      props: {
        ridings,
      },
    })

    const rows = screen.getAllByRole('row')

    // One heading row plus two riding rows
    expect(rows).toHaveLength(3)

    let ridingRow = screen.getByRole('row', {
      name: /ajax district 35001/i,
    })

    expect(within(ridingRow).getByText('Ajax')).toBeInTheDocument()
    expect(within(ridingRow).getByText(/district 35001/i)).toBeInTheDocument()
    expect(within(ridingRow).getByText('Liberal')).toBeInTheDocument()
    expect(getCellByColumn(ridingRow, /winner share/i)).toHaveTextContent('56.3%')
    expect(getCellByColumn(ridingRow, /conservative/i)).toHaveTextContent('39.1%')
    expect(getCellByColumn(ridingRow, /vote margin/i)).toHaveTextContent('11,317')
    expect(getCellByColumn(ridingRow, /margin %/i)).toHaveTextContent('17.2%')
    expect(within(ridingRow).getByRole('button', { name: /view/i })).toBeInTheDocument()

    // Test that the correct party-color class is applied
    const winnerCell = getCellByColumn(ridingRow, 'Winner')
    const partyColorMarker = winnerCell.querySelector('[data-party-key="liberal"]')

    expect(partyColorMarker).toBeInTheDocument()
    expect(partyColorMarker).toHaveClass('bg-party-liberal')

    // Test the fallbacks in the format functions
    ridingRow = screen.getByRole('row', {
      name: /Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata District 24020/i,
    })

    expect(within(ridingRow).getAllByText('NA')).toHaveLength(3)
  })
})

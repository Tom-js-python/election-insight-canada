import { render, screen, within } from '@testing-library/vue'

import RidingResultsTable from '@/components/ElectionResults/RidingResultsTable.vue'

import type { RidingTableRow } from '@/types/election.ts'

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
    expect(within(ridingRow).getByText('56.3%')).toBeInTheDocument()
    expect(within(ridingRow).getByText('39.1%')).toBeInTheDocument()
    expect(within(ridingRow).getByText('11,317')).toBeInTheDocument()
    expect(within(ridingRow).getByText('17.2%')).toBeInTheDocument()
    expect(within(ridingRow).getByRole('button', { name: /view/i })).toBeInTheDocument()

    // Test the fallbacks in the format functions
    ridingRow = screen.getByRole('row', {
      name: /Côte-du-Sud-Rivière-du-Loup-Kataskomiq-Témiscouata District 24020/i,
    })

    expect(within(ridingRow).getAllByText('NA')).toHaveLength(3)
  })
})

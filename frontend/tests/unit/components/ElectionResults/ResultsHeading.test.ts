import { render, screen } from '@testing-library/vue'

import ResultsHeading from '@/components/ElectionResults/ResultsHeading.vue'

describe('ResultsHeading', () => {
  it('displays the number of filtered riding results', () => {
    render(ResultsHeading, {
      props: {
        totalResults: 127,
      },
    })

    expect(screen.getByRole('status')).toHaveTextContent(/127 ridings/i)
  })
})

import { Labels } from './Labels'
import { renderWithRouter, screen } from '~/test-util'

describe('<Labels />', () => {
  it('should render Labels component', () => {
    renderWithRouter(<Labels labels="react" />)
    expect(screen.getByText('#react')).toBeInTheDocument()
  })
  it('should not render labels component', () => {
    renderWithRouter(<Labels labels="" />)
    expect(screen.queryByText('react')).not.toBeInTheDocument()
  })
})

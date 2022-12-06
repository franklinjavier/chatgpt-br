import { Heading } from './Heading'
import { renderWithRouter, screen } from '~/test-util'

describe('<Heading />', () => {
  it('should render Heading component', () => {
    renderWithRouter(<Heading>foo</Heading>)
    expect(screen.getByText('foo')).toBeInTheDocument()
  })
})

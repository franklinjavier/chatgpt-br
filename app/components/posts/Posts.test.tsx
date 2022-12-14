import { Posts } from './Posts'
import { renderWithRouter, screen } from '~/test-util'
import type { Post } from '~/utils/posts.server'

const mock = {
  title: 'foo',
  excerpt: 'bar',
  slug: '/foo',
} as Post

describe('<Posts />', () => {
  it('should render Posts component', () => {
    renderWithRouter(<Posts posts={[mock]} />)
    expect(screen.getByText('foo')).toBeInTheDocument()
  })
})

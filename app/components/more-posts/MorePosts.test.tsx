import { MorePosts } from './MorePosts'
import { renderWithRouter, screen } from '~/test-util'
import type { Post } from '~/utils/posts.server'

const mock = {
  title: 'foo',
  excerpt: 'bar',
  slug: '/foo',
} as Post

describe('<MorePosts />', () => {
  it('should render MorePosts component', () => {
    renderWithRouter(<MorePosts posts={[mock]} />)
    expect(screen.getByText('foo')).toBeInTheDocument()
  })
})

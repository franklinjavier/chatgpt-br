import { render, screen } from '@testing-library/react'

import { Posts } from './Posts'
import type { Post } from '~/utils/get-posts.server'

const mock = {
  title: 'foo',
  excerpt: 'bar',
  slug: '/foo',
} as Post

describe('<Posts />', () => {
  it('should render Posts component', () => {
    render(<Posts posts={[mock]} />)
    expect(screen.getByText('foo')).toBeInTheDocument()
  })
})

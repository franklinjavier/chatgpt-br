import { Link } from '@remix-run/react'

import type { Post } from '~/utils/get-posts.server'

type PostsProps = {
  posts: Post[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post: Post) => (
        <div key={post.slug}>
          <Link to={`/${post.slug}`}>{post.title}</Link>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }} />
        </div>
      ))}
    </>
  )
}

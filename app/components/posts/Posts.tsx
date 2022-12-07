import { Link } from '@remix-run/react'

import { Labels } from '../labels'
import type { Post } from '~/utils/posts.server'

type PostsProps = {
  posts: Post[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post: Post) => (
        <div className="mb-6" key={post.slug}>
          <Link
            className="text-3xl font-semibold text-zinc-900 decoration-transparent hover:decoration-zinc-700 dark:text-zinc-300"
            to={`/${post.slug}`}
          >
            {post.title}
          </Link>

          <div
            className="mt-3 text-xl text-zinc-500 sm:mt-4"
            dangerouslySetInnerHTML={{ __html: post.excerpt.replace(/<?p>/g, '') ?? '' }}
          />

          <Labels labels={post.labels} />
        </div>
      ))}
    </>
  )
}

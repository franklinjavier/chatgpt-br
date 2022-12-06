import { Link } from '@remix-run/react'

import type { Post } from '~/utils/posts.server'

type PostsProps = {
  posts: Post[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post: Post) => (
        <div key={post.slug}>
          <Link
            className="text-3xl font-semibold text-zinc-900 decoration-transparent hover:decoration-zinc-700 dark:text-zinc-300"
            to={`/${post.slug}`}
          >
            {post.title}
          </Link>

          <p
            className="mt-3 text-xl text-zinc-500 sm:mt-4"
            dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }}
          />
        </div>
      ))}
    </>
  )
}

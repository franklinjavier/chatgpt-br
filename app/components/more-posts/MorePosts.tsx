import { Link } from '@remix-run/react'

import type { Post } from '~/utils/posts.server'

type MorePostsProps = {
  posts: Post[]
}

export function MorePosts({ posts }: MorePostsProps) {
  return (
    <>
      <h3 className="text-center">Veja mais</h3>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link
              className="text-xl font-semibold text-zinc-900 decoration-transparent hover:decoration-zinc-700 dark:text-zinc-300"
              to={`/${post.slug}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

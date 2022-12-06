import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Posts } from '~/components/posts'
import { getAllPosts } from '~/utils/get-posts.server'

import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  const posts = await getAllPosts()
  return json(posts)
}

export function headers() {
  return {
    'Cache-Control': `public, max-age=60, stale-while-revalidate=59`,
  }
}

export default function Index() {
  const posts = useLoaderData<typeof loader>()

  return (
    <section>
      <Posts posts={posts} />
    </section>
  )
}

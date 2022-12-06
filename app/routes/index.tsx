import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Posts } from '~/components/posts'
import { getPosts } from '~/utils/posts.server'

import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  const posts = await getPosts()
  return json(posts)
}

export default function Index() {
  const posts = useLoaderData<typeof loader>()

  return (
    <section>
      <Posts posts={posts} />
    </section>
  )
}

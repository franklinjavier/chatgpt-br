import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Heading } from '~/components/heading'
import { Posts } from '~/components/posts'
import hljs from '~/styles/hljs.css'
import { getAllPosts } from '~/utils/get-posts.server'

import type { LoaderArgs, MetaFunction } from '@remix-run/node'

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: hljs,
    },
  ]
}

export const meta: MetaFunction = ({ data, parentsData }) => ({
  title: `${data?.post?.title + ' • '}ChatGPT-BR`,
  description: data?.post?.excerpt ?? parentsData.title,
})

export function headers() {
  return {
    'Cache-Control': `public, max-age=60, stale-while-revalidate=59`,
  }
}

export async function loader({ params }: LoaderArgs) {
  const posts = await getAllPosts()
  const post = posts.find(({ slug }) => slug === params.slug)
  const morePosts = posts.filter(({ slug }) => slug !== params.slug)

  if (!post) throw json('Not found', { status: 404 })

  return json({ post, morePosts })
}

export default function PostSlug() {
  const data = useLoaderData<typeof loader>()

  if (!data.post) return <Heading>Oops!</Heading>

  return (
    <article className="markdown-body">
      <h1>{data.post.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: data.post.body }} />
      <hr className="divide-x" />
      <Posts posts={data.morePosts} />
    </article>
  )
}

export function CatchBoundary() {
  return <>Oops</>
}

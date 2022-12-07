import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Heading } from '~/components/heading'
import { Labels } from '~/components/labels'
import { MorePosts } from '~/components/more-posts'
import hljs from '~/styles/hljs.css'
import { getPosts } from '~/utils/posts.server'

import type { LoaderArgs, MetaFunction } from '@remix-run/node'

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: hljs,
    },
  ]
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const description = data?.post?.excerpt ?? parentsData.title
  const title = `${data?.post?.title + ' • '}ChatGPT-BR`
  return {
    title,
    description,
    'og:description': description,
    'og:title': title,
    'og:site_name': title,
  }
}

export async function loader({ params }: LoaderArgs) {
  const posts = await getPosts()
  const post = posts.find(({ slug }) => slug === params.slug)
  const morePosts = posts.filter(({ slug }) => slug !== params.slug)

  if (!post) throw json('Not found', { status: 404 })

  return json({ post, morePosts })
}

export default function PostSlug() {
  const data = useLoaderData<typeof loader>()

  if (!data.post) return <Heading>Oops!</Heading>

  return (
    <article>
      <h1>{data.post.title}</h1>
      <Labels labels={data.post.labels} />

      <div dangerouslySetInnerHTML={{ __html: data.post.body }} />
      <hr className="divide-x" />
      <MorePosts posts={data.morePosts} />
    </article>
  )
}

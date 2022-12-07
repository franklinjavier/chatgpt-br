import { json } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'

import { Posts } from '~/components/posts'
import { getPostsByLabel } from '~/utils/posts.server'

import type { LoaderArgs, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = ({ data, parentsData, params }) => ({
  title: `Categoria: ${params.label + ' • '}ChatGPT-BR`,
  description: `Conteúdos sobre: ${params.label}`,
})

export async function loader({ params }: LoaderArgs) {
  if (!params.label) {
    throw json('Label not found', { status: 404 })
  }

  const posts = await getPostsByLabel(params.label)

  if (!posts?.length) throw json('Not found', { status: 404 })

  return json(posts)
}

export default function PostsByLabel() {
  const posts = useLoaderData<typeof loader>()

  return (
    <section>
      <Posts posts={posts} />
    </section>
  )
}

export function CatchBoundary() {
  const params = useParams()
  return (
    <>
      Nenhum post encontrado com a label <strong>{params.label}</strong>!
    </>
  )
}

import { getImageMD, regexMDImage } from './get-image-from-markdown.server'
import { markdownToHtml } from './markdown.server'
import { slugify } from './slugify'
import { supabase } from './supabase.server'

export type Post = {
  slug: string
  body: string
  excerpt: string
  created_at: string
  updated_at: string
  title: string
  id: number
  labels: [
    {
      id: string
      label: string
    },
  ]
}

export async function getPosts() {
  const { data } = await supabase.from('posts').select().order('created_at', { ascending: false })

  const result = data ?? []

  const posts = await Promise.all(
    result.map(async ({ body: content, ...rest }: Post) => {
      const body = await markdownToHtml(content.replace(regexMDImage, ''))
      const image = getImageMD(body)
      const slug = slugify(rest.title)
      const excerpt = `${body.split('.')[0]}.`

      return {
        ...rest,
        image,
        slug,
        excerpt,
        body,
      }
    }),
  )

  return posts
}

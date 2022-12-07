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
  issue_id: number
  labels: string
}

export async function shapePosts(data: Post[]) {
  return await Promise.all(
    data?.map(async ({ body: content, ...rest }: Post) => {
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
}

export async function getPosts() {
  const { data } = await supabase.from('posts').select().order('created_at', { ascending: false })
  const result = data ?? []
  return shapePosts(result)
}

export async function getPostsByLabel(label: string) {
  const { data } = await supabase.from('posts').select().like('labels', `%${label}%`)
  const result = data ?? []
  return shapePosts(result)
}

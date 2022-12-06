import { getImageMD, regexMDImage } from './get-image-from-markdown.server'
import { markdownToHtml } from './markdown.server'
import { slugify } from './slugify'
import { supabase } from './supabase.server'

export type User = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin?: boolean
}

export type Post = {
  labels: {
    name: string
  }[]
  image?: string
  slug?: string
  excerpt?: string
  body: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  state: string
  locked: boolean
  assignee: null
  milestone: null
  comments: number
  created_at: string
  updated_at: string
  closed_at: null
  author_association: string
  active_lock_reason: null
  reactions: {
    url: string
    total_count: number
    laugh: 0
    hooray: 0
    confused: 0
    heart: 0
    rocket: 0
    eyes: 0
  }
  timeline_url: string
  performed_via_github_app: null
  state_reason: null
}

export async function getAllPosts() {
  const { data, error } = await supabase.from('posts').select()

  let result = data ?? []

  console.log(result)

  // try {
  //   console.log(data)

  // result = await fetch('https://api.github.com/repos/franklinjavier/chatgpt-br/issues').then((r) =>
  //   r.json(),
  // )
  // console.log(result)
  // result = data
  // } catch (e) {
  //   console.error(e)
  // }

  const posts = await Promise.all(
    result.map(async ({ body, ...rest }: Post) => {
      const _body = await markdownToHtml(body.replace(regexMDImage, ''))
      const image = getImageMD(body)
      const slug = slugify(rest.title)
      const excerpt = `${body.split('.')[0]}.`

      console.log(rest)

      return {
        ...rest,
        image,
        slug,
        excerpt,
        body: _body,
        categories: rest.labels?.filter(({ name }) => name !== 'Publish').map(({ name }) => name),
      }
    }),
  )

  return posts
}

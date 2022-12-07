require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)
const [title, body, issue_id, issue] = process.argv.slice(2)

if (!title || !body || !issue_id) {
  throw new Error('Missing title, body or issue_id')
} else {
  upsert({ title, body, issue_id })
}

console.log(issue)

async function upsert({ title, body, issue_id }) {
  const slug = slugify(title)
  const { data: post } = await supabase.from('posts').select().eq('issue_id', issue_id)

  if (post.length) {
    const updated = await supabase
      .from('posts')
      .update({ title, body, slug })
      .match({ issue_id: post[0].issue_id })

    if (updated.error) {
      throw new Error(updated.error.message)
    }

    console.log(updated.data)
    return
  }

  const inserted = await supabase.from('posts').insert({ title, body, slug, issue_id })

  if (inserted.error) {
    throw new Error(inserted.error.message)
  }

  console.log(inserted.data)
}

function slugify(value, delimiter = '-') {
  return String(value)
    .toLowerCase()
    .replace(/[\u00C0-\u00C5]/gi, 'a')
    .replace(/[\u00E7]/gi, 'c')
    .replace(/[\u00C8-\u00CB]/gi, 'e')
    .replace(/[\u00CC-\u00CF]/gi, 'i')
    .replace(/[\u00D2-\u00D6]/gi, 'o')
    .replace(/[\u00D9-\u00DC]/gi, 'u')
    .replace(/[\u00D1]/gi, 'n')
    .replace(/[^a-z0-9\s]*/gi, '')
    .trim()
    .replace(/\s+/g, delimiter)
    .replace(/[-]{2,}/g, '')
}

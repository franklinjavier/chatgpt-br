require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)

const [title, body] = process.argv.slice(2)

if (!title || !body) {
  throw new Error('Missing title or body')
} else {
  upsert({ title, body })
}

async function upsert({ title, body }) {
  const { data, error } = await supabase
    .from('posts')
    .upsert({ title, body, slug: slugify(title) })
    .select()

  if (error) {
    throw new Error(error)
  }

  console.log(data)
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

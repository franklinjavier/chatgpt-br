export async function markdownToHtml(markdownString: string) {
  const { unified } = await import('unified')
  const { default: remarkGfm } = await import('remark-gfm')
  const { default: markdown } = await import('remark-parse')
  const { default: remark2rehype } = await import('remark-rehype')
  const { default: rehypeStringify } = await import('rehype-stringify')
  const { default: hlj } = await import('rehype-highlight')

  const result = await unified()
    .use(markdown)
    .use(remarkGfm)
    .use(remark2rehype)
    .use(rehypeStringify)
    .use(hlj)
    .process(markdownString)

  return result.value.toString()
}

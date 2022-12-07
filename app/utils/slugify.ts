export function slugify(value: string, delimiter = '-') {
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

export function stripTags(value: string) {
  return value.replace(/<\/?[^>]+(>|$)/gi, '')
}

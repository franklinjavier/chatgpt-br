export const regexMDImage = /(?:!\[(.*?)\]\((.*?)\))/g

export function getImageMD(content: string) {
  const imageObject = regexMDImage.exec(content)

  if (!imageObject) return { url: '', alt: '' }

  return {
    alt: imageObject[1],
    url: imageObject[2],
  }
}

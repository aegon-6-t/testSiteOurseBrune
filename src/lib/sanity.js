import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'rerp2lu3',
  dataset: 'ourse-brune-studio',
  useCdn: false, // false pour voir immédiatement les modifs faites dans Sanity Studio en local
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  if (!source) return ''
  return builder.image(source).auto('format').fit('max')
}

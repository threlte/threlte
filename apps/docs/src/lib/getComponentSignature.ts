import { getCollection, type CollectionEntry } from 'astro:content'

export const getComponentSignature = async (entry: CollectionEntry<'reference'>) => {
  const signature = entry.data.componentSignature
  if (!entry.data.sourcePath) return signature

  const [generated] = await getCollection(
    'componentProps',
    ({ id }) => id === entry.data.sourcePath
  )

  if (!generated) return signature

  const { props, events, bindings } = generated.data
  return { ...signature, props, events, bindings }
}

export type ComponentSignature = Awaited<ReturnType<typeof getComponentSignature>>

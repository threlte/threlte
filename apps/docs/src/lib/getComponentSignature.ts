import { getEntry, type CollectionEntry } from 'astro:content'

export const getComponentSignature = async (entry: CollectionEntry<'reference'>) => {
  const signature = entry.data.componentSignature
  const generated = entry.data.sourcePath
    ? await getEntry('componentProps', entry.data.sourcePath)
    : undefined

  if (!generated) return signature

  const { props, events, bindings } = generated.data
  return { ...signature, props, events, bindings }
}

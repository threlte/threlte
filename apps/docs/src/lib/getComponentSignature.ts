import { getEntry, type CollectionEntry } from 'astro:content'

/**
 * The signature shown on a reference page. Props, events and bindings come
 * from the component's types when they're generated for its `sourcePath`,
 * and everything else (`extends`, `exports`, `pretext`) from the page's
 * frontmatter.
 */
export const getComponentSignature = async (entry: CollectionEntry<'reference'>) => {
  const signature = entry.data.componentSignature
  const generated = entry.data.sourcePath
    ? await getEntry('componentProps', entry.data.sourcePath)
    : undefined

  if (!generated) return signature

  const { props, events, bindings } = generated.data
  return { ...signature, props, events, bindings }
}

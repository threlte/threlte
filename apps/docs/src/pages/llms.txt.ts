import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

const TAGLINE =
  'Threlte is an open-source 3D framework for Svelte. Build interactive 3D apps for the web with declarative, reactive components powered by Three.js.'

const LEARN_CATEGORIES = [
  'Getting Started',
  'Basics',
  'Advanced',
  'More',
  'Preprocessing'
] as const

const REFERENCE_PACKAGES = [
  '@threlte/core',
  '@threlte/extras',
  '@threlte/rapier',
  '@threlte/theatre',
  '@threlte/gltf',
  '@threlte/xr',
  '@threlte/flex',
  '@threlte/studio',
  'Documentation'
] as const

const byOrder = (
  a: { data: { order?: number }; id: string },
  b: { data: { order?: number }; id: string }
) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.id.localeCompare(b.id)

const titleFromId = (id: string) => {
  const last = id.split('/').pop() ?? id
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL
  const origin = site ?? new URL('https://threlte.xyz')
  const link = (path: string) => {
    const rel = path.startsWith('/') ? path.slice(1) : path
    return new URL(base.replace(/^\//, '') + rel, origin).toString()
  }

  const [learn, reference, examples] = await Promise.all([
    getCollection('learn', (e) => !e.data.isDivider && e.data.showInSidebar !== false),
    getCollection('reference', (e) => !e.data.isDivider && e.data.showInSidebar !== false),
    getCollection('examples')
  ])

  let out = `# Threlte\n\n> ${TAGLINE}\n\n`

  out += `## Learn\n\n`
  for (const cat of LEARN_CATEGORIES) {
    const entries = learn
      .filter((e: CollectionEntry<'learn'>) => e.data.category === cat)
      .sort(byOrder)
    if (entries.length === 0) continue
    out += `### ${cat}\n\n`
    for (const e of entries) {
      const desc = e.data.description ? `: ${e.data.description}` : ''
      out += `- [${e.data.title}](${link(`docs/learn/${e.id}`)})${desc}\n`
    }
    out += `\n`
  }

  out += `## Reference\n\n`
  for (const pkg of REFERENCE_PACKAGES) {
    const entries = reference
      .filter((e: CollectionEntry<'reference'>) => e.data.category === pkg)
      .sort(byOrder)
    if (entries.length === 0) continue
    out += `### ${pkg}\n\n`
    for (const e of entries) {
      const desc = e.data.description ? `: ${e.data.description}` : ''
      out += `- [${e.data.title}](${link(`docs/reference/${e.id}`)})${desc}\n`
    }
    out += `\n`
  }

  if (examples.length > 0) {
    out += `## Examples\n\n`
    for (const e of examples.sort(byOrder)) {
      out += `- [${titleFromId(e.id)}](${link(`docs/examples/${e.id}`)})\n`
    }
    out += `\n`
  }

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}

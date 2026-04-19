import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { readFile } from 'node:fs/promises'

const TAGLINE =
  'Threlte is an open-source 3D framework for Svelte. Build interactive 3D apps for the web with declarative, reactive components powered by Three.js.'

const byOrder = (
  a: { data: { order?: number }; id: string },
  b: { data: { order?: number }; id: string }
) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.id.localeCompare(b.id)

const stripFrontmatter = (source: string) =>
  source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trimStart()

const loadBody = async (entry: { body?: string; filePath?: string }) => {
  if (entry.body) return stripFrontmatter(entry.body)
  if (entry.filePath) {
    const raw = await readFile(entry.filePath, 'utf-8')
    return stripFrontmatter(raw)
  }
  return ''
}

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL
  const origin = site ?? new URL('https://threlte.xyz')
  const link = (path: string) => {
    const rel = path.startsWith('/') ? path.slice(1) : path
    return new URL(base.replace(/^\//, '') + rel, origin).toString()
  }

  const [learn, reference] = await Promise.all([
    getCollection('learn', (e) => !e.data.isDivider && e.data.showInSidebar !== false),
    getCollection('reference', (e) => !e.data.isDivider && e.data.showInSidebar !== false)
  ])

  const sections: string[] = [`# Threlte\n\n> ${TAGLINE}\n`]

  sections.push(`\n# Learn\n`)
  for (const e of (learn as CollectionEntry<'learn'>[]).slice().sort(byOrder)) {
    const body = await loadBody(e as unknown as { body?: string; filePath?: string })
    sections.push(
      `\n---\n\n## ${e.data.title}\n\nCategory: ${e.data.category}  \nURL: ${link(`docs/learn/${e.id}`)}\n\n${body}\n`
    )
  }

  sections.push(`\n# Reference\n`)
  for (const e of (reference as CollectionEntry<'reference'>[]).slice().sort(byOrder)) {
    const body = await loadBody(e as unknown as { body?: string; filePath?: string })
    sections.push(
      `\n---\n\n## ${e.data.title}\n\nPackage: ${e.data.category}  \nURL: ${link(`docs/reference/${e.id}`)}\n\n${body}\n`
    )
  }

  return new Response(sections.join(''), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}

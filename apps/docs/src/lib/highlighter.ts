import { getHighlighter, setCDN, type Highlighter } from 'shiki'

setCDN('https://unpkg.com/shiki/')

let highlighter: Promise<Highlighter>

export const getShiki = () => {
  if (highlighter) return highlighter
  highlighter = getHighlighter({
    theme: 'dracula-soft',
    langs: [
      'astro',
      'typescript',
      'javascript',
      'svelte',
      'astro',
      'markdown',
      'mdx',
      'md',
      'json',
      'html',
      'bash',
      'glsl'
    ]
  })
  return highlighter
}

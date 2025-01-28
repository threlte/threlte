import { createHighlighter } from 'shiki'

export const highlighter = await createHighlighter({
  themes: ['dracula-soft'],
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

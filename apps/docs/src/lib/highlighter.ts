import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import draculaSoft from '@shikijs/themes/dracula-soft'

import astro from '@shikijs/langs/astro'
import typescript from '@shikijs/langs/typescript'
import javascript from '@shikijs/langs/javascript'
import svelte from '@shikijs/langs/svelte'
import markdown from '@shikijs/langs/markdown'
import mdx from '@shikijs/langs/mdx'
import md from '@shikijs/langs/md'
import json from '@shikijs/langs/json'
import html from '@shikijs/langs/html'
import bash from '@shikijs/langs/bash'
import glsl from '@shikijs/langs/glsl'

import type { HighlighterCore } from 'shiki'

let highlighter: Promise<HighlighterCore>

export const getShiki = () => {
  if (highlighter) return highlighter
  highlighter = createHighlighterCore({
    themes: [draculaSoft],
    engine: createOnigurumaEngine(import('shiki/wasm')),
    langs: [astro, typescript, javascript, svelte, markdown, mdx, md, json, html, bash, glsl]
  })
  return highlighter
}

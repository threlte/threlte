import draculaSoft from '@shikijs/themes/dracula-soft'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
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

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  shiki: {
    themes: [draculaSoft],
    langs: [astro, typescript, javascript, svelte, markdown, mdx, md, json, html, bash, glsl]
  },
  plugins: [pluginLineNumbers()]
}

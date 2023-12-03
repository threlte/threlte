import type { AstroGlobal } from 'astro'

/** Gets the URL to edit the page on GitHub */
export const getGithubEditUrl = (Astro: Readonly<AstroGlobal>) => {
  const currentPage = Astro.url.pathname
  return `https://github.com/threlte/threlte/blob/main/apps/docs/src/content/${currentPage
    .replace('/docs/', '')
    .replace(/\/$/, '')}.mdx`
}

import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL
  const origin = site ?? new URL('https://threlte.xyz')
  const sitemap = new URL(
    `${base}sitemap-index.xml`.replace(/\/+/g, '/').replace(/^\//, ''),
    origin
  ).toString()
  const disallow = `${base}examples/`.replace(/\/+/g, '/')

  const body = `User-agent: *\nAllow: ${base}\nDisallow: ${disallow}\n\nSitemap: ${sitemap}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}

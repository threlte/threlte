/// Service worker that rewrites absolute asset paths to include the base path.
/// This handles runtime fetch/XHR/Image.src calls (e.g. useGltf('/cube.glb'))
/// that Astro's base config can't rewrite at build time.
///
/// Only active when the site is deployed under a subpath (e.g. /threlte/).
/// When base is '/', the worker does nothing.

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only rewrite same-origin requests
  if (url.origin !== self.location.origin) return

  // Get the base path from the service worker's own URL
  // The SW is registered at /base/sw-base-rewrite.js, so its scope is /base/
  const scope = self.registration.scope
  const base = new URL(scope).pathname

  // If base is '/', nothing to rewrite
  if (base === '/') return

  // If the request already starts with the base path, let it through
  if (url.pathname.startsWith(base)) return

  // Rewrite: prepend base path
  url.pathname = base + url.pathname.slice(1)
  event.respondWith(fetch(url))
})

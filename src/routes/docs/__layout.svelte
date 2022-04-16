<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({ sidebar: '/docs' })
</script>

<script>
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/fonts.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '@svelteness/kit-docs/client/styles/vars.css'
  import {
    KitDocs,
    createKitDocsLoader,
    createSidebarContext,
    KitDocsLayout
  } from '@svelteness/kit-docs'

  /** @type {import('@svelteness/kit-docs').MarkdownMeta} */
  export let meta

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig} */
  export let sidebar

  const { activeCategory } = createSidebarContext(sidebar)

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [{ title: 'Documentation', slug: '/docs', match: /\/docs/ }]
  }
</script>

<svelte:head>
  <title>{meta.title} | Threlte</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div slot="navbar-left">
      <img class="header-logo" src="/logo/threlte-logo.png" alt="" />
    </div>
    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 255, 62, 0;
  }

  :global(:root.dark) {
    --kd-color-brand-rgb: 255, 62, 0;
  }

  .header-logo {
    height: 40px;
  }
</style>

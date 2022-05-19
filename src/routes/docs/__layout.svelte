<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({ sidebar: '/docs' })
</script>

<script lang="ts">
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '@svelteness/kit-docs/client/styles/vars.css'
  import '@docsearch/css'
  import '@svelteness/kit-docs/client/styles/docsearch.css'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'

  import {
    KitDocs,
    createKitDocsLoader,
    createSidebarContext,
    KitDocsLayout,
    type NavbarConfig,
    type ResolvedSidebarConfig,
    type MarkdownMeta,
    SocialLink
  } from '@svelteness/kit-docs'

  export let meta: MarkdownMeta

  export let sidebar: ResolvedSidebarConfig

  const { activeCategory } = createSidebarContext(sidebar)

  const navbar: NavbarConfig = {
    links: []
  }
</script>

<svelte:head>
  {#if $activeCategory && $activeCategory.length}
    <title>{$activeCategory}: {meta.title} | Threlte</title>
  {:else}
    <title>{meta.title} | Threlte</title>
  {/if}
  <meta name="description" content={meta.description} />
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar} search>
    <div slot="sidebar-top">
      <a href="/" alt="Threlte Logo">
        <img class="header-logo" src="/logo/threlte-logo.png" alt="" />
      </a>
    </div>
    <Algolia
      apiKey="933f0fd01c55969aa6201c2ea114809e"
      appId="ZEJ3L4CHC0"
      indexName="threlte"
      placeholder="Search documentation"
      slot="search"
    />
    <div slot="navbar-left">
      <a href="/" alt="Threlte Logo"
        ><img class="header-logo" src="/logo/threlte-logo.png" alt="" /></a
      >
    </div>
    <div slot="navbar-right-alt">
      <SocialLink type="gitHub" href="https://github.com/grischaerbe/threlte" />
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

  :global(nav ul > li > ul > li) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
</style>

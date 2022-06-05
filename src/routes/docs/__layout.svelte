<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({ sidebar: '/docs' })
</script>

<script lang="ts">
  import '@docsearch/css'
  import {
    ColorSchemeMenu,
    createKitDocsLoader,
    createSidebarContext,
    KitDocs,
    KitDocsLayout,
    SocialLink as Icon,
    type MarkdownMeta,
    type NavbarConfig
  } from '@svelteness/kit-docs'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/docsearch.css'
  import '../../styles/kit-docs.css'
  import { sidebar } from './navigation'

  export let meta: MarkdownMeta

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
      <div class="flex flex-row justify-between items-center mt-8 -mb-3">
        <Icon class="!p-0 " type="gitHub" href="https://github.com/grischaerbe/threlte">
          GitHub
        </Icon>
        <ColorSchemeMenu />
      </div>
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
      <Icon type="gitHub" href="https://github.com/grischaerbe/threlte" />
    </div>
    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  .header-logo {
    height: 40px;
  }

  :global(nav ul > li > ul > li) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
</style>

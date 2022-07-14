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
    SocialLink,
    type MarkdownMeta,
    type NavbarConfig
  } from '@svelteness/kit-docs'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/docsearch.css'
  import DiscordIcon from '../../kit-docs/DiscordIcon.svelte'
  import GithubIcon from '../../kit-docs/GithubIcon.svelte'
  import { colorScheme } from '@svelteness/kit-docs'
  import '../../styles/kit-docs.css'
  import { sidebar } from './navigation'

  export let meta: MarkdownMeta

  const { activeCategory } = createSidebarContext(sidebar)

  const navbar: NavbarConfig = {
    links: []
  }

  colorScheme.set('light')
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
      <div class="flex flex-col gap-3 mt-8">
        <GithubIcon class="!p-0" href="https://github.com/grischaerbe/threlte">GitHub</GithubIcon>
        <DiscordIcon class="!p-0" href="https://discord.gg/EqUBCfCaGm">Discord</DiscordIcon>
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
      <GithubIcon href="https://github.com/grischaerbe/threlte">GitHub</GithubIcon>
      <SocialLink type="discord" href="#" />
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

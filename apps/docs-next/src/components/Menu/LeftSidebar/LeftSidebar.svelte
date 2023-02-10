<script lang="ts">
  import Tabs, { type Tab } from '$components/Tabs/Tabs.svelte'
  import LeftSidebarCategory from './LeftSidebarCategory.svelte'
  import { persistBrowserSession } from '@macfja/svelte-persistent-store'
  import { writable } from 'svelte/store'

  export let menu: Record<'learn' | 'reference', LeftSidebarMenu>

  const activeMenu = persistBrowserSession(
    writable<keyof typeof menu>('learn'),
    'docs-left-sidebar-active-menu'
  )

  const onTabSelect = (e: CustomEvent<Tab>) => {
    $activeMenu = e.detail.id as 'learn' | 'reference'
  }
</script>

<nav class="pl-6 flex flex-col h-full relative w-full">
  <div class="relative pb-6 w-full">
    <Tabs
      on:select={onTabSelect}
      tabs={[
        {
          id: 'learn',
          title: 'Learn'
        },
        {
          id: 'reference',
          title: 'Reference'
        }
      ]}
      activeTabId={$activeMenu}
    />

    <div
      class="absolute top-full left-0 w-full h-4 pointer-events-none bg-gradient-to-b from-[#0D131F] to-transparent z-20"
    />
  </div>

  <ul class="overflow-auto h-full scrollbar-hide pt-2 pb-6">
    {#each menu[$activeMenu].categories as category}
      <li class="mb-6">
        <LeftSidebarCategory {category} />
      </li>
    {/each}
  </ul>
</nav>

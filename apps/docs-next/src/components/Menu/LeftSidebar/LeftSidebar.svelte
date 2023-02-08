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

<nav class="pl-6">
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

  <ul>
    {#each menu[$activeMenu].categories as category}
      <li>
        <LeftSidebarCategory {category} />
      </li>
    {/each}
  </ul>
</nav>

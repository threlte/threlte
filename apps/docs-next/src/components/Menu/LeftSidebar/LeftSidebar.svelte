<script lang="ts">
  import Tabs, { type Tab } from '$components/Tabs/Tabs.svelte'
  import { c } from '$lib/classes'
  import LeftSidebarCategory from './LeftSidebarCategory.svelte'

  export let menu: Record<'learn' | 'reference', LeftSidebarMenu>
  export let activeSidebarTab: 'learn' | 'reference'

  const onTabSelect = (e: CustomEvent<Tab>) => {
    activeSidebarTab = e.detail.id as 'learn' | 'reference'
  }

  export let activeUrlPathName: string

  let leftSidebar: HTMLElement
</script>

<nav
  class={c('hidden relative md:block h-full w-full px-6')}
  bind:this={leftSidebar}
>
  <div class={c('relative w-full pt-0 block')}>
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
      activeTabId={activeSidebarTab}
    />

    <div class="pointer-events-none absolute top-full left-0 z-20 h-4 w-full" />
  </div>

  <ul class={c('overflow-y-auto mt-0 overflow-auto pt-6 pb-24 block px-2 h-full scrollbar-hide')}>
    {#each menu[activeSidebarTab].categories as category}
      <li class="mb-6 text-sm">
        <LeftSidebarCategory
          {category}
          {activeUrlPathName}
        />
      </li>
    {/each}
  </ul>
</nav>

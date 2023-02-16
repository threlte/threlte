<script lang="ts">
  import Tabs, { type Tab } from '$components/Tabs/Tabs.svelte'
  import { persistBrowserSession } from '@macfja/svelte-persistent-store'
  import { writable } from 'svelte/store'
  import LeftSidebarCategory from './LeftSidebarCategory.svelte'

  export let menu: Record<'learn' | 'reference', LeftSidebarMenu>

  const activeMenu = persistBrowserSession(
    writable<keyof typeof menu>('learn'),
    'docs-left-sidebar-active-menu'
  )

  const onTabSelect = (e: CustomEvent<Tab>) => {
    $activeMenu = e.detail.id as 'learn' | 'reference'
  }

  let leftSidebar: HTMLElement
  let mobileToggle = false

  $: {
    if (mobileToggle && leftSidebar) leftSidebar.focus()
  }
</script>

<button
  class={`${
    mobileToggle ? 'glow-orange bg-orange-300' : 'glow-green bg-green-400'
  }  group fixed bottom-1 right-1 z-50  m-0 flex h-16 w-16 flex-col items-center justify-center rounded-full p-0 md:hidden`}
  on:click={() => {
    mobileToggle = !mobileToggle
  }}
>
  <!-- {mobileToggle ? 'close' : 'open'} -->
  <div
    class={`ease my-1 h-1 w-6 transform rounded-full bg-black transition duration-300  ${
      mobileToggle ? 'translate-y-3 rotate-45' : ''
    }`}
  />
  <div
    class={`ease my-1 h-1 w-6 transform rounded-full bg-black transition duration-300 ${
      mobileToggle ? 'opacity-0' : ''
    }`}
  />
  <div
    class={`ease my-1 h-1 w-6 transform rounded-full bg-black transition duration-300 ${
      mobileToggle ? '-translate-y-3 -rotate-45' : ''
    }`}
  />
</button>

<nav
  class={`relative flex h-screen w-full transform  flex-col-reverse bg-gradient-to-r from-[#0D1421] via-[#0D1421]/90 to-[#0D1421]/50 px-6 pt-16 backdrop-blur-sm duration-100 ease-in md:block  md:h-full md:flex-col md:bg-[#0D131F] md:bg-transparent md:bg-none md:pl-6 md:pt-0 md:backdrop-blur-none ${
    mobileToggle ? 'translate-x-0 ' : 'h-[0vh] -translate-x-full'
  } md:block md:translate-x-0`}
  bind:this={leftSidebar}
>
  <div
    class={`relative w-4/5 pt-2 pb-6 md:w-full md:pt-0 ${mobileToggle ? '' : 'hidden'} md:block`}
  >
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

    <div class="pointer-events-none absolute top-full left-0 z-20 h-4 w-full" />
  </div>

  <ul
    class={`mt-6 block overflow-y-auto md:mt-0 md:overflow-auto md:pt-2 md:pb-6 ${
      mobileToggle ? '' : 'hidden'
    } md:block`}
  >
    {#each menu[$activeMenu].categories as category}
      <li class="mb-6">
        <LeftSidebarCategory {category} />
      </li>
    {/each}
  </ul>
</nav>

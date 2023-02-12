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
  }  w-16 h-16 rounded-full p-0 m-0  fixed bottom-1 right-1 z-50 md:hidden flex flex-col justify-center items-center group`}
  on:click={() => {
    mobileToggle = !mobileToggle
  }}
>
  <!-- {mobileToggle ? 'close' : 'open'} -->
  <div
    class={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300  ${
      mobileToggle ? 'rotate-45 translate-y-3' : ''
    }`}
  />
  <div
    class={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 ${
      mobileToggle ? 'opacity-0' : ''
    }`}
  />
  <div
    class={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 ${
      mobileToggle ? '-rotate-45 -translate-y-3' : ''
    }`}
  />
</button>

<nav
  class={`px-6 md:pl-6 flex flex-col-reverse md:flex-col  h-screen md:h-full relative w-full bg-gradient-to-r from-[#0D1421] via-[#0D1421]/90 to-[#0D1421]/50 md:bg-none backdrop-blur-sm md:backdrop-blur-none  md:bg-[#0D131F] md:bg-transparent pt-16 md:pt-0 md:block transform ease-in duration-100 ${
    mobileToggle ? 'translate-x-0 ' : '-translate-x-full h-[0vh]'
  } md:block md:translate-x-0`}
  bind:this={leftSidebar}
>
  <div
    class={`relative pt-2 md:pt-0 pb-6 w-4/5 md:w-full ${mobileToggle ? '' : 'hidden'} md:block`}
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

    <div class="absolute top-full left-0 w-full h-4 pointer-events-none z-20" />
  </div>

  <ul
    class={`md:overflow-auto md:pt-2 md:pb-6 block overflow-y-auto mt-6 md:mt-0 ${
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

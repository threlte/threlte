<script lang="ts">
  import { c } from '$lib/classes'
  import { onMount } from 'svelte'
  import Details from './Details.svelte'
  import type { getLeftSidebarMenu } from './LeftSidebar/getLeftSidebarMenu'
  import LeftSidebarCategory from './LeftSidebar/LeftSidebarCategory.svelte'
  import MobileNav from './MobileNav.svelte'

  export let sidebarMenu: Awaited<ReturnType<typeof getLeftSidebarMenu>>
  const keys: (keyof typeof sidebarMenu)[] = ['learn', 'reference']

  const open: Record<keyof typeof sidebarMenu, boolean> = keys.reduce((acc, currentKey) => {
    acc[currentKey] = false
    return acc
  }, {} as Record<keyof typeof sidebarMenu, boolean>)

  onMount(() => {
    // make url
    const url = new URL(window.location.href)
    // the docs are available at /docs/…
    const docsPrefix = '/docs/'
    // get the path after /docs/
    const path = url.pathname.slice(docsPrefix.length)
    // get the first part of the path
    const [category] = path.split('/')
    if (category === 'learn' || category === 'reference') {
      // if the first part of the path is "learn" or "reference", open the corresponding category
      open[category] = true
    }
  })
</script>

<MobileNav>
  <svelte:fragment slot="topbar-left">
    <a
      class="flex flex-row gap-3"
      href="/"
    >
      <slot name="logo" />
      <h2
        class="text-orange translate-y-px rounded-md border-2 border-orange-500 bg-orange-800/50 px-1.5 text-2xl font-bold"
      >
        DOCS
      </h2>
    </a>
  </svelte:fragment>
  <div
    slot="content"
    class="flex flex-col gap-4 text-lg"
  >
    <ul class={c('flex flex-col gap-2 overflow-y-auto')}>
      {#each keys as key}
        <li>
          <!-- The container for "learn" and "reference" categories -->
          <Details
            id={key}
            open={open[key]}
          >
            <div
              class="font-normal"
              slot="summary"
            >
              {#if key === 'learn'}
                Learn
              {:else if key === 'reference'}
                Reference
              {/if}
            </div>
            {#each sidebarMenu[key].categories as category}
              <li class="ml-4 mt-2 mb-0 text-sm">
                <LeftSidebarCategory {category} />
              </li>
            {/each}
          </Details>
        </li>
      {/each}
    </ul>

    <hr />

    <div class="flex flex-col gap-2">
      <!-- <a href="/docs/learn/getting-started"> Docs </a> -->
      <a href="/showcase"> Showcase </a>
    </div>

    <slot name="after-navigation" />
  </div>
</MobileNav>

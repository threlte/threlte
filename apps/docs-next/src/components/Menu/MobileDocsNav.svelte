<script lang="ts">
  import { c } from '$lib/classes'
  import Details from './Details.svelte'
  import type { getLeftSidebarMenu } from './LeftSidebar/getLeftSidebarMenu'
  import LeftSidebarCategory from './LeftSidebar/LeftSidebarCategory.svelte'
  import MobileNav from './MobileNav.svelte'

  export let sidebarMenu: Awaited<ReturnType<typeof getLeftSidebarMenu>>
  const keys: (keyof typeof sidebarMenu)[] = ['learn', 'reference']

  export let activeSidebarTab: 'learn' | 'reference'
  export let activeUrlPathName: string
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
            open={activeSidebarTab === key}
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
                <LeftSidebarCategory
                  {category}
                  {activeUrlPathName}
                />
              </li>
            {/each}
          </Details>
        </li>
      {/each}
    </ul>

    <hr />

    <div class="flex flex-col gap-2">
      <a href="/showcase"> Showcase </a>
    </div>

    <slot name="after-navigation" />
  </div>
</MobileNav>

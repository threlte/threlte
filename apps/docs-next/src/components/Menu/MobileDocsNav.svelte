<script lang="ts">
  import { c } from '$lib/classes'
  import Details from './Details.svelte'
  import type { getLeftSidebarMenu } from './LeftSidebar/getLeftSidebarMenu'
  import LeftSidebarCategory from './LeftSidebar/LeftSidebarCategory.svelte'
  import MobileNav from './MobileNav.svelte'

  export let sidebarMenu: Awaited<ReturnType<typeof getLeftSidebarMenu>>
  const keys: (keyof typeof sidebarMenu)[] = ['learn', 'reference']
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
    class="text-md flex flex-col gap-4"
  >
    <ul class={c('mt-6 block overflow-y-auto md:mt-0 md:overflow-auto md:pt-2 md:pb-6 md:block')}>
      {#each keys as key}
        <li class="mb-1">
          <!-- The container for "learn" and "reference" categories -->
          <Details id={key}>
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
              <li class="ml-2 my-4">
                <LeftSidebarCategory {category} />
              </li>
            {/each}
          </Details>
        </li>
      {/each}
    </ul>

    <slot name="after-navigation" />
  </div>
</MobileNav>

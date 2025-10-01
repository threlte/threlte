<script lang="ts">
  import Details from './Details.svelte'
  import type { getLeftSidebarMenu } from './LeftSidebar/getLeftSidebarMenu'
  import LeftSidebarCategory from './LeftSidebar/LeftSidebarCategory.svelte'
  import MobileNav from './MobileNav.svelte'

  export let sidebarMenu: Awaited<ReturnType<typeof getLeftSidebarMenu>>
  const keys: (keyof typeof sidebarMenu)[] = ['learn', 'reference', 'examples']

  export let activeSidebarTab: 'learn' | 'reference' | 'examples'
  export let activeUrlPathName: string
</script>

<MobileNav search>
  <svelte:fragment slot="topbar-left">
    <a
      class="flex flex-row gap-3"
      href="/"
    >
      <slot name="logo" />
    </a>
  </svelte:fragment>

  <div
    slot="content"
    class="flex flex-col gap-4 text-lg"
  >
    <ul class="flex flex-col gap-2 overflow-y-auto">
      {#each keys as key}
        <li>
          <!-- The container for "learn" and "reference" categories -->
          <Details
            id={key}
            open={activeSidebarTab === key}
          >
            {#snippet summary()}
              <div class="font-normal">
                {#if key === 'learn'}
                  Learn
                {:else if key === 'reference'}
                  Reference
                {:else if key === 'examples'}
                  Examples
                {/if}
              </div>
            {/snippet}

            {#each sidebarMenu[key].categories as category}
              <li class="mb-0 ml-4 mt-2 text-sm">
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

    <!-- Implement as soon as there are showcase entries -->
    <!-- <div class="flex flex-col gap-2">
      <a href="/showcase"> Showcase </a>
    </div> -->

    <slot name="socials" />
  </div>
</MobileNav>

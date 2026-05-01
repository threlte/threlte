<script lang="ts">
  import type { Snippet } from 'svelte'
  import Details from './Details.svelte'
  import type { getLeftSidebarMenu } from './LeftSidebar/getLeftSidebarMenu'
  import LeftSidebarCategory from './LeftSidebar/LeftSidebarCategory.svelte'
  import MobileNav from './MobileNav.svelte'

  const keys: (keyof typeof sidebarMenu)[] = ['learn', 'reference', 'examples']

  interface Props {
    sidebarMenu: Awaited<ReturnType<typeof getLeftSidebarMenu>>
    activeSidebarTab: 'learn' | 'reference' | 'examples'
    activeUrlPathName: string
    baseUrl: string
    logo?: Snippet
    socials?: Snippet
  }

  let { sidebarMenu, activeSidebarTab, activeUrlPathName, baseUrl, logo, socials }: Props = $props()
</script>

<MobileNav search>
  {#snippet topbarLeft()}
    <a
      class="flex flex-row gap-3"
      href={import.meta.env.BASE_URL}
    >
      {@render logo?.()}
    </a>
  {/snippet}

  {#snippet content()}
    <div class="flex flex-col gap-4 text-lg">
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
                <li class="mt-2 mb-0 ml-4 text-sm">
                  <LeftSidebarCategory
                    {category}
                    {activeUrlPathName}
                    {baseUrl}
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

      {@render socials?.()}
    </div>
  {/snippet}
</MobileNav>

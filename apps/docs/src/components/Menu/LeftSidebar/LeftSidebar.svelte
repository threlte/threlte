<script lang="ts">
  import { c } from '$lib/classes'
  import LeftSidebarCategory from './LeftSidebarCategory.svelte'

  export let menu: Record<'learn' | 'reference' | 'examples', LeftSidebarMenu>
  export let activeSidebarTab: 'learn' | 'reference' | 'examples'

  export let activeUrlPathName: string
</script>

<nav class={c('relative hidden h-full w-full px-6 md:block')}>
  <ul
    id="sidebar-scrollwindow"
    class={c('scrollbar-hide mt-0 block h-full overflow-auto overflow-y-auto pb-24')}
  >
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

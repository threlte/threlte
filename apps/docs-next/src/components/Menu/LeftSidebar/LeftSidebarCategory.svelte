<script lang="ts">
  import { persistBrowserSession } from '@macfja/svelte-persistent-store'
  import { writable } from 'svelte/store'
  import Details from '../Details.svelte'

  export let category: LeftSidebarMenuCategory

  const open = persistBrowserSession(
    writable<boolean>(true),
    `docs-left-sidebar-${category.title}-is-open`
  )
</script>

<Details
  bind:open={$open}
  id="sidebar-category-{category.title}"
>
  <svelte:fragment slot="summary">
    {category.title}
  </svelte:fragment>

  <ul class="text-faded ml-2 mt-2 mb-2">
    {#each category.menuItems as item}
      <li class="mb-2 last:mb-0">
        <a href={`${category.urlPrefix}/${item.slug}`}>{item.title}</a>
      </li>
    {/each}
  </ul>
</Details>

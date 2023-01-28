<script lang="ts">
  import { persistBrowserSession } from '@macfja/svelte-persistent-store'
  import { writable } from 'svelte/store'

  export let category: LeftSidebarMenuCategory

  const isOpen = persistBrowserSession(
    writable<boolean>(true),
    `docs-left-sidebar-${category.title}-is-open`
  )
</script>

<details bind:open={$isOpen}>
  <summary>{category.title}</summary>
  <ul>
    {#each category.menuItems as item}
      <a href={`${category.urlPrefix}/${item.slug}`}>{item.title}</a>
    {/each}
  </ul>
</details>

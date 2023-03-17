<script lang="ts">
  import { c } from '$lib/classes'
  import Details from '../Details.svelte'

  export let category: LeftSidebarMenuCategory
  export let activeUrlPathName: string

  let open = true

  const isEqual = (a: string, b: string) => {
    a = a.startsWith('/') ? a.slice(1) : a
    a = a.endsWith('/') ? a.slice(0, -1) : a
    b = b.startsWith('/') ? b.slice(1) : b
    b = b.endsWith('/') ? b.slice(0, -1) : b
    return a === b
  }
</script>

<Details
  {open}
  id="sidebar-category-{category.title}"
>
  <svelte:fragment slot="summary">
    {category.title}
  </svelte:fragment>

  <ul class="text-faded my-2">
    {#each category.menuItems as item}
      <li class="last:mb-0">
        <a
          class={c(
            'block pl-2 md:pl-4 md:-mx-2 py-1 rounded-sm',
            isEqual(activeUrlPathName, `${category.urlPrefix}/${item.slug}`) &&
              'bg-blue-700/30 text-white'
          )}
          href={`${category.urlPrefix}/${item.slug}`}>{item.title}</a
        >
      </li>
    {/each}
  </ul>
</Details>

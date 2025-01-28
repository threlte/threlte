<script lang="ts">
  import Details from '../Details.svelte'

  interface Props {
    category: LeftSidebarMenuCategory
    activeUrlPathName: string
  }

  let { category, activeUrlPathName }: Props = $props()

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
  {#snippet summary()}
    {category.title}
  {/snippet}

  <ul class="text-faded my-2">
    {#each category.menuItems as item}
      {#if item.isDivider}
        <div
          class="mb-2 flex flex-row items-end justify-start gap-1 py-1 pt-4 text-xs font-bold uppercase tracking-wide text-white"
        >
          {item.title}
        </div>
      {:else}
        <li class="last:mb-0">
          <a
            class={[
              'group relative block border-l-2 py-1 pl-4 pr-4 hover:text-white',
              isEqual(activeUrlPathName, `${category.urlPrefix}/${item.slug}`)
                ? 'border-orange font-bold text-orange'
                : 'border-white/20 hover:border-white'
            ]}
            href={`${category.urlPrefix}/${item.slug}`}
          >
            {item.title}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</Details>

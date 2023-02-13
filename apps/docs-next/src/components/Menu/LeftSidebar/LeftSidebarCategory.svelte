<script lang="ts">
  import { persistBrowserSession } from '@macfja/svelte-persistent-store'
  import { writable } from 'svelte/store'

  export let category: LeftSidebarMenuCategory

  const isOpen = persistBrowserSession(
    writable<boolean>(true),
    `docs-left-sidebar-${category.title}-is-open`
  )
</script>

<details
  bind:open={$isOpen}
  class="block group text-lg md:text-sm"
>
  <summary class="font-bold list-none cursor-pointer select-none">
    <div class="flex flex-row items-center">
      {category.title}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 1 16 16"
          class="h-[1em] w-[1em] ml-1 rotate-0 translate-y-px group-open:-translate-y-px group-open:rotate-90 transition-all duration-200"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
            class="fill-white"
          />
        </svg>
      </div>
    </div>
  </summary>
  <ul class="ml-2 text-faded ">
    {#each category.menuItems as item}
      <li class="my-2 md:my-0">
        <a href={`${category.urlPrefix}/${item.slug}`}>{item.title}</a>
      </li>
    {/each}
  </ul>
</details>

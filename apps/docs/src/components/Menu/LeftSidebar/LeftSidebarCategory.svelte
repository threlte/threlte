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

  const groups = category.menuItems
    .reduce((acc, curr)=> {
      if (curr.isDivider) {
        acc.active = curr.title;
        acc.result.set(curr.title, []);
      } else {
        acc.result.get(acc.active).push(curr);
      }
      return acc;
    }, {
      active: 'pre',
      result: (new Map()).set('pre', []) as Map<string, typeof category.menuItems>
    }).result

    const pre = groups.get('pre');
    groups.delete('pre')

    let filter;

    $: filteredGroups = !filter ? groups.entries() : [...groups.entries()]
      .filter(([group, items]) => `${group.toLowerCase()} ${items.map((i) => i.title.toLowerCase()).join(' ')}`.includes(filter?.toLowerCase()))
</script>


<menu>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path></svg>
  <input type="text" placeholder="filter" bind:value={filter}/>
</menu>

<h2 class="font-bold">{category.title}</h2>

<ul class="text-faded my-2">
  {#each pre as item}
    <li class="last:mb-0">
      <a
        class={c(
          'group relative block border-l-2 py-1 pl-4 pr-4 hover:text-white',
          isEqual(activeUrlPathName, `${category.urlPrefix}/${item.slug}`)
            ? 'text-orange border-orange font-bold'
            : 'border-white/20 hover:border-white'
        )}
        href={`${category.urlPrefix}/${item.slug}`}
        data-astro-prefetch
      >
        {item.title}
      </a>
    </li>
  {/each}
</ul>

{#each filteredGroups as [group, items]}
  <Details
    {open}
    id="sidebar-category-{category.title}"
  >
    <svelte:fragment slot="summary">
      {group}
    </svelte:fragment> 
    <ul class="text-faded my-2">
      {#each items as item}
        <li class="last:mb-0">
          <a
            class={c(
              'group relative block border-l-2 py-1 pl-4 pr-4 hover:text-white',
              isEqual(activeUrlPathName, `${category.urlPrefix}/${item.slug}`)
                ? 'text-orange border-orange font-bold'
                : 'border-white/20 hover:border-white'
            )}
            href={`${category.urlPrefix}/${item.slug}`}
            data-astro-prefetch
          >
            {item.title}
          </a>
        </li>
      {/each}
    </ul>
  </Details>
{/each}


<style>
  menu {
    color: rgb(229, 231, 235);
    margin: 0.5rem 0.2rem;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    gap: 10px;
    border: solid 1px rgb(229, 231, 235);
    border-radius: 5px;
    opacity: 0.3;
  }

  menu:focus-within {
    outline: 1px solid rgb(254, 61, 0);
    border: none;
    opacity: 0.6;
  }

  menu > input:focus {
    outline: none;
  }

  menu > input {
    flex-grow: 1;
    background: none;
    max-width: 160px;
  }


</style>  
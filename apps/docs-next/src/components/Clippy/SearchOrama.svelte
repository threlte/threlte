<script>
  import { getOramaDB, search } from '@orama/plugin-astro/client'
  import { onMount } from 'svelte'

  export let oramaQuery = ''
  let db

  let query = ''

  let results = []

  $: s(oramaQuery)

  async function s(query) {
    if (db) results = (await search(db, { term: query })).hits || []
  }

  $: results && console.log(results)

  onMount(async () => {
    if (!db) db = await getOramaDB('mydb')
  })
</script>

<div class="flex flex-col gap-1">
  <h2 class="font-bold">Results for: {oramaQuery}</h2>
  {#each results as result}
    {#if result.score > 2}
      {@const breadcrumbs = result.document.path.replace('/docs/', '').split('/')}
      <a
        href="/"
        class="opacity-75 hover:opacity-100 text-left py-1 flex flex-col"
      >
        <div class="flex gap-2">
          {#each breadcrumbs as crumb, i}
            <span class="capitalize font-medium"
              >{`${crumb} ${i < breadcrumbs.length - 2 ? '>' : ''}`}</span
            >
          {/each}
        </div>
        <span>{result.document.content.replace(result.document.h1 || '', '').slice(0, 100)}...</span
        >
      </a>
    {/if}
  {/each}
</div>

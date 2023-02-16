<script lang="ts">
  import { onMount } from 'svelte'

  export let path: string

  const allAppModules = import.meta.glob('../../examples/**/App.svelte') as Record<
    string,
    () => Promise<any>
  >

  let mounted = false

  const AppModule = Object.entries(allAppModules).find(
    ([key]) => key.includes(path) && key.endsWith('App.svelte')
  )?.[1]

  onMount(() => {
    mounted = true
  })
</script>

<div class="relative h-[80vh] w-full overflow-hidden rounded-t-md border border-white/20">
  {#if mounted && AppModule}
    {#await AppModule() then Mod}
      <Mod.default />
    {/await}
  {/if}
</div>

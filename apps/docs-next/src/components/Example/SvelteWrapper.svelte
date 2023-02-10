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

<div class="w-full h-[80vh] relative border border-white/20 rounded-t-md overflow-hidden">
  {#if mounted && AppModule}
    {#await AppModule() then Mod}
      <Mod.default />
    {/await}
  {/if}
</div>

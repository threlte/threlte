<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    slug: string
  }

  let { slug }: Props = $props()

  const allAppModules = import.meta.glob('../../../examples/**/App.svelte') as Record<
    string,
    () => Promise<any>
  >

  let mounted = $state(false)

  const AppModule = Object.entries(allAppModules).find(
    ([key]) => key === '../../../examples/' + slug + '/App.svelte'
  )?.[1]

  onMount(() => {
    mounted = true
  })
</script>

{#if mounted && AppModule}
  {#await AppModule() then Mod}
    <Mod.default />
  {/await}
{/if}

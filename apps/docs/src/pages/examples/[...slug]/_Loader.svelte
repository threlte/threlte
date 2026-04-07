<script lang="ts">
  import { onMount } from 'svelte'
  import { getAllAppModules } from './_appModules'

  interface Props {
    slug: string
  }

  let { slug }: Props = $props()

  const allAppModules = getAllAppModules()

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

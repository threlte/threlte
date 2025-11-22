<script lang="ts">
  import { onMount } from 'svelte'
  import OpenInStackblitz from './OpenInStackblitz.svelte'
  import { getAllAppModules } from './globLoader'

  interface Props {
    path: string
    files: Record<string, string>
    hideCode: boolean
    hideStackblitz?: boolean
    iframe: boolean
    class?: string
  }

  let { path, files, hideCode, hideStackblitz = false, iframe, class: cls = '' }: Props = $props()

  const allAppModules = getAllAppModules()

  let mounted = $state(false)

  const AppModule = Object.entries(allAppModules).find(
    ([key]) => key.includes(path) && key.endsWith('App.svelte')
  )?.[1]

  onMount(() => {
    mounted = true
  })
</script>

<div
  class={[
    'relative mt-4 h-[80vh] w-full overflow-hidden rounded-t-md border border-white/20 bg-blue-900',
    hideCode && 'rounded-md!',
    cls
  ]}
>
  {#if iframe}
    <iframe
      src="/examples/{path}"
      title={path}
      class="h-full w-full border-none"
    ></iframe>
  {:else if mounted && AppModule}
    {#await AppModule() then Mod}
      <Mod.default />
    {/await}
  {/if}

  {#if !hideStackblitz}
    <div class="absolute bottom-4 right-4">
      <OpenInStackblitz {files} />
    </div>
  {/if}
</div>

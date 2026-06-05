<script lang="ts">
  import { Maximize2, Minimize2 } from 'lucide-svelte'
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
  let fullscreen = $state(false)
  let iframeElement: HTMLIFrameElement | undefined = $state()
  let iframeWindow: Window | null = null

  const AppModule = Object.entries(allAppModules).find(
    ([key]) => key.includes(path) && key.endsWith('App.svelte')
  )?.[1]

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && fullscreen) {
      fullscreen = false
    }
  }

  const detachIframeEscapeListener = () => {
    iframeWindow?.removeEventListener('keydown', handleKeyDown)
    iframeWindow = null
  }

  const attachIframeEscapeListener = () => {
    detachIframeEscapeListener()

    try {
      iframeWindow = iframeElement?.contentWindow ?? null
      iframeWindow?.addEventListener('keydown', handleKeyDown)
    } catch {
      iframeWindow = null
    }
  }

  onMount(() => {
    mounted = true
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      detachIframeEscapeListener()
    }
  })

  $effect(() => {
    if (!fullscreen) return

    const { body, documentElement } = document
    const bodyOverflow = body.style.overflow
    const documentOverflow = documentElement.style.overflow

    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = bodyOverflow
      documentElement.style.overflow = documentOverflow
    }
  })
</script>

<div
  class={[
    'relative mt-4 h-[80vh] w-full overflow-hidden rounded-t-md border border-white/20 bg-blue-900',
    hideCode && !fullscreen && 'rounded-md!',
    fullscreen && 'fixed! inset-0 z-50 mt-0! h-[100dvh]! w-screen! rounded-none! border-0!',
    !fullscreen && cls
  ]}
>
  {#if iframe}
    <iframe
      bind:this={iframeElement}
      src="{import.meta.env.BASE_URL}examples/{path}"
      title={path}
      class="h-full w-full border-none"
      onload={attachIframeEscapeListener}
    ></iframe>
  {:else if mounted && AppModule}
    {#await AppModule() then Mod}
      <Mod.default />
    {/await}
  {/if}

  <div class="absolute top-3 left-3 m-0 flex items-center gap-2">
    <button
      class="border-orange/5 text-orange m-0 flex size-7 cursor-pointer items-center justify-center rounded-xs border bg-orange-800/50 backdrop-blur-md hover:bg-orange-800/70 hover:text-orange-400 focus:outline-hidden"
      aria-label={fullscreen ? 'Close fullscreen example' : 'Open example fullscreen'}
      aria-pressed={fullscreen}
      title={fullscreen ? 'Close fullscreen' : 'Open fullscreen'}
      onclick={() => (fullscreen = !fullscreen)}
    >
      {#if fullscreen}
        <Minimize2 class="size-5" />
      {:else}
        <Maximize2 class="size-5" />
      {/if}
    </button>

    {#if !hideStackblitz}
      <OpenInStackblitz {files} />
    {/if}
  </div>
</div>

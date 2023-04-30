<script lang="ts">
  import type { IStudio } from '@theatre/studio'
  import { watch } from '@threlte/core'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { globalStudio } from '../consts'
  import { useStudio } from './useStudio'

  export let studio: IStudio | undefined = undefined
  export let hide: boolean

  const hideStore = writable(hide)
  $: hideStore.set(hide)

  const studioCtx = useStudio()

  let initialized = false

  onMount(async () => {
    if ($globalStudio) {
      studioCtx.studio.set($globalStudio)
      initialized = true
      return
    }
    const pkg = await import('@theatre/studio')
    const Studio = pkg.default
    Studio.initialize()
    globalStudio.set(Studio)
    studioCtx.studio.set(Studio)
    studio = Studio
    initialized = true
  })

  watch([globalStudio, hideStore], ([studio, hide]) => {
    if (hide) {
      studio?.ui.hide()
    } else {
      studio?.ui.restore()
    }

    return () => {
      studio?.ui.hide()
    }
  })
</script>

{#if initialized}
  <slot />
{/if}

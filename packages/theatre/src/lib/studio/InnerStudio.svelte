<script lang="ts">
  import { watch } from '@threlte/core'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { studio } from '../consts'

  export let hide: boolean

  const hideStore = writable(hide)
  $: hideStore.set(hide)

  let initialized = false

  onMount(async () => {
    if ($studio) {
      initialized = true
      return
    }
    const pkg = await import('@theatre/studio')
    const Studio = pkg.default
    Studio.initialize()
    studio.set(Studio)
    initialized = true
  })

  watch([studio, hideStore], ([studio, hide]) => {
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

<script
  lang="ts"
  context="module"
>
  import Studio from '@theatre/studio'
  import { studio } from '../consts'

  Studio.initialize()
  studio.set(Studio)
</script>

<script lang="ts">
  import { watch } from '@threlte/core'
  import { writable } from 'svelte/store'

  export let hide: boolean

  const hideStore = writable(hide)
  $: hideStore.set(hide)

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

<slot />

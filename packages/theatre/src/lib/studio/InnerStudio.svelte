<script
  lang="ts"
  module
>
  import Studio from '@theatre/studio'
  import { studio } from '../consts.js'

  Studio.initialize()
  studio.set(Studio)
</script>

<script lang="ts">
  import { watch } from '@threlte/core'
  import { writable } from 'svelte/store'

  interface Props {
    hide: boolean
    children?: import('svelte').Snippet
  }

  let { hide, children }: Props = $props()

  const hideStore = writable(hide)
  $effect(() => {
    hideStore.set(hide)
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

{@render children?.()}

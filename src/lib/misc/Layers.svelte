<script lang="ts">
  import type { ThrelteLayers, ThrelteLayersContext } from '../types/types'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let layers: ThrelteLayers | undefined = undefined

  const layerStore = writable<ThrelteLayers | undefined>(layers)
  $: layerStore.set(layers)

  setContext<ThrelteLayersContext>('threlte-layers', layerStore)
</script>

<slot />

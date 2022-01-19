<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { LayersProperties } from '../types/components'
  import type { ThrelteLayers, ThrelteLayersContext } from '../types/types'

  export let layers: LayersProperties['layers']

  const layerStore = writable<ThrelteLayers>(layers)
  $: layerStore.set(layers)

  setContext<ThrelteLayersContext>('threlte-layers', layerStore)
</script>

<slot />

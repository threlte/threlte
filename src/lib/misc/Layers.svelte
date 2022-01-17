<script lang="ts">
  import type { ThrelteLayers, ThrelteLayersContext } from '../types/types'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let layers: ThrelteLayers = 0

  const layerStore = writable<ThrelteLayers>(layers)
  $: layerStore.set(layers)

  setContext<ThrelteLayersContext>('threlte-layers', layerStore)
</script>

<slot />

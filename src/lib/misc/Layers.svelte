<script lang="ts" context="module">
  export type LayersProps = {
    layers: ThrelteLayers | undefined
  }
</script>

<script lang="ts">
  import type { ThrelteLayers, ThrelteLayersContext } from '../types/types'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let layers: LayersProps['layers']

  const layerStore = writable<ThrelteLayers | undefined>(layers)
  $: layerStore.set(layers)

  setContext<ThrelteLayersContext>('threlte-layers', layerStore)
</script>

<slot />

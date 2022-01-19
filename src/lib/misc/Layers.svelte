<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { LayersProps } from '../types/components'
  import type { ThrelteLayers, ThrelteLayersContext } from '../types/types'

  export let layers: LayersProps['layers']

  const layerStore = writable<ThrelteLayers | undefined>(layers)
  $: layerStore.set(layers)

  setContext<ThrelteLayersContext>('threlte-layers', layerStore)
</script>

<slot />

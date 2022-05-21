<script lang="ts">
  import { getContext } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { createObjectStore } from '../lib/createObjectStore'
  import type { ThrelteLayersContext } from '../types/types'

  export let object: Object3D

  const objectStore = createObjectStore(object)
  $: objectStore.set(object)

  const layers = getContext<ThrelteLayersContext>('threlte-layers')

  const { invalidate } = useThrelte()

  $: {
    if ($layers === 'all') {
      $objectStore.layers.enableAll()
    } else if ($layers === 'none') {
      $objectStore.layers.disableAll()
    } else if (Array.isArray($layers)) {
      for (let index = 0; index < 32; index += 1) {
        const layerIndex = index as typeof $layers[number]
        const enabled = $layers.includes(layerIndex)
        if (enabled) {
          $objectStore.layers.enable(index)
        } else {
          $objectStore.layers.disable(index)
        }
      }
    } else if ($layers !== undefined) {
      $objectStore.layers.set($layers)
    }
    invalidate('LayerableObject')
  }
</script>

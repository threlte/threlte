<script lang="ts">
  import { getContext } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import type { ThrelteLayersContext } from '../types/types'
  export let object: Object3D
  const layers = getContext<ThrelteLayersContext>('threlte-layers')

  const { render } = useThrelte()

  $: {
    if ($layers === 'all') {
      object.layers.enableAll()
    } else if ($layers === 'none') {
      object.layers.disableAll()
    } else if (Array.isArray($layers)) {
      for (let index = 0; index < 32; index += 1) {
        const layerIndex = index as typeof $layers[number]
        const enabled = $layers.includes(layerIndex)
        if (enabled) {
          object.layers.enable(index)
        } else {
          object.layers.disable(index)
        }
      }
    } else if ($layers !== undefined) {
      object.layers.set($layers)
    }
    render('LayerableObject')
  }
</script>

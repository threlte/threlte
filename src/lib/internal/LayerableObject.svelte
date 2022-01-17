<script lang="ts">
  import type { ThrelteLayerContext } from '../types/types'

  import { getContext } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  export let object: Object3D
  const layer = getContext<ThrelteLayerContext>('threlte-layer')

  const { render } = useThrelte()

  $: {
    if ($layer === 'all') {
      object.layers.enableAll()
    } else if ($layer === 'none') {
      object.layers.disableAll()
    } else {
      object.layers.set($layer ?? 0)
    }
    render('LayerableObject')
  }
</script>

<script lang="ts">
  import { useFrame } from '$lib/hooks/useFrame'

  import { useInstancedMesh, type Instance } from '$lib/objects/InstancedMesh.svelte'
  import type { Object3DInstanceProperties } from '$lib/types/components'
  import { onDestroy, onMount } from 'svelte'
  import { Object3D } from 'three'
  import TransformableObject from './TransformableObject.svelte'

  export let position: Object3DInstanceProperties['position'] = undefined
  export let scale: Object3DInstanceProperties['scale'] = undefined
  export let rotation: Object3DInstanceProperties['rotation'] = undefined
  export let lookAt: Object3DInstanceProperties['lookAt'] = undefined

  const object3d = new Object3D()
  const instance: Instance = {
    color: null,
    object3d
  }

  const { registerInstance, updateInstanceMatrix, removeInstance } = useInstancedMesh()

  $: if (position) updateInstanceMatrix(instance)
  $: if (rotation) updateInstanceMatrix(instance)
  $: if (scale) updateInstanceMatrix(instance)
  $: if (lookAt) updateInstanceMatrix(instance)

  registerInstance(instance)

  onMount(() => updateInstanceMatrix(instance))

  onDestroy(() => {
    removeInstance(instance)
  })
</script>

<TransformableObject {position} {scale} {rotation} {lookAt} object={object3d} />

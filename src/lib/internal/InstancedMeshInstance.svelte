<script lang="ts">
  import { useInstancedMesh, type Instance } from '$lib/objects/InstancedMesh.svelte'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Color, Object3D } from 'three'
  import type { InstancedMeshInstanceProperties } from '../types/components'
  import TransformableObject from './TransformableObject.svelte'
  import type { ThreltePointerEvent } from '../types/types'

  export let position: InstancedMeshInstanceProperties['position'] = undefined
  export let scale: InstancedMeshInstanceProperties['scale'] = undefined
  export let rotation: InstancedMeshInstanceProperties['rotation'] = undefined
  export let lookAt: InstancedMeshInstanceProperties['lookAt'] = undefined
  export let color: InstancedMeshInstanceProperties['color'] = undefined

  const object3d = new Object3D()

  const pointerEventDispatcher = createEventDispatcher<{
    click: ThreltePointerEvent
    contextmenu: ThreltePointerEvent
    pointerup: ThreltePointerEvent
    pointerdown: ThreltePointerEvent
    pointerenter: ThreltePointerEvent
    pointerleave: ThreltePointerEvent
    pointermove: ThreltePointerEvent
  }>()

  const parseColor = (color: InstancedMeshInstanceProperties['color']): Color | null => {
    return color !== undefined ? (color instanceof Color ? color : new Color(color)) : null
  }

  const instance: Instance = {
    color: parseColor(color),
    object3d,
    pointerEventDispatcher
  }

  const { registerInstance, setInstanceMatrix, removeInstance, setInstanceColor } =
    useInstancedMesh()

  const setTransforms = (
    _position: InstancedMeshInstanceProperties['position'],
    _scale: InstancedMeshInstanceProperties['scale'],
    _rotation: InstancedMeshInstanceProperties['rotation'],
    _lookAt: InstancedMeshInstanceProperties['lookAt']
  ) => {
    setInstanceMatrix(instance)
  }

  const setColor = (color: InstancedMeshInstanceProperties['color']) => {
    instance.color = parseColor(color)
    setInstanceColor(instance)
  }

  $: setTransforms(position, scale, rotation, lookAt)
  $: setColor(color)

  registerInstance(instance)

  onMount(() => {
    setTransforms(position, scale, rotation, lookAt)
    setColor(color)
  })

  onDestroy(() => {
    removeInstance(instance)
  })
</script>

<TransformableObject {position} {scale} {rotation} {lookAt} object={object3d} />

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Color, Object3D } from 'three'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import { useInstancedMesh } from '../objects/InstancedMesh.svelte'
  import type { InstanceProperties } from '../types/components'
  import type { ThrelteInstance, ThreltePointerEvent } from '../types/types'

  export let position: InstanceProperties['position'] = undefined
  export let scale: InstanceProperties['scale'] = undefined
  export let rotation: InstanceProperties['rotation'] = undefined
  export let lookAt: InstanceProperties['lookAt'] = undefined
  export let color: InstanceProperties['color'] = undefined

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

  const parseColor = (color: InstanceProperties['color']): Color | null => {
    return color !== undefined ? (color instanceof Color ? color : new Color(color)) : null
  }

  const instance: ThrelteInstance = {
    color: parseColor(color),
    object3d,
    pointerEventDispatcher
  }

  const { registerInstance, setInstanceMatrix, removeInstance, setInstanceColor } =
    useInstancedMesh()

  const setTransforms = (
    _position: InstanceProperties['position'],
    _scale: InstanceProperties['scale'],
    _rotation: InstanceProperties['rotation'],
    _lookAt: InstanceProperties['lookAt']
  ) => {
    setInstanceMatrix(instance)
  }

  const setColor = (color: InstanceProperties['color']) => {
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

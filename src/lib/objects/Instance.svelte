<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Color, Object3D } from 'three'
  import { useFrame } from '../hooks/useFrame'
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

  const { start: startLookingAt, stop: stopLookingAt } = useFrame(
    () => {
      setInstanceMatrix(instance)
    },
    {
      autostart: false,
      debugFrameloopMessage: 'Instance: tracking object'
    }
  )

  $: {
    if (position) setInstanceMatrix(instance)
    if (scale) setInstanceMatrix(instance)
    if (rotation) setInstanceMatrix(instance)

    if (lookAt && !rotation) {
      if (lookAt instanceof Object3D) {
        startLookingAt()
      } else {
        stopLookingAt()
        setInstanceMatrix(instance)
      }
    }
    if (!lookAt) {
      stopLookingAt()
    }
  }

  $: setColor(color)

  const setColor = (color: InstanceProperties['color']) => {
    instance.color = parseColor(color)
    setInstanceColor(instance)
  }

  registerInstance(instance)

  onMount(() => {
    setInstanceMatrix(instance)
    setColor(color)
  })

  onDestroy(() => {
    removeInstance(instance)
  })
</script>

<TransformableObject {position} {scale} {rotation} {lookAt} object={object3d} />

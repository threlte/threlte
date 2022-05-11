<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { tick } from 'svelte/internal'
  import { Object3D, Vector3 } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import { useTicked } from '../lib/useTicked'
  import type { TransformableObjectProperties } from '../types/components'

  export let object: TransformableObjectProperties['object']
  export let position: TransformableObjectProperties['position'] = undefined
  export let scale: TransformableObjectProperties['scale'] = undefined
  export let rotation: TransformableObjectProperties['rotation'] = undefined
  export let lookAt: TransformableObjectProperties['lookAt'] = undefined

  const targetWorldPos = new Vector3()

  const dispatch = createEventDispatcher<{
    transform: void
  }>()

  const { invalidate } = useThrelte()

  const ticked = useTicked()

  const dispatchTransform = async () => {
    if (!$ticked) await tick()
    dispatch('transform')
  }

  const { start: startLookingAt, stop: stopLookingAt } = useFrame(
    () => {
      if (lookAt && !rotation && lookAt instanceof Object3D) {
        lookAt.getWorldPosition(targetWorldPos)
        object.lookAt(targetWorldPos)
        dispatchTransform()
      }
    },
    {
      autostart: false,
      debugFrameloopMessage: 'TransformableObject: tracking object'
    }
  )

  $: {
    if (position) {
      object.position.set(position.x ?? 0, position.y ?? 0, position.z ?? 0)
      invalidate('TransformableObject: position')
      dispatchTransform()
    }
    if (lookAt && !rotation) {
      if (lookAt instanceof Object3D) {
        startLookingAt()
      } else {
        stopLookingAt()
        object.lookAt(lookAt.x ?? 0, lookAt.y ?? 0, lookAt.z ?? 0)
        invalidate('TransformableObject: lookAt')
        dispatchTransform()
      }
    }
    if (!lookAt) {
      stopLookingAt()
    }
  }
  $: {
    if (scale) {
      if (typeof scale === 'number') {
        object.scale.set(scale, scale, scale)
      } else {
        object.scale.set(scale.x ?? 1, scale.y ?? 1, scale.z ?? 1)
      }
      invalidate('TransformableObject: scale')
      dispatchTransform()
    }
  }
  $: {
    if (rotation) {
      object.rotation.set(
        rotation.x ?? 0,
        rotation.y ?? 0,
        rotation.z ?? 0,
        rotation.order ?? 'XYZ'
      )
      invalidate('TransformableObject: rotation')
      dispatchTransform()
    }
  }
</script>

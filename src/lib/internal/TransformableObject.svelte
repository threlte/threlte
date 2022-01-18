<script context="module" lang="ts">
  export type TransformableObjectProps = {
    object: Object3D
    position: Position | undefined
    scale: Scale | undefined
    rotation: Rotation | undefined
    lookAt: LookAt | undefined
  }
</script>

<script lang="ts">
  import { Object3D, Vector3 } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import { defaults } from '../lib/defaults'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'

  export let object: TransformableObjectProps['object']
  export let position: TransformableObjectProps['position']
  export let scale: TransformableObjectProps['scale']
  export let rotation: TransformableObjectProps['rotation']
  export let lookAt: TransformableObjectProps['lookAt']

  const targetWorldPos = new Vector3()

  const { render } = useThrelte()

  const { start: startLookingAt, stop: stopLookingAt } = useFrame(
    () => {
      if (lookAt && !rotation && lookAt instanceof Object3D) {
        lookAt.getWorldPosition(targetWorldPos)
        object.lookAt(targetWorldPos)
      }
    },
    {
      autostart: false
    }
  )

  $: {
    if (position) {
      object.position.set(
        position.x ?? defaults.position.x,
        position.y ?? defaults.position.y,
        position.z ?? defaults.position.z
      )
      render('TransformableObject: position')
    }
    if (lookAt && !rotation) {
      if (lookAt instanceof Object3D) {
        startLookingAt()
      } else {
        stopLookingAt()
        object.lookAt(
          lookAt.x ?? defaults.position.x,
          lookAt.y ?? defaults.position.y,
          lookAt.z ?? defaults.position.z
        )
        render('TransformableObject: lookAt')
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
        object.scale.set(
          scale.x ?? defaults.scale.x,
          scale.y ?? defaults.scale.y,
          scale.z ?? defaults.scale.z
        )
      }
      render('TransformableObject: scale')
    }
  }
  $: {
    if (rotation) {
      object.rotation.set(
        rotation.x ?? defaults.rotation.x,
        rotation.y ?? defaults.rotation.y,
        rotation.z ?? defaults.rotation.z,
        rotation.order ?? defaults.rotation.order
      )
      render('TransformableObject: rotation')
    }
  }
</script>

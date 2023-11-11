<script lang='ts'>
  import { Group, Color } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { pointerState } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  let ref = new Group()

  $: pointer = $pointerState[handedness].pointer
  $: hovering = $pointerState[handedness].hovering

  const { start, stop } = useFrame(() => {
    ref.position.lerp(pointer, 0.3)
  }, {
    autostart: false
  })

  $: if (hovering) {
    ref.position.copy(pointer)
    start()
  } else {
    stop()
  }

  useFrame((ctx) => {
    // save previous rotation in case we're locking an axis
    const prevRotation = ref.rotation.clone()

    // always face the camera
    ctx.camera.current.getWorldQuaternion(ref.quaternion)

    // readjust any axis that is locked
    ref.rotation.x = prevRotation.x
    ref.rotation.y = prevRotation.y
    ref.rotation.z = prevRotation.z
  })

</script>

<T
  is={ref}
  visible={hovering}
>
  <slot name='pointer-cursor'>
    <Cursor />
  </slot>
</T>

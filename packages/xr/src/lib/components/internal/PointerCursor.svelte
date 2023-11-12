<script lang='ts'>
  import { Group } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { pointerIntersection, pointerState } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  let ref = new Group()

  $: hovering = $pointerState[handedness].hovering
  $: intersection = pointerIntersection[handedness]

  const { start, stop } = useFrame(() => {
    if (intersection.current === undefined) return
    const { point, face } = intersection.current
    ref.position.lerp(point, 0.3)
    if (face) ref.lookAt(face.normal)
  }, {
    autostart: false
  })

  $: if (hovering) {
    ref.position.copy(intersection.current!.point)
    start()
  } else {
    stop()
  }
</script>

<T
  is={ref}
  visible={hovering}
>
  <slot name='pointer-cursor'>
    <Cursor />
  </slot>
</T>

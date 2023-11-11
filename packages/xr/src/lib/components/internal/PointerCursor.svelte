<script lang='ts'>
  import { Group } from 'three'
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

</script>

<T
  is={ref}
  visible={hovering}
>
  <slot name='pointer-cursor'>
    <Cursor />
  </slot>
</T>
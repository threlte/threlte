<script lang='ts'>
  import { Group } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { handContext } from '../../plugins/pointerControls'

  export let handedness: 'left' | 'right'

  let ref = new Group()

  $: pointer = handContext[handedness].pointer
  $: hovered = handContext[handedness].hovered

  useFrame(() => {
    if (hovered.size === 0) {
      ref.visible = false
      return
    }
  
    ref.visible = true
    ref.position.lerp(pointer.current, 0.3)
  })
</script>

<T is={ref}>
  <slot name='pointer-cursor'>
    <T.Mesh>
      <T.SphereGeometry args={[0.01]} />
      <T.MeshBasicMaterial />
    </T.Mesh>
  </slot>
</T>

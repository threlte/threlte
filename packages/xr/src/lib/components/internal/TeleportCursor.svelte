<script lang='ts'>
  import { Group } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { handContext } from '../../plugins/teleportControls'

  export let handedness: 'left' | 'right'

  const ref = new Group()

  $: hovered = handContext[handedness].hovered
  $: intersectPoint = $hovered?.point

  const { start, stop } = useFrame(() => {
    ref.position.lerp(intersectPoint!, 0.4)
  }, {
    autostart: false,
  })

  $: if (intersectPoint === undefined) {
    stop()
  } else {
    ref.position.copy(intersectPoint)
    start()
  }
</script>

<T
  is={ref}
  visible={intersectPoint !== undefined}
>
  <slot name='teleport-cursor'>
    <T.Mesh>
      <T.RingGeometry
        args={[0.175, 0.2, 32]}
        on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
      />
      <T.MeshBasicMaterial
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </T.Mesh>
  </slot>
</T>

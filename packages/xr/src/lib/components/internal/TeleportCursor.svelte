<script lang='ts'>
  import { Group } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { teleportState } from '../../internal/stores'

  export let handedness: 'left' | 'right'

  const ref = new Group()

  $: intersection = $teleportState.intersection[handedness]
  $: point = intersection?.point

  const { start, stop } = useFrame(() => {
    ref.position.lerp(point!, 0.4)
  }, {
    autostart: false,
  })

  $: if (point === undefined) {
    stop()
  } else {
    ref.position.copy(point)
    start()
  }
</script>

<T
  is={ref}
  visible={point !== undefined}
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

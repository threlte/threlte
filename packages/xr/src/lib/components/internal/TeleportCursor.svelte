<script lang='ts'>
  import { T, useFrame } from '@threlte/core'
  import { handContext } from '../../plugins/teleportControls'
  import { Group } from 'three'

  export let handedness: 'left' | 'right'

  let ref = new Group()

  $: teleportSurface = handContext[handedness].hovered
  $: point = $teleportSurface?.point

  const { start, stop } = useFrame(() => {
    ref.position.lerp(point!, 0.3)
  }, {
    autostart: false,
  })

  $: if (point === undefined) {
    stop()
  } else {
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

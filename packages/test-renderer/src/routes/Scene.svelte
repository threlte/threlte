<script lang="ts">
  import type { Mesh } from 'three'

  import { T, useTask } from '@threlte/core'

  interface Props {
    x?: number
    onclick?: () => void
  }

  let { x = 0, onclick }: Props = $props()

  let ref = $state.raw<Mesh>()

  useTask((dt) => {
    if (!ref) return
    ref.rotation.x += dt
    ref.rotation.y += dt
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[1, 1, 1]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.DirectionalLight />
<T.AmbientLight />

<T.Mesh name="box-1" bind:ref scale={0.5} position.x={x} {onclick}>
  <T.MeshStandardMaterial />
  <T.BoxGeometry />
</T.Mesh>

<script>
  import { T, useTask } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { Spring } from 'svelte/motion'

  interactivity()

  const scale = new Spring(1)

  let rotation = $state(0)
  useTask((delta) => {
    rotation += delta
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={scale.current}
  onpointerenter={() => {
    scale.target = 1.5
  }}
  onpointerleave={() => {
    scale.target = 1
  }}
>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

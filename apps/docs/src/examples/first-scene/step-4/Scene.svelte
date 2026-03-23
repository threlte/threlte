<script>
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { Spring } from 'svelte/motion'

  interactivity()
  const scale = new Spring(1)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.Mesh
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
  <T.MeshBasicMaterial color="hotpink" />
</T.Mesh>

<script>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Scenery from './Random.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 20, 20]}
>
  <OrbitControls maxPolarAngle={1.56} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[20, 20, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

<Scenery />

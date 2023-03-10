<script lang="ts">
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import { T } from '@threlte/core'
  import { TransformControls, OrbitControls } from '@threlte/extras'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  lookAt.y={0.5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.GridHelper args={[10, 10]} />

<T.Mesh
  position.y={1}
  geometry={new BoxGeometry(2, 2, 2)}
  material={new MeshStandardMaterial()}
>
  <TransformControls
    translationSnap={1}
    showY={false}
  />
</T.Mesh>

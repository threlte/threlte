<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, TransformControls } from '@threlte/extras'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
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
<T.AmbientLight
intensity={0.3}
/>

<T.GridHelper args={[10, 10]} />

<TransformControls
  translationSnap={1}
  position.y={1}
>
  <T.Mesh
    geometry={new BoxGeometry(2, 2, 2)}
    material={new MeshStandardMaterial()}
  />
</TransformControls>

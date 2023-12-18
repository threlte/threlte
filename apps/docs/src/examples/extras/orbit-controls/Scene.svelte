<script lang="ts">
  import { T } from '@threlte/core'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
</script>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>
<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[10, 10]} />

<T.Mesh
  position.y={1}
  geometry={new BoxGeometry(2, 2, 2)}
  material={new MeshStandardMaterial()}
/>

<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { RoundedBoxGeometry } from '@threlte/extras'
  import { XR } from '@threlte/xr'

  let rotation = $state(0)

  useTask((delta) => {
    rotation += delta
  })
</script>

<XR />

<T.AmbientLight />
<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.PerspectiveCamera
  makeDefault
  position.y={1.8}
  position.z={1}
/>

<T.Mesh
  position.y={1.8}
  rotation.x={rotation}
  rotation.y={rotation}
>
  <RoundedBoxGeometry args={[0.2, 0.2, 0.2]} />
  <T.MeshStandardMaterial color="orange" />
</T.Mesh>

<T.Mesh>
  <T.CylinderGeometry args={[3, 0.01]} />
  <T.MeshStandardMaterial color="turquoise" />
</T.Mesh>

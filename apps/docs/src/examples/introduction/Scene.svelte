<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { GLTF } from '@threlte/extras'
  import { MathUtils } from 'three'

  let rotation = 0

  useTask((delta) => {
    const f = 1 / 60 / delta // ~1 at 60fps
    rotation += 0.002 * f
  })
</script>

<T.Group rotation.y={rotation}>
  <T.OrthographicCamera
    zoom={80}
    position={[0, 5, 10]}
    makeDefault
    oncreate={({ ref }) => {
      ref.lookAt(0, 2, 0)
    }}
  />
</T.Group>

<GLTF
  castShadow
  receiveShadow
  url={'/models/threlte.glb'}
  interactive
/>

<T.Mesh
  receiveShadow
  rotation.x={MathUtils.DEG2RAD * -90}
>
  <T.CircleGeometry args={[4, 60]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.DirectionalLight
  position={[3, 10, 10]}
  castShadow
/>
<T.DirectionalLight
  position={[-3, 10, -10]}
  intensity={0.2}
/>
<T.AmbientLight intensity={0.5} />

<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { HUD } from '@threlte/extras'
  import { Mesh, Quaternion } from 'three'

  const { camera, size, viewport } = useThrelte()

  const quaternion = new Quaternion()

  let mesh = new Mesh()

  useTask(() => {
    // Spin mesh to the inverse of the default cameras matrix
    quaternion.copy(camera.current.quaternion).invert()
    mesh.quaternion.copy(quaternion)
  })
</script>

<HUD>
  <T.OrthographicCamera
    makeDefault
    zoom={100}
    position={[0, 0, 10]}
  />
  <T.AmbientLight intensity={Math.PI / 2} />
  <T.SpotLight
    position={[10, 10, 10]}
    angle={0.15}
    penumbra={1}
    decay={0}
    intensity={Math.PI}
  />
  <T.PointLight
    position={[-10, -10, -10]}
    decay={0}
    intensity={Math.PI}
  />
  <T
    is={mesh}
    position={[$viewport.width / 2 - 1.5, $viewport.height / 2 - 1.5, 0]}
  >
    <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
    <T.MeshStandardMaterial />
  </T>
</HUD>

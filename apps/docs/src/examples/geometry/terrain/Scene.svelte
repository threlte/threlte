<script lang="ts">
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { OrbitControls } from '@threlte/extras'
  import { PlaneGeometry } from 'three'
  import { SimplexNoise } from 'three/examples/jsm/Addons.js'
  import { T } from '@threlte/core'

  let { autoRotate = false }: { autoRotate?: boolean } = $props()

  const geometry = new PlaneGeometry(10, 10, 100, 100)

  const vertices = geometry.getAttribute('position')

  const flatness = 4

  const noise = new SimplexNoise()

  $effect(() => {
    for (let i = 0; i < vertices.count; i += 1) {
      const x = vertices.getX(i)
      const y = vertices.getY(i)
      vertices.setZ(i, noise.noise(x / flatness, y / flatness))
    }
    // needed for lighting
    geometry.computeVertexNormals()
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.y={5}
  position.z={10}
  lookAt.y={2}
>
  <OrbitControls
    {autoRotate}
    maxPolarAngle={DEG2RAD * 80}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<T.Mesh
  {geometry}
  rotation.x={DEG2RAD * -90}
>
  <T.MeshStandardMaterial />
</T.Mesh>

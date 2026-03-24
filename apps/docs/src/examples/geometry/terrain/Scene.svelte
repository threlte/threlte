<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { DoubleSide, PlaneGeometry } from 'three'
  import { SimplexNoise } from 'three/examples/jsm/Addons.js'
  import { T } from '@threlte/core'

  let { autoRotate = false, flatness = 4 }: { autoRotate?: boolean; flatness?: number } = $props()

  const geometry = new PlaneGeometry(10, 10, 100, 100)
  const positions = geometry.getAttribute('position')

  const noise = new SimplexNoise()

  $effect(() => {
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i) / flatness
      const y = positions.getY(i) / flatness
      positions.setZ(i, noise.noise(x, y))
    }

    positions.needsUpdate = true

    // needed for lighting
    geometry.computeVertexNormals()
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={10}
>
  <OrbitControls
    {autoRotate}
    autoRotateSpeed={0.5}
  />
</T.PerspectiveCamera>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.Mesh
  {geometry}
  rotation.x={-1 * 0.5 * Math.PI}
>
  <T.MeshStandardMaterial side={DoubleSide} />
</T.Mesh>

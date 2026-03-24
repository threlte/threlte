<script lang="ts">
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { Grid, OrbitControls } from '@threlte/extras'
  import { SphereGeometry } from 'three'
  import { T, useThrelte } from '@threlte/core'

  let {
    exposure = 1
  }: {
    exposure?: number
  } = $props()

  const { renderer, invalidate } = useThrelte()

  $effect(() => {
    renderer.toneMappingExposure = exposure
    invalidate()
  })

  const sphereGeo = new SphereGeometry(2.5, 32, 32)
</script>

<T.PerspectiveCamera
  position={[0, 7, 18]}
  fov={60}
  near={1}
  far={20000}
  makeDefault
>
  <OrbitControls
    maxPolarAngle={85 * DEG2RAD}
    enableDamping
    target={[0, 2.5, 0]}
  />
</T.PerspectiveCamera>

<T.Mesh
  castShadow
  position.x={3}
  position.y={2.5}
>
  <T is={sphereGeo} />
  <T.MeshStandardMaterial
    roughness={0.1}
    metalness={1}
  />
</T.Mesh>

<T.Mesh
  castShadow
  position.x={-3}
  position.y={2.5}
>
  <T is={sphereGeo} />
  <T.MeshStandardMaterial />
</T.Mesh>

<Grid
  cellColor="white"
  sectionColor="white"
/>

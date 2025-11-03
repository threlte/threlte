<script
  lang="ts"
  module
>
  const cameraAxis = new Vector3(0.75, 0.5, 1).normalize()

  const geometries = [
    BoxGeometry,
    CapsuleGeometry,
    CircleGeometry,
    ConeGeometry,
    CylinderGeometry,
    DodecahedronGeometry,
    ExtrudeGeometry,
    IcosahedronGeometry,
    LatheGeometry,
    OctahedronGeometry,
    RingGeometry,
    ShapeGeometry,
    SphereGeometry,
    TetrahedronGeometry,
    TorusGeometry,
    TorusKnotGeometry
  ].map((constructor) => new constructor())

  const width = 4
  const gap = 4
  const cameraTranslationAmount = 5 * width

  const gridColor = '#ffffff'
</script>

<script lang="ts">
  import { Align, Grid, OrbitControls, UvMaterial } from '@threlte/extras'
  import { T } from '@threlte/core'
  import {
    BoxGeometry,
    CapsuleGeometry,
    CircleGeometry,
    ConeGeometry,
    CylinderGeometry,
    DodecahedronGeometry,
    ExtrudeGeometry,
    IcosahedronGeometry,
    LatheGeometry,
    OctahedronGeometry,
    PerspectiveCamera,
    RingGeometry,
    ShapeGeometry,
    SphereGeometry,
    TetrahedronGeometry,
    TorusGeometry,
    TorusKnotGeometry,
    Vector3
  } from 'three'

  const camera = new PerspectiveCamera()
  camera.translateOnAxis(cameraAxis, cameraTranslationAmount)
</script>

<T
  is={camera}
  makeDefault
>
  <OrbitControls />
</T>

<Align
  position.y={2}
  oncreate={(ref) => {
    camera.lookAt(ref.position)
  }}
>
  {#each geometries as geometry, i}
    <T.Mesh
      position.x={gap * (i % width)}
      position.z={gap * Math.floor(i / width)}
    >
      <T is={geometry} />
      <UvMaterial />
    </T.Mesh>
  {/each}
</Align>

<Grid
  infiniteGrid
  cellColor={gridColor}
  sectionColor={gridColor}
/>

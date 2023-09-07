<script>
  import { T } from '@threlte/core'
  import {
    MeshLineMaterial,
    MeshLineGeometry,
    Grid,
    OrbitControls,
    useTexture
  } from '@threlte/extras'
  import { constrainColorComponents } from '@tweakpane/core/dist/cjs/input-binding/color/model/color-model'
  import { Vector3, CatmullRomCurve3 } from 'three'

  // create a smooth curve from 4 points
  const curve = new CatmullRomCurve3([
    new Vector3(-3, 0, 0),
    new Vector3(-1, 1, -1),
    new Vector3(1, -1, 1),
    new Vector3(3, 0, 0)
  ])

  // convert curve to an array of 100 points
  const points = curve.getPoints(100)
</script>

<T.Mesh
  position.y={3}
  scale={2}
>
  <MeshLineGeometry
    {points}
    shape="taper"
  />

  <MeshLineMaterial color="#fe3d00" />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  on:create={({ ref }) => {
    ref.position.set(10, 3, 10)
  }}
>
  <OrbitControls
    autoRotate={true}
    autoRotateSpeed={2}
    enableDamping
    target.y={2}
  />
</T.PerspectiveCamera>

<Grid
  gridSize={[10, 10]}
  cellColor={'#46536b'}
  sectionThickness={0}
/>

<script>
  import { T } from '@threlte/core'
  import {
    Grid,
    MeshLineGeometry,
    MeshLineMaterial,
    OrbitControls,
    useTexture
  } from '@threlte/extras'
  import { CubicBezierCurve3, DoubleSide, Vector3 } from 'three'

  const texture = useTexture('/brush-texture.png')

  // create a smooth bezier curve
  const curve = new CubicBezierCurve3(
    new Vector3(-5, 0, 0),
    new Vector3(-5, 7, 0),
    new Vector3(5, 7, 0),
    new Vector3(5, 0, 0)
  )

  // convert curve to an array of 100 points
  const points = curve.getPoints(100)
</script>

<T.Mesh rotation.z={-0.1}>
  <MeshLineGeometry {points} />
  {#await texture then alphaMap}
    <MeshLineMaterial
      width={1}
      color={'#fe3d00'}
      transparent
      depthTest={false}
      {alphaMap}
    />
  {/await}
</T.Mesh>

{#await texture then map}
  <T.Mesh
    position.y={2}
    scale={2}
  >
    <T.PlaneGeometry />
    <T.MeshBasicMaterial
      {map}
      side={DoubleSide}
    />
  </T.Mesh>
{/await}

<T.PerspectiveCamera
  makeDefault
  oncreate={({ ref }) => {
    ref.position.set(0, 3, 10)
  }}
>
  <OrbitControls
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

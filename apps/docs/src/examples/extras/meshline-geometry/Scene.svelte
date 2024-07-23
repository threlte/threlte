<script>
  import { T } from '@threlte/core'
  import { Grid, MeshLineGeometry, MeshLineMaterial, OrbitControls } from '@threlte/extras'
  import { CatmullRomCurve3, Vector3 } from 'three'

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
  oncreate={({ ref }) => {
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

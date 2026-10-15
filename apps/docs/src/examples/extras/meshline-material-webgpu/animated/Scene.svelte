<script lang="ts">
  import { T, useTask } from '@threlte/core/webgpu'
  import { Grid, MeshLineGeometry, MeshLineMaterial, OrbitControls } from '@threlte/extras/webgpu'
  import { CatmullRomCurve3, Color, Vector3 } from 'three/webgpu'

  let {
    width = 0.5,
    opacity = 1,
    dashArray = 0.5,
    dashRatio = 0.5,
    attenuate = true,
    scaleDown = 0
  } = $props()

  const curve = new CatmullRomCurve3([
    new Vector3(-3, 0, 0),
    new Vector3(-1, 1, -1),
    new Vector3(1, -1, 1),
    new Vector3(3, 0, 0)
  ])

  const points = curve.getPoints(100)

  let dashOffset = $state(0)
  let color = $state('#fe3d00')
  const orange = new Color('#fe3d00')
  const purple = new Color('#9800fe')
  const lerped = new Color()

  useTask((delta) => {
    dashOffset += delta / 2
    color = `#${lerped.lerpColors(orange, purple, Math.sin(dashOffset * 2) / 2 + 0.5).getHexString()}`
    width = Math.sin(dashOffset * 2) / 5 + 0.3
  })
</script>

<T.Mesh
  position.y={3}
  scale={2}
>
  <MeshLineGeometry {points} />

  <MeshLineMaterial
    {width}
    {color}
    {opacity}
    {dashArray}
    {dashRatio}
    {dashOffset}
    {attenuate}
    {scaleDown}
    transparent
    depthTest={false}
  />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  oncreate={(ref) => {
    ref.position.set(10, 3, 10)
  }}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={2}
    enableDamping
    enableZoom={false}
    target.y={2}
  />
</T.PerspectiveCamera>

<Grid
  gridSize={[10, 10]}
  cellColor="#46536b"
  sectionThickness={0}
/>

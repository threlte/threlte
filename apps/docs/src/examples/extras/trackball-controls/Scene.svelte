<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, TrackballControls } from '@threlte/extras'

  interface Props {
    staticMoving: boolean
    noRotate: boolean
    rotateSpeed: number
    noZoom: boolean
    zoomSpeed: number
    noPan: boolean
    panSpeed: number
  }

  let { staticMoving, noRotate, rotateSpeed, noZoom, zoomSpeed, noPan, panSpeed }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  lookAt.y={0.5}
>
  <TrackballControls
    {staticMoving}
    {noRotate}
    {rotateSpeed}
    {noZoom}
    {zoomSpeed}
    {noPan}
    {panSpeed}
  >
    <Gizmo />
  </TrackballControls>
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>
<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[10, 10]} />

<T.Mesh position.y={1}>
  <T.BoxGeometry args={[2, 2, 2]} />
  <T.MeshStandardMaterial />
</T.Mesh>

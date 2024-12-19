<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, TrackballControls } from '@threlte/extras'

  import { BoxGeometry, MeshStandardMaterial } from 'three'

  export let staticMoving: boolean
  export let noRotate: boolean
  export let rotateSpeed: number
  export let noZoom: boolean
  export let zoomSpeed: number
  export let noPan: boolean
  export let panSpeed: number
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

<T.Mesh
  position.y={1}
  geometry={new BoxGeometry(2, 2, 2)}
  material={new MeshStandardMaterial()}
/>

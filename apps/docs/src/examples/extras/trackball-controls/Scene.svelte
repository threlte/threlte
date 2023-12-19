<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo } from '@threlte/extras'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import { TrackballControls } from '@threlte/extras'
  import Settings from './Settings.svelte'

  let staticMoving: boolean = false
  let noRotate: boolean = false
  let rotateSpeed: number = 1
  let noZoom: boolean = false
  let zoomSpeed: number = 1.2
  let noPan: boolean = false
  let panSpeed: number = 0.3
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
  />
</T.PerspectiveCamera>

<Gizmo
  horizontalPlacement="left"
  paddingX={20}
  paddingY={20}
/>

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

<Settings
  bind:staticMoving
  bind:noRotate
  bind:rotateSpeed
  bind:noZoom
  bind:zoomSpeed
  bind:noPan
  bind:panSpeed
/>

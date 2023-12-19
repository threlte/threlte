<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo } from '@threlte/extras'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import { OrbitControls } from '@threlte/extras'
  import Settings from './Settings.svelte'

  let autoRotate: boolean = false
  let enableDamping: boolean = true
  let rotateSpeed: number = 1
  let zoomToCursor: boolean = false
  let zoomSpeed: number = 1
  let minPolarAngle: number = 0
  let maxPolarAngle: number = Math.PI
  let enableZoom: boolean = true
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  lookAt.y={0.5}
>
  <OrbitControls
    {enableDamping}
    {autoRotate}
    {rotateSpeed}
    {zoomToCursor}
    {zoomSpeed}
    {minPolarAngle}
    {maxPolarAngle}
    {enableZoom}
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
  bind:enableDamping
  bind:autoRotate
  bind:rotateSpeed
  bind:zoomToCursor
  bind:zoomSpeed
  bind:minPolarAngle
  bind:maxPolarAngle
  bind:enableZoom
/>

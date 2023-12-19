<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'

  import { BoxGeometry, MeshStandardMaterial } from 'three'

  export let autoRotate: boolean
  export let enableDamping: boolean
  export let rotateSpeed: number
  export let zoomToCursor: boolean
  export let zoomSpeed: number
  export let minPolarAngle: number
  export let maxPolarAngle: number
  export let enableZoom: boolean
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

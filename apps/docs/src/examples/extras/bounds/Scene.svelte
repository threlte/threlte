<script lang="ts">
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import { T } from '@threlte/core'
  import { Bounds, OrbitControls } from '@threlte/extras'

  interface Props {
    margin: number
    fit: boolean
    clip: boolean
  }

  let { margin, fit, clip }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={20}
  position.y={20}
  position.z={-20}
  fov={50}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    enablePan={false}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<Bounds
  {margin}
  {fit}
  {clip}
>
  <T.Mesh
    position.x={1}
    position.y={1}
    position.z={1}
    geometry={new BoxGeometry(1, 1, 1)}
    material={new MeshStandardMaterial()}
  />
</Bounds>

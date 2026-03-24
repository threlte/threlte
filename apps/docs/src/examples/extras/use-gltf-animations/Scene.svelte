<script lang="ts">
  import { Environment, OrbitControls, useDraco, useGltf, useGltfAnimations } from '@threlte/extras'
  import { T } from '@threlte/core'

  const dracoLoader = useDraco()
  const gltf = useGltf('/models/LittlestTokyo.glb', { dracoLoader })

  export const { actions, mixer } = useGltfAnimations<'Take 001'>(gltf)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[600, 200, -600]}
  near={10}
  far={10_000}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={0.2}
    enableDamping
    enableZoom={false}
    target={[-60, -75, 0]}
  />
</T.PerspectiveCamera>

<Environment
  url="/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr"
  isBackground
/>

{#await gltf then { scene }}
  <T is={scene} />
{/await}

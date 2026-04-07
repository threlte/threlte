<script lang="ts">
  import { Environment, OrbitControls, useDraco, useGltf, useGltfAnimations } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'

  const dracoLoader = useDraco()
  const gltf = await useGltf('/models/LittlestTokyo.glb', { dracoLoader })

  const { scene } = useThrelte()

  export const { gltf: animatedGltf, actions, mixer } = useGltfAnimations<'Take 001'>()
  animatedGltf.current = gltf

  let debug = false
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

<T.DirectionalLight
  intensity={2}
  position={[-600, 600, -600]}
  target.position={[0, 0, 0]}
  shadow.camera.left={-1000}
  shadow.camera.right={1000}
  shadow.camera.top={-1000}
  shadow.camera.bottom={1000}
  shadow.camera.near={100}
  shadow.camera.far={5000}
  shadow.mapSize.width={2 ** 11}
  shadow.mapSize.height={2 ** 11}
  shadow.bias={-0.001}
  castShadow
>
  {#snippet children({ ref })}
    {#if debug}
      <T.DirectionalLightHelper
        args={[ref]}
        attach={scene}
      />
      <T.CameraHelper args={[ref.shadow.camera]} />
    {/if}
  {/snippet}
</T.DirectionalLight>

<T
  is={gltf.scene}
  oncreate={(ref) => {
    ref.traverse((child) => {
      child.castShadow = true
      child.receiveShadow = true
    })
  }}
/>

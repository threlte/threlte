<script lang='ts'>
  import * as THREE from 'three'
  import { PointLight } from 'three'
  import { T, useThrelte, useFrame } from '@threlte/core'
  import { OrbitControls, Sky, useGltf } from '@threlte/extras'
  import { XR, Controller, Hand } from '@threlte/xr'
  import Surfaces from './Surfaces.svelte'
  import { createNoise2D } from 'simplex-noise'

  const { renderer } = useThrelte()
  const noise = createNoise2D()

  renderer.setClearColor(0x000000)

  const light1 = new PointLight()
  const light2 = new PointLight()

  const gltf = useGltf('/models/xr/ruins.glb', {
    useDraco: true
  })

  $: $gltf?.scene.traverse((node) => {
    node.castShadow = node.receiveShadow = true
  })

  let time = 0

  $: torchX = $gltf?.nodes.Torch1.position.x ?? 0
  $: torchZ = $gltf?.nodes.Torch1.position.z ?? 0
  $: candlesX = $gltf?.nodes.Candles1.position.x ?? 0
  $: candlesZ = $gltf?.nodes.Candles1.position.z ?? 0

  useFrame((_, delta) => {
    time += (delta / 5)
    const x = noise(time, 0) / 10
    const y = noise(0, time) / 10
  
    light1.position.x = torchX + x
    light1.position.z = torchZ + y

    light2.position.x = candlesX + x
    light2.position.z = candlesZ + y
  })
</script>

<XR>
  <Controller left />
  <Controller right />
  <Hand left />
  <Hand right />

  <T.PerspectiveCamera
    slot='fallback'
    makeDefault
    position.y={1.8}
    position.z={1.5}
  >
    <OrbitControls
      target={[0, 1.8, 0]}
    />
  </T.PerspectiveCamera>
</XR>

{#if $gltf}
  <T is={$gltf.scene} />
  <T
    is={light1}
    castShadow
    intensity={10}
    color='red'
    shadow.radius={5}
    shadow.bias={-0.00001}
    shadow.normalBias={0.00001}
    shadow.mapSize.width={256}
    shadow.mapSize.height={256}
    position.y={$gltf.nodes.Torch1.position.y + 0.45}
  />

  <T
    is={light2}
    castShadow
    intensity={5}
    color='red'
    shadow.radius={5}
    shadow.bias={-0.00001}
    shadow.normalBias={0.00001}
    shadow.mapSize.width={256}
    shadow.mapSize.height={256}
    position.y={$gltf.nodes.Candles1.position.y + 0.45}
  />
{/if}

<Sky
  elevation={-3}
  rayleigh={8}
  azimuth={-90}
/>

<Surfaces />

<T.AmbientLight intensity={0.5} />

<!-- 
<T.DirectionalLight
  position={[5, 5, 1]}
  castShadow
  shadow.camera.top={50}
  shadow.camera.right={50}
  shadow.camera.left={-50}
  shadow.camera.bottom={-50}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/> -->

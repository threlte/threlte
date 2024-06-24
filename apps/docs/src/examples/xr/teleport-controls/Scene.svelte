<script lang="ts">
  import { PointLight } from 'three'
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, Sky, useGltf } from '@threlte/extras'
  import { XR, Controller, Hand } from '@threlte/xr'
  import Surfaces from './Surfaces.svelte'
  import { createNoise2D } from 'simplex-noise'

  export let showSurfaces: boolean
  export let showBlockers: boolean

  const noise = createNoise2D()

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

  useTask((delta) => {
    time += delta / 5
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

  {#snippet fallback()}
    <T.PerspectiveCamera
      makeDefault
      position.y={1.8}
      position.z={1.5}
      oncreate={({ ref }) => ref.lookAt(0, 1.8, 0)}
    >
      <OrbitControls
        target={[0, 1.8, 0]}
        enablePan={false}
        enableZoom={false}
      />
    </T.PerspectiveCamera>
  {/snippet}
</XR>

{#if $gltf}
  <T is={$gltf.scene} />
  <T
    is={light1}
    intensity={8}
    color="red"
    position.y={$gltf.nodes.Torch1.position.y + 0.45}
  />

  <T
    is={light2}
    intensity={4}
    color="red"
    position.y={$gltf.nodes.Candles1.position.y + 0.45}
  />
{/if}

<Sky
  elevation={-3}
  rayleigh={8}
  azimuth={-90}
/>

<Surfaces
  {showSurfaces}
  {showBlockers}
/>

<T.AmbientLight intensity={0.25} />

<T.DirectionalLight
  intensity={0.5}
  position={[5, 5, 1]}
  castShadow
  shadow.camera.top={50}
  shadow.camera.right={50}
  shadow.camera.left={-50}
  shadow.camera.bottom={-50}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.far={10}
/>

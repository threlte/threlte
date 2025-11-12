<script lang="ts">
  import Surfaces from './Surfaces.svelte'
  import { OrbitControls, Sky, useDraco, useGltf } from '@threlte/extras'
  import { PointLight } from 'three'
  import { SimplexNoise } from 'three/examples/jsm/Addons.js'
  import { T, useTask } from '@threlte/core'
  import { XR, Controller, Hand } from '@threlte/xr'

  type Props = {
    showBlockers: boolean
    showSurfaces: boolean
  }

  let { showBlockers, showSurfaces }: Props = $props()

  const noise = new SimplexNoise()

  const light1 = new PointLight()
  const light2 = new PointLight()

  let torchX = $state(0)
  let torchZ = $state(0)

  const dracoLoader = useDraco()
  const gltf = useGltf('/models/xr/ruins.glb', {
    dracoLoader
  }).then((gltf) => {
    gltf.scene.traverse((node) => {
      node.castShadow = true
      node.receiveShadow = true
    })
    torchX = gltf.nodes.Torch1.position.x
    torchZ = gltf.nodes.Torch1.position.z

    return gltf
  })

  let time = 0

  useTask((delta) => {
    time += delta / 5
    const x = noise.noise(time, 0) / 10
    const y = noise.noise(0, time) / 10
    const lightPositionX = torchX + x
    const lightPositionZ = torchZ + y
    light1.position.x = lightPositionX
    light2.position.x = lightPositionX
    light1.position.z = lightPositionZ
    light2.position.z = lightPositionZ
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
      oncreate={(ref) => ref.lookAt(0, 1.8, 0)}
    >
      <OrbitControls
        target={[0, 1.8, 0]}
        enablePan={false}
        enableZoom={false}
      />
    </T.PerspectiveCamera>
  {/snippet}
</XR>

{#await gltf then { scene, nodes }}
  <T is={scene} />
  <T
    is={light1}
    intensity={8}
    color="red"
    position.y={nodes.Torch1.position.y + 0.45}
  />

  <T
    is={light2}
    intensity={4}
    color="red"
    position.y={nodes.Candles1.position.y + 0.45}
  />
{/await}

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

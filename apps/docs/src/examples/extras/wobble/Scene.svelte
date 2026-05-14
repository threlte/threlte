<script lang="ts">
  import type { Mesh, MeshStandardMaterial } from 'three'
  import { T } from '@threlte/core'
  import {
    Wobble,
    Environment,
    Instance,
    InstancedMesh,
    OrbitControls,
    RadialGradientTexture,
    useGltf,
    SoftShadows,
    Wireframe
  } from '@threlte/extras'

  interface Plant {
    nodes: {
      concrete_pot_lambert3_0: Mesh
      plant_lambert2_0: Mesh
    }
    materials: {
      lambert2: MeshStandardMaterial
      lambert3: MeshStandardMaterial
    }
  }

  interface Flower {
    nodes: {
      Blossom: Mesh
      Stem: Mesh
    }
    materials: any
  }

  let {
    subject = 'plant',
    speed = 1,
    factor = 0.5,
    frequency = 1,
    noise = 0,
    pulse = 0,
    drift = 0,
    bendiness = 0,
    axis = [0, 1, 0],
    anchor,
    forceDirection,
    time
  }: {
    subject?: 'plant' | 'orb' | 'flowers'
    speed?: number
    factor?: number
    frequency?: number
    noise?: number
    pulse?: number
    drift?: number
    bendiness?: number
    axis?: [number, number, number]
    anchor?: number
    forceDirection?: [number, number, number]
    time?: number
  } = $props()

  const plantGltf = useGltf<Plant>('/models/rhyzome_plant-baked.glb')
  const flowerGltf = useGltf<Flower>('/models/Flower.glb')

  // Scattered flower placements.
  const flowerPlacements = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4
    const radius = 0.3 + Math.random()
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      scale: 2 + Math.random() * 1.5,
      rotation: Math.random() * Math.PI * 2
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 7, 7]}
  fov={35}
/>

<OrbitControls
  enableDamping
  enableZoom={false}
  target.y={1.7}
/>

<T.DirectionalLight
  position={[1, 5, 1]}
  intensity={4}
  castShadow
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.left={-4}
  shadow.camera.right={4}
  shadow.camera.top={4}
  shadow.camera.bottom={-4}
  shadow.camera.near={0.5}
  shadow.camera.far={20}
/>

<Environment url="/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr" />

<SoftShadows
  size={10}
  samples={10}
  focus={1.5}
/>

<T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[6, 64]} />
  <T.MeshStandardMaterial
    transparent
    roughness={0}
  >
    <RadialGradientTexture
      outerRadius={256}
      stops={[
        { offset: 0, color: 'white' },
        { offset: 0.7, color: 'rgba(255, 255, 255, 0)' }
      ]}
    />
  </T.MeshStandardMaterial>
</T.Mesh>

{#if subject === 'plant' && $plantGltf}
  <T.Mesh
    castShadow
    receiveShadow
  >
    <T is={$plantGltf.nodes.concrete_pot_lambert3_0.geometry} />
    <T is={$plantGltf.materials.lambert3} />
  </T.Mesh>

  <T.Mesh
    castShadow
    receiveShadow
  >
    <T is={$plantGltf.nodes.plant_lambert2_0.geometry} />
    <T
      is={$plantGltf.materials.lambert2}
      roughness={0.4}
    />
    <Wobble
      {speed}
      {factor}
      {frequency}
      {noise}
      {pulse}
      {drift}
      {bendiness}
      {axis}
      {anchor}
      {forceDirection}
      {time}
    />
  </T.Mesh>
{:else if subject === 'orb'}
  <T.Mesh
    position.y={1.5}
    castShadow
    receiveShadow
  >
    <T.SphereGeometry args={[1, 32, 32]} />
    <T.MeshStandardMaterial
      color="#ff7755"
      roughness={0.1}
    />
    <Wobble
      {speed}
      {factor}
      {frequency}
      {noise}
      {pulse}
      {drift}
      {bendiness}
      {axis}
      {anchor}
      {forceDirection}
      {time}
    />
    <Wireframe />
  </T.Mesh>
{:else if subject === 'flowers' && $flowerGltf}
  <InstancedMesh
    castShadow
    receiveShadow
    limit={flowerPlacements.length}
  >
    <T is={$flowerGltf.nodes.Stem.geometry} />
    <T.MeshStandardMaterial color="#3d7a3a" />
    <Wobble
      {speed}
      {factor}
      {frequency}
      {noise}
      {pulse}
      {drift}
      {bendiness}
      {axis}
      {anchor}
      {forceDirection}
      {time}
    />
    {#each flowerPlacements as f}
      <Instance
        position.x={f.x}
        position.z={f.z}
        scale={f.scale}
        rotation.y={f.rotation}
      />
    {/each}
  </InstancedMesh>

  <InstancedMesh
    castShadow
    receiveShadow
    limit={flowerPlacements.length}
  >
    <T is={$flowerGltf.nodes.Blossom.geometry} />
    <T.MeshStandardMaterial color="#ff5599" />
    <Wobble
      {speed}
      {factor}
      {frequency}
      {noise}
      {pulse}
      {drift}
      {bendiness}
      {axis}
      {anchor}
      {forceDirection}
      {time}
    />
    {#each flowerPlacements as f}
      <Instance
        position.x={f.x}
        position.z={f.z}
        scale={f.scale}
        rotation.y={f.rotation}
      />
    {/each}
  </InstancedMesh>
{/if}

<script lang="ts">
  import type { Mesh } from 'three/webgpu'
  import { Environment, OrbitControls, useDraco, useGltf } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { ACESFilmicToneMapping, Color, DoubleSide, Vector3 } from 'three/webgpu'
  import SliceMaterial from './SliceMaterial.svelte'

  type SceneProps = {
    arcAngle: number
    rotate: boolean
    sliceColor: Color
    startAngle: number
  }

  let { arcAngle, rotate, sliceColor, startAngle }: SceneProps = $props()

  const dracoLoader = useDraco()
  const gltf = useGltf<{ nodes: { outerHull: Mesh; axle: Mesh; gears: Mesh }; materials: {} }>(
    '/models/gears.glb',
    { dracoLoader }
  )

  const gearsPosition = new Vector3()

  const { scene, toneMapping } = useThrelte()

  $effect(() => {
    const blurriness = scene.backgroundBlurriness
    const lastToneMapping = toneMapping.current

    scene.backgroundBlurriness = 0.5
    toneMapping.set(ACESFilmicToneMapping)

    return () => {
      scene.backgroundBlurriness = blurriness
      toneMapping.set(lastToneMapping)
    }
  })

  let rotation = $state(0)

  const { start, stop } = useTask(
    (delta) => {
      rotation += 0.1 * delta
    },
    { autoStart: false }
  )

  $effect(() => {
    if (rotate) {
      start()
    } else {
      stop()
    }
  })

  const metalness = 0.5
  const roughness = 0.25
  const envMapIntensity = 0.5
  const color = '#858080'
</script>

<Environment
  url="/textures/equirectangular/hdr/aerodynamics_workshop_1k.hdr"
  isBackground
/>

<T.PerspectiveCamera
  makeDefault
  position.x={-5}
  position.y={5}
  position.z={12}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  intensity={4}
  position.x={6.25}
  position.y={3}
  position.z={4}
  shadow.camera.near={0.1}
  shadow.camera.bottom={-8}
  shadow.camera.far={30}
  shadow.camera.left={-8}
  shadow.camera.normalBias={0.05}
  shadow.camera.right={8}
  shadow.camera.top={8}
  shadow.mapSize.x={2048}
  shadow.mapSize.y={2048}
/>

{#snippet mesh(mesh: Mesh)}
  <T
    is={mesh}
    castShadow
    receiveShadow
  >
    <T.MeshPhysicalMaterial
      {metalness}
      {roughness}
      {envMapIntensity}
      {color}
    />
  </T>
{/snippet}

<T.Group
  position.x={gearsPosition.x}
  position.y={gearsPosition.y}
  position.z={gearsPosition.z}
  rotation.y={rotation}
>
  {#await gltf then { nodes }}
    {@render mesh(nodes.axle)}
    {@render mesh(nodes.gears)}
    <T
      is={nodes.outerHull}
      castShadow
      receiveShadow
    >
      <SliceMaterial
        {arcAngle}
        {startAngle}
        {sliceColor}
        {metalness}
        {roughness}
        {envMapIntensity}
        {color}
        side={DoubleSide}
      />
    </T>
  {/await}
</T.Group>

<T.Mesh
  position.x={-4}
  position.y={-3}
  position.z={-4}
  oncreate={(ref) => {
    ref.lookAt(gearsPosition)
  }}
  scale={10}
  receiveShadow
>
  <T.PlaneGeometry />
  <T.MeshStandardMaterial color={0xaa_aa_aa} />
</T.Mesh>

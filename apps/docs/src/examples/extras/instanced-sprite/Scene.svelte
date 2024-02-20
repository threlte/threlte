<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls, Sky, useTexture } from '@threlte/extras'
  import { BackSide, NearestFilter, RepeatWrapping } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Trees from './Trees.svelte'
  import VariantA from './VariantA.svelte'
  import VariantB from './VariantB.svelte'
  import VariantC from './VariantC.svelte'
  import VariantD from './VariantD.svelte'

  export let billboarding = false
  export let fps: number

  const grass = useTexture('/textures/sprites/pixel_grass.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(500, 500)
      texture.minFilter = NearestFilter
      texture.magFilter = NearestFilter
      texture.needsUpdate = true
      return texture
    }
  })

  const sky = useTexture('/textures/sprites/demo01_PixelSky_1920x1080.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(10, 2)
      texture.minFilter = NearestFilter
      texture.magFilter = NearestFilter
      texture.needsUpdate = true
      return texture
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={14}
  position.y={6}
>
  <OrbitControls />
</T.PerspectiveCamera>

<slot />

<!-- Dudes - Michael's Aseprite loader -->
<!-- one is wasd player controlled  -->
<!-- <VariantA
  {billboarding}
  {fps}
/> -->

<!-- Flyers - Loading .png file with multiple animations and using <Spritesheet/> <SpriteFile/> and <SpriteAnimation/> -->
<!-- <VariantB
  {billboarding}
  {fps}
/> -->

<!--
	Goblins:
	- Assemble a spritesheet out of multiple .png files.
-->

<!-- <VariantC
  {billboarding}
  {fps}
/> -->

<VariantD
  {billboarding}
  {fps}
/>

<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<!-- <Trees {billboarding} /> -->

<Sky elevation={13.35} />

<!-- <T.DirectionalLight position.y={5} /> -->

<!-- {#if $sky}
  <T.Mesh
    position.y={-10}
    scale.y={0.5}
  >
    <T.SphereGeometry args={[400]} />
    <T.MeshBasicMaterial
      map={$sky}
      side={BackSide}
    />
  </T.Mesh>
{/if}

{#if $grass}
  <T.Mesh
    rotation.x={-DEG2RAD * 90}
    receiveShadow
  >
    <T.PlaneGeometry args={[1000, 1000]} />
    <T.MeshLambertMaterial map={$grass} />
  </T.Mesh>
{/if} -->

<T.AmbientLight intensity={1} />

<T.DirectionalLight
  shadow.mapSize={[2048, 2048]}
  shadow.camera.far={128}
  shadow.camera.near={0.01}
  shadow.camera.left={-20}
  shadow.camera.right={20}
  shadow.camera.top={20}
  shadow.camera.bottom={-20}
  shadow.bias={-0.0001}
  position.x={0}
  position.y={50}
  position.z={30}
  intensity={3}
  castShadow
/>

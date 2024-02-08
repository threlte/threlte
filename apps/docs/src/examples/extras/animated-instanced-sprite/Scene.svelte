<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, useTexture } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Trees from './Trees.svelte'
  import VariantA from './VariantA.svelte'
  import VariantB from './VariantB.svelte'
  import VariantC from './VariantC.svelte'
  import { DoubleSide, NearestFilter, RepeatWrapping } from 'three'
  import DottedComponentTest from './DottedComponentTest.svelte'

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
      texture.repeat.set(10, 1)
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
<VariantA
  {billboarding}
  {fps}
/>

<!-- Flyers - Loading .png file with multiple animations and using <Spritesheet/> <SpriteFile/> and <SpriteAnimation/> -->
<VariantB
  {billboarding}
  {fps}
/>
<!-- same as Variant B but testing <Component.Subcomponent/> api -->
<DottedComponentTest
  {billboarding}
  {fps}
/>

<!-- Goblins -  Assemble a spritesheet out of multiple .png files. -->
<VariantC
  {billboarding}
  {fps}
/>

<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<Trees {billboarding} />

<Sky elevation={13.35} />

{#if $sky}
  <T.Mesh position.y={50}>
    <T.CylinderGeometry args={[200, 200, 150]} />
    <T.MeshBasicMaterial
      map={$sky}
      side={DoubleSide}
    />
  </T.Mesh>
{/if}

{#if $grass}
  <T.Mesh rotation.x={-DEG2RAD * 90}>
    <T.PlaneGeometry args={[500, 500]} />
    <T.MeshBasicMaterial map={$grass} />
  </T.Mesh>
{/if}

<Grid
  infiniteGrid
  type={'grid'}
  sectionThickness={0.0}
  position.y={0.01}
/>

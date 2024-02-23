<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Sky, useTexture } from '@threlte/extras'
  import { BackSide, BasicShadowMap, NearestFilter, RepeatWrapping } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import SpriteAtlasTrees from './SpriteAtlasTrees.svelte'
  import SpriteDudes from './SpriteDudes.svelte'
  import SpriteFlyers from './SpriteFlyers.svelte'
  import SpriteFlyersTyped from './SpriteFlyersTyped.svelte'
  import SpriteGoblin from './SpriteGoblin.svelte'

  export let billboarding = false
  export let fps: number

  useThrelte().renderer.shadowMap.type = BasicShadowMap

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

<slot />

<!--
	Dudes:
	- Michael's Aseprite loader
	- One is WASD controlled
-->
<SpriteDudes
  {billboarding}
  {fps}
/>

<!--
	Flyers:
	- Loading .png file with multiple animations
-->
<SpriteFlyers
  {billboarding}
  {fps}
/>

<!--
	Goblins:
	- Assemble a spritesheet out of multiple .png files.
-->
<SpriteGoblin
  {billboarding}
  {fps}
/>

<!--
	Flyers:
	- Loading .png file with multiple animations
	- uses a typed utility hook for animation name autocomplete etc.
-->
<SpriteFlyersTyped
  {billboarding}
  {fps}
/>

<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<SpriteAtlasTrees {billboarding} />

<!-- SCENE SETUP: grass, sky, lights -->

{#if $sky}
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
{/if}

<Sky elevation={13.35} />

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

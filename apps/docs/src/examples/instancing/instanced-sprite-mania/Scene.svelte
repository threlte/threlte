<script lang="ts">
  import { T } from '@threlte/core'
  import { Sky, useTexture } from '@threlte/extras'
  import { BackSide, NearestFilter, RepeatWrapping } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import TreeSpriteAtlas from './sprites/TreeSpriteAtlas.svelte'
  import DudeSprites from './sprites/DudeSprites.svelte'
  import FlyerSprites from './sprites/FlyerSprites.svelte'
  import FlyerSpritesTyped from './sprites/FlyerSpritesTyped.svelte'
  import GoblinSprites from './sprites/GoblinSprites.svelte'

  export let billboarding = false
  export let fps: number

  const grass = useTexture('/textures/sprites/pixel-grass.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(500, 500)
      texture.minFilter = NearestFilter
      texture.magFilter = NearestFilter
      texture.needsUpdate = true
      return texture
    }
  })

  const sky = useTexture('/textures/sprites/pixel-sky.png', {
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
<DudeSprites
  {billboarding}
  {fps}
/>

<!--
	Flyers:
	- Loading .png file with multiple animations
-->
<FlyerSprites
  {billboarding}
  {fps}
/>

<!--
	Goblins:
	- Assemble a spritesheet out of multiple .png files.
-->
<GoblinSprites
  {billboarding}
  {fps}
/>

<!--
	Flyers:
	- Loading .png file with multiple animations
	- uses a typed utility hook for animation name autocomplete etc.
-->
<FlyerSpritesTyped
  {billboarding}
  {fps}
/>

<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<TreeSpriteAtlas {billboarding} />

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

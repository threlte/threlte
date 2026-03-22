<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T } from '@threlte/core'
  import { Sky, useTexture } from '@threlte/extras'
  import { BackSide, NearestFilter, RepeatWrapping, MathUtils } from 'three'
  import TreeSpriteAtlas from './TreeSpriteAtlas.svelte'
  import DudeSprites from './DudeSprites.svelte'

  interface Props {
    billboarding?: boolean
    fps: number
    children?: Snippet
  }

  let { billboarding = false, fps, children }: Props = $props()

  const grassTexture = useTexture('/textures/sprites/pixel-grass.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(100, 100)
      texture.minFilter = NearestFilter
      texture.magFilter = NearestFilter
      texture.needsUpdate = true
      return texture
    }
  })

  const skyTexture = useTexture('/textures/sprites/pixel-sky.png', {
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

{@render children?.()}

<!--
	Dudes:
	- Michael's Aseprite loader
	- One is WASD controlled
-->
<DudeSprites
  {billboarding}
  {fps}
/>

<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<TreeSpriteAtlas {billboarding} />

<!-- SCENE SETUP: grass, sky, lights -->

{#if skyTexture.current}
  <T.Mesh
    position.y={-10}
    scale.y={0.5}
  >
    <T.SphereGeometry args={[110]} />
    <T.MeshBasicMaterial
      map={skyTexture.current}
      side={BackSide}
    />
  </T.Mesh>
{/if}

{#if grassTexture.current}
  <T.Mesh
    rotation.x={MathUtils.DEG2RAD * -90}
    receiveShadow
  >
    <T.CircleGeometry args={[110]} />
    <T.MeshLambertMaterial map={grassTexture.current} />
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

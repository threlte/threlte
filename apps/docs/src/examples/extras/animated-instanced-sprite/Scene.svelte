<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, useTexture } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Trees from './Trees.svelte'
  import VariantA from './VariantA.svelte'
  import VariantB from './VariantB.svelte'
  import { NearestFilter, RepeatWrapping } from 'three'

  export let billboarding = false
  export let fps: number

  const grass = useTexture('/textures/sprites/pixel_grass.png', {
    transform: (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.repeat.set(200, 200)
      texture.minFilter = NearestFilter
      texture.magFilter = NearestFilter
      texture.needsUpdate = true
      return texture
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={15}
  position.y={7}
>
  <OrbitControls />
</T.PerspectiveCamera>

<slot />

<!-- Michael's Aseprite loader -->
<VariantA
  {billboarding}
  {fps}
/>

<VariantB
  {billboarding}
  {fps}
/>

<Trees {billboarding} />

<Sky elevation={0.15} />

{#if $grass}
  <T.Mesh rotation.x={-DEG2RAD * 90}>
    <T.PlaneGeometry args={[500, 500]} />
    <T.MeshBasicMaterial map={$grass} />
  </T.Mesh>
{/if}

<!-- <Grid
  infiniteGrid
  type={'grid'}
  sectionThickness={0.0}
  position.y={0.01}
/> -->

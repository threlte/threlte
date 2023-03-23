<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Color } from 'three'
  import Tokyo from './Tokyo.svelte'

  const { scene } = useThrelte()
  scene.background = new Color(0xeae8e2)

  let showTokyo = true
</script>

<svelte:window
  on:keypress={() => {
    showTokyo = !showTokyo
  }}
/>

<T.PerspectiveCamera
  makeDefault
  position={[600, 200, 600]}
  near={10}
  far={10000}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={0.2}
    enableDamping
    enableZoom={false}
    target={[-60, -75, 0]}
  />
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight position={[5, 10, 5]} />

{#if showTokyo}
  <Tokyo />
{/if}

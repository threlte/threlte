<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedSprite } from '../lib'
  import { browser } from '$app/environment'
  import Gamepad from './Gamepad.svelte'
  import MountedGamepad from './MountedGamepad.svelte'
  import textureData from '$lib/assets/punk.json?url'
  import image from '$lib/assets/punk.png'

  let listenToGamepad = true
  let mountGamepad = false

  let animations = Array.from({ length: 10 }).fill('Idle_Left')
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'g') {
      listenToGamepad = !listenToGamepad
    }

    if (e.key === 'm') {
      mountGamepad = !mountGamepad
    }
  }}
/>

{#if browser && mountGamepad}
  <Gamepad />
{/if}

{#if listenToGamepad}
  <MountedGamepad />
{/if}

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<Grid />

<!-- <T.Mesh position.y={1}>
  <T.MeshStandardMaterial
    transparent
    color="white"
  />
  <T.SphereGeometry />
</T.Mesh> -->

{#each animations as animation, x}
    <AnimatedSprite
      {animation}
      position.z={x}
      position.y={0.5}
      {textureData}
      {image}
      asSprite={true}
      on:loop={() => (animations[x] = animation === 'Idle_Left' ? 'Idle_Right' : 'Idle_Left')}
    />
{/each}

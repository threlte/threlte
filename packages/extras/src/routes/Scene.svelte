<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Sky, Grid } from '../lib'
  import { browser } from '$app/environment'
  import Gamepad from './Gamepad.svelte'
  import MountedGamepad from './MountedGamepad.svelte'

  let listenToGamepad = true
  let mountGamepad = false
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

<Grid />

{#if browser && mountGamepad}
  <Gamepad />
{/if}

{#if listenToGamepad}
  <MountedGamepad />
{/if}

<T.PerspectiveCamera
  makeDefault
  position={[3, 1.5, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<T.Mesh position.y={1} castShadow receiveShadow>
  <T.MeshStandardMaterial color="white" />
  <T.SphereGeometry />
</T.Mesh>

<T.DirectionalLight intensity={2} castShadow position={[1, 1, 1]} />

<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, useGamepad } from '../lib'
  import { browser } from '$app/environment'
  import Gamepad from './Gamepad.svelte'
  import MountedGamepad from './MountedGamepad.svelte'
  import EnvironmentTest from '../lib/components/environment/EnvironmentTest.svelte'
  import { Texture } from 'three'

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

<EnvironmentTest url="" />

{#if browser && mountGamepad}
  <Gamepad />
{/if}

{#if listenToGamepad}
  <MountedGamepad />
{/if}

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<Grid />

<T.Mesh position.y={1}>
  <T.MeshStandardMaterial
    transparent
    color="white"
  />
  <T.SphereGeometry />
</T.Mesh>

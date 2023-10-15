<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedSpriteMaterial } from '../lib'
  import { browser } from '$app/environment'
  import Gamepad from './Gamepad.svelte'
  import MountedGamepad from './MountedGamepad.svelte'
  import dataUrl from '$lib/assets/punk.json?url'
  import textureUrl from '$lib/assets/punk.png'
  import flameTextureUrl from '$lib/assets/flame.png'

  let listenToGamepad = true
  let mountGamepad = false
  let index = 0
  let sequence = ['Idle_Left', 'Idle_Left', 'Idle_Left', 'Idle_Right', 'Idle_Right', 'Idle_Right']
  let animation = sequence[0]

  const sprites = Array.from({ length: 10 }).map(() => {
    const index = Math.trunc(Math.random() * sequence.length)
    return {
      index,
      animation: sequence[index],
    }
  })
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

<T.OrthographicCamera
  makeDefault
  near={-100}
  far={100}
  zoom={150}
  position={[3, 1.5, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.OrthographicCamera>

<Sky />

<Grid position.y={0.001} type='polar' />

<T.Mesh position.y={1} position.x={-2} castShadow receiveShadow>
  <T.MeshStandardMaterial color="white" />
  <T.SphereGeometry />
</T.Mesh>

<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<!-- {#each sprites as sprite, x}
  <T.Sprite
    position.z={x}
    position.y={0.5}
  >
    <AnimatedSpriteMaterial
      {textureUrl}
      {dataUrl}
      animation={sprite.animation}
      fps={x + 1}
      on:loop={() => {
        sprite.index += 1
        sprite.index %= sequence.length
        sprite.animation = sequence[index]
      }}
    />
  </T.Sprite>
{/each} -->

<T.Sprite
  position.z={-3}
  position.y={0.5}
>
  <AnimatedSpriteMaterial
    textureUrl={flameTextureUrl}
    fps={40}
    columns={9}
    rows={6}
    totalFrames={51}
    filter='linear'
  />
</T.Sprite>

<T.Mesh
  position.z={-1}
  position.y={0.5}
  rotation.y={Math.PI / 2}
  castShadow
  receiveShadow
>
  <AnimatedSpriteMaterial
    {textureUrl}
    {dataUrl}
    {animation}
    fps={5}
  />
  <T.PlaneGeometry />
</T.Mesh>

<T.DirectionalLight intensity={2} castShadow position={[1, 1, 1]} />

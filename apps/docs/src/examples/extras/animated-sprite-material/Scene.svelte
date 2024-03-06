<script lang="ts">
  import { T } from '@threlte/core'
  import { AnimatedSpriteMaterial, Suspense, useTexture } from '@threlte/extras'
  import Fire from './Fire.svelte'
  import Player from './Player.svelte'
  import ThrelteSeven from './ThrelteSeven.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const texture = useTexture('/textures/sprites/bg.png')

  let playerPosition: [number, number, number]
  $: playerAtFire = playerPosition && Math.abs(playerPosition[0]) < 0.7

  const fov = tweened(50, {
    easing: cubicOut,
    duration: 900
  })
  $: fov.set(playerAtFire ? 45 : 50)
  const cameraPosY = tweened(-0.2, {
    easing: cubicOut,
    duration: 900
  })
  $: cameraPosY.set(playerAtFire ? -0.9 : -0.2)
</script>

<Fire />

<T.AmbientLight
  color="#6697C7"
  intensity={0.3}
/>

{#each { length: 9 } as _, i}
  <T.Sprite
    scale={0.5}
    position.y={-1.99}
    position.x={i < 5 ? i / 2.4 + Math.random() * 0.4 - 2.8 : i / 2.4 + Math.random() * 0.4 - 1}
  >
    <AnimatedSpriteMaterial
      textureUrl="/textures/sprites/grass.png"
      totalFrames={6}
      fps={5}
      delay={i * 40}
    />
  </T.Sprite>
{/each}

<T.Sprite
  scale={7.5}
  position.z={-0.01}
  position.y={0.4}
>
  {#if $texture}
    <T.MeshBasicMaterial map={$texture} />
  {/if}
</T.Sprite>

<Suspense>
  <ThrelteSeven show={playerAtFire} />
</Suspense>

<Player bind:playerPosition />

<T.PerspectiveCamera
  makeDefault
  position.z={7}
  position.y={$cameraPosY}
  fov={$fov}
/>

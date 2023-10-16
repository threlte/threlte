<script lang='ts'>
  import { T } from '@threlte/core'
  import { AnimatedSpriteMaterial, useTexture } from '@threlte/extras'
  import Player from './Player.svelte'

  export let fps: number
  export let playing: boolean
  export let loop: boolean

  const texture = useTexture('/textures/sprites/bg.png')
</script>

<T.Sprite position.y={-2.3}>
  <AnimatedSpriteMaterial
    textureUrl='/textures/sprites/fire.png'
    totalFrames={8}
    {fps}
    {playing}
    {loop}
  />
  <T.PointLight
    intensity={12}
    decay={0.5}
    position.y={-0.2}
    position.z={0.02}
  />
</T.Sprite>

{#each { length: 9 } as _, i}
  <T.Sprite
    scale={0.5}
    position.y={-1.99}
    position.x={i < 5
      ? (i / 2.4) + (Math.random() * 0.4) - 2.8
      : (i / 2.4) + (Math.random() * 0.4) - 1
    }
  >
    <AnimatedSpriteMaterial
      textureUrl='/textures/sprites/grass.png'
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
  on:pointermove={(event) => console.log(event)}
>
  {#if $texture}
    <T.MeshBasicMaterial
      map={$texture}
      totalFrames={8}
      {fps}
      {playing}
      {loop}
    />
  {/if}
</T.Sprite>

<Player />

<T.PerspectiveCamera
  makeDefault
  position.z={7}
/>


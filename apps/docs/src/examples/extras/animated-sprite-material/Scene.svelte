<script lang="ts">
  import { T } from '@threlte/core'
  import { AnimatedSpriteMaterial, Suspense, useTexture } from '@threlte/extras'
  import Fire from './Fire.svelte'
  import Player from './Player.svelte'
  import ThrelteLogo from './ThrelteLogo.svelte'
  import { Tween } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const texture = useTexture('/textures/sprites/bg.png')

  let playerPosition: [number, number, number] = $state([-2.0, -2.75, 0.01])
  let playerAtFire = $derived(playerPosition && Math.abs(playerPosition[0]) < 0.7)

  const fov = new Tween(50, {
    easing: cubicOut,
    duration: 900
  })
  const cameraPosY = new Tween(-0.2, {
    easing: cubicOut,
    duration: 900
  })

  $effect(() => {
    fov.set(playerAtFire ? 45 : 50)
  })
  $effect(() => {
    cameraPosY.set(playerAtFire ? -0.9 : -0.2)
  })
</script>

<Suspense>
  <Fire />
</Suspense>

<T.AmbientLight
  color="#6697C7"
  intensity={0.3}
/>

<Suspense>
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
</Suspense>

{#await texture then map}
  <T.Sprite
    scale={7.5}
    position.z={-0.01}
    position.y={0.4}
  >
    <T.MeshBasicMaterial {map} />
  </T.Sprite>
{/await}

<Suspense>
  <ThrelteLogo show={playerAtFire} />
</Suspense>

<Player bind:position={playerPosition} />

<T.PerspectiveCamera
  makeDefault
  position.z={7}
  position.y={cameraPosY.current}
  fov={fov.current}
/>

<!--
	-	uses aseprite json loader
	- one sprite is WASD controlled
	- uses an untyped useInstancedSprie() hook in UpdaterWalking component
 -->

<script lang="ts">
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'
  import WalkingBehaviour from '../behaviours/WalkingBehaviour.svelte'

  export let billboarding = false
  export let fps: number

  const player = buildSpritesheet.fromAseprite(
    '/textures/sprites/player.json',
    '/textures/sprites/player.png'
  )
</script>

{#await player then spritesheet}
  <InstancedSprite
    {spritesheet}
    count={4000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    castShadow
  >
    <WalkingBehaviour />
  </InstancedSprite>
{/await}

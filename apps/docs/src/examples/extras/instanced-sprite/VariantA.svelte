<script lang="ts">
  import { InstancedSprite, buildSpritesheet, useTexture } from '@threlte/extras'
  import UpdaterWalking from './UpdaterWalking.svelte'

  export let billboarding = false
  export let fps: number

  const texture = useTexture('/textures/sprites/player.png')
  const player = buildSpritesheet.fromAseprite('/textures/sprites/player.json')
</script>

{#if $texture}
  {#await player.result then { spritesheet }}
    <InstancedSprite
      texture={$texture}
      {spritesheet}
      count={500}
      playmode={'FORWARD'}
      {fps}
      {billboarding}
      castShadow
    >
      <UpdaterWalking />
    </InstancedSprite>
  {/await}
{/if}

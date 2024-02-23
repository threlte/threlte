<script lang="ts">
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'
  import UpdaterWalking from './UpdaterWalking.svelte'

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
    count={500}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    castShadow
  >
    <UpdaterWalking />
  </InstancedSprite>
{/await}

<script lang="ts">
  import { InstancedSprite, Spritesheet } from '@threlte/extras'
  import UpdaterWalking from './UpdaterWalking.svelte'

  export let billboarding = false
  export let fps: number
</script>

<Spritesheet
  textureUrl="/textures/sprites/player.png"
  dataUrl="/textures/sprites/player.json"
  aseprite
>
  <InstancedSprite
    count={500}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    castShadow
  >
    <UpdaterWalking />
  </InstancedSprite>
</Spritesheet>

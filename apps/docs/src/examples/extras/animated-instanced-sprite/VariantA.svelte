<script lang="ts">
  import { AnimatedInstancedSprite } from '@threlte/extras'
  import Spritesheet from 'node_modules/@threlte/extras/src/lib/components/AnimatedInstancedSprite/Spritesheet.svelte'
  import UpdaterWalking from './UpdaterWalking.svelte'

  export let billboarding = false
  export let fps: number
</script>

<Spritesheet
  textureUrl="/textures/sprites/player.png"
  dataUrl="/textures/sprites/player.json"
>
  <AnimatedInstancedSprite
    count={500}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
  >
    <UpdaterWalking />
  </AnimatedInstancedSprite>
</Spritesheet>

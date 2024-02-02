<script lang="ts">
  import { AnimatedInstancedSprite, SpriteFile } from '@threlte/extras'
  import SpriteAnimation from 'node_modules/@threlte/extras/src/lib/components/AnimatedInstancedSprite/SpriteAnimation.svelte'
  import Spritesheet from 'node_modules/@threlte/extras/src/lib/components/AnimatedInstancedSprite/Spritesheet.svelte'
  import UpdaterFlying from './UpdaterFlying.svelte'

  export let billboarding = false
  export let fps: number
</script>

<Spritesheet>
  <SpriteFile
    path="/textures/sprites/cacodaemon.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 4
    }}
  >
    <SpriteAnimation
      name="fly"
      frameRange={[0, 6]}
    />
    <SpriteAnimation
      name="attack"
      frameRange={[8, 14]}
    />
    <SpriteAnimation
      name="idle"
      frameRange={[16, 20]}
    />
    <SpriteAnimation
      name="death"
      frameRange={[24, 32]}
    />
  </SpriteFile>

  <AnimatedInstancedSprite
    count={2000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
  >
    <UpdaterFlying />
  </AnimatedInstancedSprite>
</Spritesheet>

<script lang="ts">
  import { InstancedSprite, Spritesheet } from '@threlte/extras'
  import UpdaterFlying from './UpdaterFlying.svelte'

  export let billboarding = false
  export let fps: number
</script>

<Spritesheet
  let:File
  let:Animation
>
  <File
    textureUrl="/textures/sprites/cacodaemon.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 4
    }}
  >
    <Animation
      name="fly"
      frameRange={[0, 6]}
    />
    <Animation
      name="attack"
      frameRange={[8, 14]}
    />
    <Animation
      name="idle"
      frameRange={[16, 20]}
    />
    <Animation
      name="death"
      frameRange={[24, 32]}
    />
  </File>

  <InstancedSprite
    count={10000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    randomPlaybackOffset={1}
  >
    <UpdaterFlying />
  </InstancedSprite>
</Spritesheet>

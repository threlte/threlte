<script lang="ts">
  import { InstancedSprite } from '@threlte/extras'
  import UpdaterFlying from './UpdaterFlying.svelte'

  export let billboarding = false
  export let fps: number
</script>

<InstancedSprite.Sheet>
  <InstancedSprite.File
    textureUrl="/textures/sprites/cacodaemon.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 4
    }}
  >
    <InstancedSprite.Animation
      name="fly"
      frameRange={[0, 6]}
    />
    <InstancedSprite.Animation
      name="attack"
      frameRange={[8, 14]}
    />
    <InstancedSprite.Animation
      name="idle"
      frameRange={[16, 20]}
    />
    <InstancedSprite.Animation
      name="death"
      frameRange={[24, 32]}
    />
  </InstancedSprite.File>

  <InstancedSprite.Core
    count={2000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    randomPlaybackOffset={1}
  >
    <UpdaterFlying />
  </InstancedSprite.Core>
</InstancedSprite.Sheet>

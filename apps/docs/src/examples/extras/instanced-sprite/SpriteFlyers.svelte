<script lang="ts">
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'
  import UpdaterFlying from './UpdaterFlying.svelte'
  import type { SpritesheetMetadata } from '@threlte/extras'

  export let billboarding = false
  export let fps: number

  const demonSpriteMeta = [
    {
      url: '/textures/sprites/cacodaemon.png',
      type: 'rowColumn',
      width: 8,
      height: 4,
      animations: [
        { name: 'fly', frameRange: [0, 5] },
        { name: 'attack', frameRange: [8, 13] },
        { name: 'idle', frameRange: [16, 19] },
        { name: 'death', frameRange: [24, 31] }
      ]
    }
  ] as const satisfies SpritesheetMetadata

  const demonSheetbuilder = buildSpritesheet.from<typeof demonSpriteMeta>(demonSpriteMeta)
</script>

{#await demonSheetbuilder.spritesheet then spritesheet}
  <InstancedSprite
    count={5000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    randomPlaybackOffset={1}
    castShadow
    {spritesheet}
  >
    <UpdaterFlying />
  </InstancedSprite>
{/await}

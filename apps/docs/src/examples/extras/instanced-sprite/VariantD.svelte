<script
  context="module"
  lang="ts"
>
  import type { SpritesheetMetadata } from '@threlte/extras'
  const demonSpriteMeta = [
    {
      url: '/textures/sprites/cacodaemon.png',
      type: 'rowColumn',
      width: 8,
      height: 4,
      animations: [
        { name: 'fly', frameRange: [0, 6] },
        { name: 'attack', frameRange: [8, 14] },
        { name: 'idle', frameRange: [16, 20] },
        { name: 'death', frameRange: [24, 32] }
      ]
    }
  ] as const satisfies SpritesheetMetadata

  const cacodaemonSpritesheet = buildSpritesheet<typeof demonSpriteMeta>(demonSpriteMeta)

  export const useDemonSprite = cacodaemonSpritesheet.useInstancedSprite
</script>

<script lang="ts">
  import { InstancedSprite } from '@threlte/extras'
  import UpdaterFlyingHook from './UpdaterFlyingHook.svelte'

  export let billboarding = false
  export let fps: number
  const count = 5000
  import { buildSpritesheet } from '@threlte/extras'
</script>

{#await cacodaemonSpritesheet.sheet then { spritesheet, texture }}
  <InstancedSprite
    {count}
    {billboarding}
    {spritesheet}
    {texture}
    hueShift={{
      h: 0.3,
      s: 1.5,
      v: 1.5
    }}
  >
    <UpdaterFlyingHook />
  </InstancedSprite>
{/await}

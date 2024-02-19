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
        { name: 'fly', frameRange: [0, 5] },
        { name: 'attack', frameRange: [8, 13] },
        { name: 'idle', frameRange: [16, 19] },
        { name: 'death', frameRange: [24, 31] }
      ]
    }
  ] as const satisfies SpritesheetMetadata

  const cacodaemonSpritesheet = buildSpritesheet.from<typeof demonSpriteMeta>(demonSpriteMeta)

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

{#await cacodaemonSpritesheet.result then { spritesheet, texture }}
  <InstancedSprite
    {count}
    {billboarding}
    {spritesheet}
    {texture}
    castShadow
    hueShift={{
      h: 0.3,
      s: 1.5,
      v: 1.5
    }}
  >
    <UpdaterFlyingHook />
  </InstancedSprite>
{/await}

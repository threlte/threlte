<script
  context="module"
  lang="ts"
>
  const def = [
    {
      url: '/textures/sprites/cacodaemon.png',
      type: 'rowColumn',
      w: 8,
      h: 4,
      animations: [
        { name: 'fly', frameRange: [0, 6] },
        { name: 'attack', frameRange: [8, 14] },
        { name: 'idle', frameRange: [16, 20] },
        { name: 'death', frameRange: [24, 32] }
      ]
    }
  ] as const

  const cacodaemonSpritesheet = buildSpritesheet<typeof def>(def)

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

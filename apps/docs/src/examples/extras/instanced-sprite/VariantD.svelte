<script lang="ts">
  import { InstancedSprite, Spritesheet } from '@threlte/extras'
  import UpdaterFlying from './UpdaterFlying.svelte'

  export let billboarding = false
  export let fps: number
  const count = 5000
  import { buildSpritesheet } from '@threlte/extras'

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
</script>

{#await cacodaemonSpritesheet then { spritesheet, texture }}
  <InstancedSprite
    {count}
    {billboarding}
    {spritesheet}
    {texture}
  >
    <UpdaterFlying />
  </InstancedSprite>
{/await}

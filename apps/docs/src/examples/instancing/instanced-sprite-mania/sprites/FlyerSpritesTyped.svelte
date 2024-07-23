<!--
	-	builds spritesheet from the SpritesheetMetadata object with buildSpritesheet.from
		utility. Multiple animations in one sprite file. Set up for typescript
		animation name autocomplete.
	- notice that it's built in a script with context="module". This allows for exporting the built
		spritesheet and a typed hook. You could also have it somewhere else in a .ts file for example.
	- object has `as const satisfies SpritesheetMetadata`, necessary for autocomplete
	- a typed hook with animation name autocomplete is provided by buildSpritesheet.from
		then, this hook is used in UpdaterFlyingHook component instead of untyped useInstancedSprite
 -->

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
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'
  import FlyingBehaviourHook from '../behaviours/FlyingBehaviourHook.svelte'

  export let billboarding = false

  const count = 2000
</script>

{#await cacodaemonSpritesheet.spritesheet then spritesheet}
  <InstancedSprite
    {count}
    {billboarding}
    {spritesheet}
    castShadow
    hueShift={{
      h: 0.3,
      s: 1.5,
      v: 1.5
    }}
  >
    <FlyingBehaviourHook />
  </InstancedSprite>
{/await}

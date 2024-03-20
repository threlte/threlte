<!--
	-	builds spritesheet from the SpritesheetMetadata object with buildSpritesheet.from
		utility. Multiple animations in one sprite file. Not set up for typescript
		animation name autocomplete. For that check SpriteFlyersTyped.svelte file
	- uses an untyped useInstancedSprie() hook in UpdaterFlying component
 -->

<script lang="ts">
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'

  import type { SpritesheetMetadata } from '@threlte/extras'
  import FlyingBehaviour from '../behaviours/FlyingBehaviour.svelte'

  export let billboarding = false
  export let fps: number

  const demonSpriteMeta: SpritesheetMetadata = [
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
  ]

  const flyerSheetbuilder = buildSpritesheet.from(demonSpriteMeta)
</script>

{#await flyerSheetbuilder.spritesheet then spritesheet}
  <InstancedSprite
    count={2000}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    randomPlaybackOffset={1}
    castShadow
    {spritesheet}
  >
    <FlyingBehaviour />
  </InstancedSprite>
{/await}

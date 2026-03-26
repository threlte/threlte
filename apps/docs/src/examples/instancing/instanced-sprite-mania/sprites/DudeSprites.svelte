<!--
	-	uses aseprite json loader
	- one sprite is WASD controlled
	- uses an untyped useInstancedSprie() hook in UpdaterWalking component
 -->

<script lang="ts">
  import { InstancedSprite, buildSpritesheet } from '@threlte/extras'
  import WalkingBehaviour from '../behaviours/WalkingBehaviour.svelte'

  interface Props {
    billboarding?: boolean
    fps: number
  }

  let { billboarding = false, fps }: Props = $props()

  const spritesheet = await buildSpritesheet.fromAseprite(
    '/textures/sprites/player.json',
    '/textures/sprites/player.png'
  )
</script>

<InstancedSprite
  {spritesheet}
  count={4000}
  playmode={'FORWARD'}
  {fps}
  {billboarding}
  castShadow
>
  <WalkingBehaviour />
</InstancedSprite>

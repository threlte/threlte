<script lang="ts">
  import type { PLAY_MODE } from '@threejs-kit/instanced-sprite-mesh'
  import { getContext } from 'svelte'
  import type { Vector2Tuple, Vector3Tuple } from 'three'
  import type { AnimatedInstancedSpriteUserCtx } from './AnimatedInstancedSprite.svelte'

  const spriteCtx = getContext<AnimatedInstancedSpriteUserCtx>('instanced-sprite-ctx')
  const { updatePosition, count, animationMap, mesh } = spriteCtx
  //
  export let position: Vector3Tuple = [0, 0, 0]
  export let scale: Vector2Tuple = [1, 1]

  export let id = 0
  export let animationName: string | undefined

  export let playmode: keyof typeof PLAY_MODE | undefined = undefined
  export let billboarding: boolean | undefined = undefined
  export let offset: number | undefined = undefined

  $: updatePosition(id, position, scale)

  $: animationName !== undefined && mesh.animation.setAt(id, animationName)
  $: playmode !== undefined && mesh.playmode.setAt(id, playmode)
  $: billboarding !== undefined && mesh.billboarding.setAt(id, billboarding)
  $: offset !== undefined && mesh.offset.setAt(id, offset)
</script>

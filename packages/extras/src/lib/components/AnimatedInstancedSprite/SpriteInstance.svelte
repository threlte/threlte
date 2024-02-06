<script lang="ts">
  import { getContext } from 'svelte'
  import type { AnimatedInstancedSpriteUserCtx } from './AnimatedInstancedSprite.svelte'
  import type { SpriteInstanceProps } from './SpriteInstance'

  type $$Props = SpriteInstanceProps

  const spriteCtx = getContext<AnimatedInstancedSpriteUserCtx>('instanced-sprite-ctx')
  const { updatePosition, count, animationMap, mesh } = spriteCtx
  //
  export let id: $$Props['id'] = 0

  export let position: $$Props['position'] = [0, 0, 0]
  export let scale: $$Props['scale'] = [1, 1]

  export let animationName: $$Props['animationName'] = undefined

  export let playmode: $$Props['playmode'] = undefined
  export let billboarding: $$Props['billboarding'] = undefined
  export let offset: $$Props['offset'] = undefined
  export let loop: $$Props['loop'] = undefined
  export let flipX: $$Props['flipX'] = undefined
  export let flipY: $$Props['flipY'] = undefined

  $: position !== undefined && updatePosition(id, position, scale)
  $: animationName !== undefined && mesh.animation.setAt(id, animationName)
  $: playmode !== undefined && mesh.playmode.setAt(id, playmode)
  $: billboarding !== undefined && mesh.billboarding.setAt(id, billboarding)
  $: offset !== undefined && mesh.offset.setAt(id, offset)
  $: loop !== undefined && mesh.loop.setAt(id, loop)
  $: flipX !== undefined && mesh.loop.setAt(id, flipX)
  $: flipY !== undefined && mesh.loop.setAt(id, flipY)
</script>

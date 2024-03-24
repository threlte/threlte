<script lang="ts">
  import { getContext } from 'svelte'
  import type { InstancedSpriteUserCtx } from './InstancedSprite.svelte'
  import type { SpriteInstanceProps } from './SpriteInstance'

  type $$Props = SpriteInstanceProps

  const spriteCtx = getContext<InstancedSpriteUserCtx<any>>('instanced-sprite-ctx')
  const { updatePosition, sprite } = spriteCtx
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
  export let frameId: $$Props['frameId'] = undefined

  $: position !== undefined && updatePosition(id, position, scale)
  $: animationName !== undefined && sprite.animation.setAt(id, animationName)
  $: playmode !== undefined && sprite.playmode.setAt(id, playmode)
  $: billboarding !== undefined && sprite.billboarding.setAt(id, billboarding)
  $: offset !== undefined && sprite.offset.setAt(id, offset)
  $: loop !== undefined && sprite.loop.setAt(id, loop)
  $: flipX !== undefined && sprite.flipX.setAt(id, flipX)
  $: flipY !== undefined && sprite.flipY.setAt(id, flipY)
  $: frameId !== undefined && sprite.frame.setAt(id, frameId, animationName)
</script>

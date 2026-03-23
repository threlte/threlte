<script lang="ts">
  import { getContext } from 'svelte'
  import type { InstancedSpriteUserCtx, SpriteInstanceProps } from './types.js'

  let {
    id = 0,
    position = [0, 0, 0],
    scale = [1, 1],
    animationName,
    playmode,
    billboarding,
    offset,
    loop,
    flipX,
    flipY,
    frameId
  }: SpriteInstanceProps = $props()

  const { updatePosition, sprite } = getContext<InstancedSpriteUserCtx<any>>('instanced-sprite-ctx')

  $effect.pre(() => {
    if (position !== undefined) updatePosition(id, position, scale)
  })
  $effect.pre(() => {
    if (animationName !== undefined) sprite.animation.setAt(id, animationName)
  })
  $effect.pre(() => {
    if (playmode !== undefined) sprite.playmode.setAt(id, playmode)
  })
  $effect.pre(() => {
    if (billboarding !== undefined) sprite.billboarding.setAt(id, billboarding)
  })
  $effect.pre(() => {
    if (offset !== undefined) sprite.offset.setAt(id, offset)
  })
  $effect.pre(() => {
    if (loop !== undefined) sprite.loop.setAt(id, loop)
  })
  $effect.pre(() => {
    if (flipX !== undefined) sprite.flipX.setAt(id, flipX)
  })
  $effect.pre(() => {
    if (flipY !== undefined) sprite.flipY.setAt(id, flipY)
  })
  $effect.pre(() => {
    if (frameId !== undefined) sprite.frame.setAt(id, frameId, animationName)
  })
</script>

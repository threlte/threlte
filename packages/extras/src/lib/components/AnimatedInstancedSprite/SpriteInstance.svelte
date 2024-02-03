<script lang="ts">
  import { getContext } from 'svelte'
  import type { Vector2Tuple, Vector3Tuple } from 'three'

  const spriteCtx: any = getContext('instanced-sprite-ctx')
  const { updatePosition, count, animationMap, setAnimation, mesh } = spriteCtx
  //
  export let position: Vector3Tuple = [0, 0, 0]
  export let scale: Vector2Tuple = [1, 1]

  export let id = 0
  export let animationName: string | undefined

  $: updatePosition(id, position, scale)

  $: animationName && setAnimation(id, animationName)
</script>

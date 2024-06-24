<script lang="ts">
  import type { Snippet } from 'svelte'
  import { MathUtils } from 'three'

  interface Props {
    translationSnap?: number
    rotationSnap?: number
    scaleSnap?: number
    children?: Snippet<[{ transform: Record<string, unknown> }]>
  }

  let { translationSnap = 1, rotationSnap = 15 * MathUtils.DEG2RAD, scaleSnap = 0.1, children }: Props = $props()

  let useSnap = $state(false)
  let mode = $state<'translate' | 'rotate' | 'scale'>('translate')
  let space = $state<'world' | 'local'>('local')

  const onKeyDown = (e: KeyboardEvent) => {
    // toggle snap on Shift
    if (e.key === 'Shift') {
      useSnap = true
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      useSnap = false
    }
  }

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 't') mode = 'translate'
    if (e.key === 'r') mode = 'rotate'
    if (e.key === 's') mode = 'scale'
    if (e.key === 'g') {
      if (space === 'world') {
        space = 'local'
      } else {
        space = 'world'
      }
    }
  }
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
  on:keypress={onKeyPress}
/>

{@render children?.({ 
  transform: {
    translationSnap: useSnap ? translationSnap : undefined,
    rotationSnap: useSnap ? rotationSnap : undefined,
    scaleSnap: useSnap ? scaleSnap : undefined,
    mode,
    space
  }
})}


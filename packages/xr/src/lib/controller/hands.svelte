<script lang='ts'>

import { createRawEventDispatcher } from '@threlte/core'
import Hand from './hand.svelte'
import type { XRHandEvent } from '$lib/types'

export let profile: 'mesh' | 'spheres' | 'boxes' | 'none' = 'mesh'

type $$Events = {
  connected: XRHandEvent<'connected'>
  disconnected: XRHandEvent<'disconnected'>
  pinchstart: XRHandEvent<'pinchstart'>
  pinchend: XRHandEvent<'pinchend'>
}

const dispatch = createRawEventDispatcher<$$Events>()

const handedness: ['left' | 'right', 'left' | 'right'] = [undefined!, undefined!]

const setHandedness = (index: number, event: XRHandEvent<'connected'>) => {
  if (event.data) {
    handedness[index] = event.data.handedness as 'left' | 'right'
  }
}

</script>

{#each [0, 1] as index (index)}
  <Hand
    {index}
    {profile}
    on:connected={(event) => {
      setHandedness(index, event)
      dispatch(event.type, event)
    }}
    on:disconnected
    on:pinchstart
    on:pinchend
  >
    {#if handedness[index] === 'left'}
      <slot name='left' />
    {:else if handedness[index] === 'right'}
      <slot name='right' />
    {/if}
  </Hand>
{/each}

<script lang='ts'>

import { createRawEventDispatcher } from '@threlte/core'
import Hand from './hand.svelte'
import type { XREvent, XRHandEvent } from '$lib/types'

export let profile: 'mesh' | 'spheres' | 'boxes' | 'none' = 'mesh'

type $$Events = {
  connected: XRHandEvent<'connected'>
  disconnected: XRHandEvent<'disconnected'>
  pinchstart: XRHandEvent<'pinchstart'>
  pinchend: XRHandEvent<'pinchend'>
}

const dispatch = createRawEventDispatcher<$$Events>()

const handedness: ['left' | 'right', 'left' | 'right'] = [undefined!, undefined!]

const handleXrEvent = (event: XREvent) => dispatch(event.type, event)

const setHandedness = (index: number, event: XREvent<'connected'>) => {
  handedness[index] = event.data.handedness
}

</script>

{#each [0, 1] as index (index)}
  <Hand
    {index}
    {profile}
    on:connected={(event) => {
      setHandedness(index, event)
      handleXrEvent(event)
    }}
    on:disconnected={handleXrEvent}
    on:pinchstart={handleXrEvent}
    on:pinchend={handleXrEvent}
  >
    {#if handedness[index] === 'left'}
      <slot name='left' />
    {:else if handedness[index] === 'right'}
      <slot name='right' />
    {/if}
  </Hand>
{/each}

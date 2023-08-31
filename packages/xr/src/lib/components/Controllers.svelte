<!--
@component
`<Controllers />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model per each hand.

It can optionally accept children in `left` and `right` slots, which will replace the default controller model of the respective handedness.

```
  <Controllers>
    <T.Mesh slot='left'>...</T.Mesh>
    <T.Mesh slot='right'>...</T.Mesh>
  </Controllers>
```
-->

<script lang='ts'>
  import { createRawEventDispatcher } from '@threlte/core'
  import Controller from './Controller.svelte'
  import type { XRControllerEvent } from '../types'

  type $$Events = {
    connected: XRControllerEvent<'connected'>
    disconnected: XRControllerEvent<'disconnected'>
    select: XRControllerEvent<'select'>
    selectstart: XRControllerEvent<'selectstart'>
    selectend: XRControllerEvent<'selectend'>
    squeeze: XRControllerEvent<'squeeze'>
    squeezeend: XRControllerEvent<'squeezeend'>
    squeezestart: XRControllerEvent<'squeezestart'>
  }

  type Handedness = XRHandedness | undefined

  const dispatch = createRawEventDispatcher<$$Events>()
  const handedness: [Handedness, Handedness] = [undefined, undefined]

  const handleXrEvent = (event: XRControllerEvent) => {
    dispatch(event.type, event)
  }

  const setHandedness = (index: number, event: XRControllerEvent<'connected'>) => {
    if (event.data !== undefined) {
      handedness[index] = event.data.handedness
    }
  }
</script>

{#each [0, 1] as index (index)}
  <Controller
    {index}
    on:connected={(event) => {
      setHandedness(index, event)
      handleXrEvent(event)
    }}
    on:disconnected
    on:select
    on:selectstart
    on:selectend
    on:squeeze
    on:squeezeend
    on:squeezestart
  >
    {#if handedness[index] === 'left'}
      <slot name='left' />
    {:else if handedness[index] === 'right'}
      <slot name='right' />
    {/if}
  </Controller>
{/each}

<!--
@component
`<Controllers />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model per each hand.

It can optionally accept children in `left` and `right` slots, which will be parented to the controller of the respective handedness.
-->

<script lang='ts'>

import { createRawEventDispatcher } from '@threlte/core'
import Controller from './controller.svelte'
import type { XRControllerEvent } from '../types'

/** An optional model for the left controller. If 'none' is passed, no controller model will render.  */
export let modelLeft: THREE.Object3D | 'none' | undefined = undefined

/** An optional model for the right controller. If 'none' is passed, no controller model will render.  */
export let modelRight: THREE.Object3D | 'none' | undefined = undefined

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

$: models = {
  left: modelLeft,
  right: modelRight,
  none: 'none',
  default: undefined,
} as const

</script>

{#each [0, 1] as index (index)}
  <Controller
    model={models[handedness[index] ?? 'default']}
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

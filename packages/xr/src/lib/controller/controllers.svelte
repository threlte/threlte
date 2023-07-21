<script lang='ts'>

import { createRawEventDispatcher } from '@threlte/core'
import Controller from './controller.svelte'
import type { XREvent } from '../types'

export let modelLeft: THREE.Object3D | undefined = undefined
export let modelRight: THREE.Object3D | undefined = undefined

type $$Events = {
  connected: XREvent<'connected'>
  disconnected: XREvent<'disconnected'>
  select: XREvent<'select'>
  selectstart: XREvent<'selectstart'>
  selectend: XREvent<'selectend'>
  squeeze: XREvent<'squeeze'>
  squeezeend: XREvent<'squeezeend'>
  squeezestart: XREvent<'squeezestart'>
}

const dispatch = createRawEventDispatcher<$$Events>()
const handedness: ['left' | 'right' | undefined, 'left' | 'right' | undefined] = [undefined, undefined]

const handleXrEvent = (event: XREvent) => {
  dispatch(event.type, event)
}

const setHandedness = (index: number, event: XREvent<'connected'>) => {
  handedness[index] = event.data.handedness
}

</script>

<Controller
  model={modelLeft}
  index={0}
  on:connected={(event) => {
    setHandedness(0, event)
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
  {#if handedness[0] === 'left'}
    <slot name='left' />
  {:else if handedness[0] === 'right'}
    <slot name='right' />
  {/if}
</Controller>

<Controller
  model={modelRight}
  index={1}
  on:connected={(event) => {
    setHandedness(1, event)
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
  {#if handedness[1] === 'left'}
    <slot name='left' />
  {:else if handedness[1] === 'right'}
    <slot name='right' />
  {/if}
</Controller>

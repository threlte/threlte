<!--
@component
`<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.

-->

<script lang='ts' context='module'>

import { onMount, onDestroy } from 'svelte'
import { T, useThrelte, createRawEventDispatcher } from '@threlte/core'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { fire } from '$lib/internal/events'
import type { XRController, XRControllerEvent } from '$lib/types'
import { isHandTracking, activeTeleportController, pendingTeleportDestination } from '$lib/internal/stores'
import { left, right, gaze } from '$lib/hooks/use-controller'
import ShortRay from '$lib/components/ray-short.svelte'

const controllerModelFactory = new XRControllerModelFactory()

const xrEvents = [
  'select',
  'selectstart',
  'selectend',
  'squeeze',
  'squeezeend',
  'squeezestart'
] as const

</script>

<script lang='ts'>

export let index: number
export let model: THREE.Object3D | 'none' | undefined = undefined

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

const dispatch = createRawEventDispatcher<$$Events>()
const { xr } =  useThrelte().renderer
const controller = xr.getController(index)
const grip = xr.getControllerGrip(index)

let connected = false

const handleConnected = (event: XRControllerEvent<'connected'>) => {
  const data = event.data!
  const xrController: XRController = { controller, grip, inputSource: data }

  connected = true

  fire('connected', event)
  dispatch('connected', event)

  switch (data.handedness) {
    case 'left': return left.set(xrController)
    case 'right': return right.set(xrController)
    case 'none': return gaze.set(xrController)
  }
}

const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
  const data = event.data!

  connected = false

  fire('disconnected', event)
  dispatch('disconnected', event)

  switch (data.handedness) {
    case 'left': return left.set(undefined)
    case 'right': return right.set(undefined)
    case 'none': return gaze.set(undefined)
  }
}

const handleXrEvent = (event: XRControllerEvent<typeof xrEvents[number]>) => {
  fire(event.type, event)
  dispatch(event.type, event)
}

onMount(() => {
  controller.addEventListener('connected', handleConnected)
  controller.addEventListener('disconnected', handleDisconnected)
  xrEvents.forEach((event) => controller.addEventListener(event, handleXrEvent))
})

onDestroy(() => {
  controller.removeEventListener('connected', handleConnected)
  controller.removeEventListener('disconnected', handleDisconnected)
  xrEvents.forEach((event) => controller.removeEventListener(event, handleXrEvent))
})

$: controllerModel = model ?? controllerModelFactory.createControllerModel(grip)

</script>

<T
  is={grip}
  name='XR Controller Grip {index}'
  visible={connected && !$isHandTracking}
>
  {#if model !== 'none'}
    <T is={controllerModel} name='XR Controller Grip Model {index}' />
  {/if}
  <slot />
</T>

<T
  is={controller}
  name='XR Controller {index}'
  visible={connected && !$isHandTracking}
>
  <ShortRay visible={
    $activeTeleportController === controller &&
    $pendingTeleportDestination === undefined
  } />
</T>

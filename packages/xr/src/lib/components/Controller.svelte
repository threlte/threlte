<!--
@component
`<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->

<script lang='ts' context='module'>
  import { T, useThrelte, createRawEventDispatcher } from '@threlte/core'
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
  import { fire } from '../internal/events'
  import type { XRControllerEvent } from '../types'
  import { isHandTracking, activeTeleportController, pendingTeleportDestination } from '../internal/stores'
  import { left as leftStore, right as rightStore, gaze } from '../hooks/useController'
  import { useControllerEvent } from '../hooks/useEvent'
  import ShortRay from '../components/ShortRay.svelte'

  const factory = new XRControllerModelFactory()

  const stores = {
    left: leftStore,
    right: rightStore,
    none: gaze,
  } as const

  let initialized = false

  const events = [
    'select',
    'selectstart',
    'selectend',
    'squeeze',
    'squeezeend',
    'squeezestart'
  ] as const

  const handleConnected = (controller: THREE.XRTargetRaySpace, grip: THREE.XRGripSpace, model: THREE.XRControllerModel) =>
    (event: XRControllerEvent<'connected'>) => {
      const data = event.data!
      fire('connected', event, { input: 'controller' })
      stores[data.handedness].set({ controller, grip, model, inputSource: data })
    }

  const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
    const data = event.data!
    fire('disconnected', event, { input: 'controller' })
    stores[data.handedness].set(undefined)
  }

  const initialize = (xr: THREE.WebXRManager) => {
    for (const index of [0, 1]) {
      const controller = xr.getController(index)
      const grip = xr.getControllerGrip(index)

      // "createControllerModel" currently only will attach a model if the "connected" event is fired,
      // so it must be called immediately before a controller connects.
      const model = factory.createControllerModel(grip)
      controller.addEventListener('connected', handleConnected(controller, grip, model))
      controller.addEventListener('disconnected', handleDisconnected)
      events.forEach((name) => controller.addEventListener(name, (event) => fire(event.type, event)))
    }

    initialized = true
  }
</script>

<script lang='ts'>
  export let left = false
  export let right = false

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
  const { xr } = useThrelte().renderer

  if (!initialized) initialize(xr)

  $: if (left && right) {
    throw new Error('A <Controller> component can only specify one hand.')
  }
  $: if (!left && !right) {
    throw new Error('A <Controller> component must specify a hand.')
  }
 
  $: store = left ? stores.left : stores.right
  $: grip = $store?.grip
  $: controller = $store?.controller
  $: model = $store?.model
  $: handedness = left ? 'left' : 'right'

  for (const type of ['connected', 'disconnected', ...events] as const) {
    useControllerEvent(type, (event) => dispatch(type, event), {
      handedness: left ? 'left' : 'right'
    })
  }
</script>

{#if !$isHandTracking}
  {#if grip}
    <T
      is={grip}
      name='XR controller grip {handedness}'
    >
      <slot>
        <T is={model} />
      </slot>

      <slot name='grip' />
    </T>
  {/if}

  {#if controller}
    <T
      is={controller}
      name='XR controller {handedness}'
      visible={!$isHandTracking}
    >
      <slot name='target-ray' />
      <ShortRay visible={
        $activeTeleportController === controller &&
        $pendingTeleportDestination === undefined
      } />
    </T>
  {/if}
{/if}

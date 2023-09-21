<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script
  lang="ts"
  context="module"
>
  import { T, createRawEventDispatcher, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
  import ShortRay from './ShortRay.svelte'
  import { gaze, left as leftStore, right as rightStore } from '../hooks/useController'
  import { activeTeleportController, pendingTeleportDestination, isHandTracking } from '../internal/stores'
  import { useHandTrackingState } from '../internal/useHandTrackingState'
  import type { XRController, XRControllerEvent } from '../types'
  import type { XRTargetRaySpace } from 'three'

  const factory = new XRControllerModelFactory()

  const stores = {
    left: leftStore,
    right: rightStore,
    none: gaze
  } as const

  const events = [
    'select',
    'selectstart',
    'selectend',
    'squeeze',
    'squeezeend',
    'squeezestart'
  ] as const

  const eventMap = new WeakMap<XRTargetRaySpace, Omit<XRController, 'inputSource'>>()
</script>

<script lang="ts">
  type $$Props =
    | {
        /** Whether the controller should be matched with the left hand. */
        left: true
      }
    | {
        /** Whether the controller should be matched with the right hand. */
        right: true
      }

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

  $: if (left && right) {
    throw new Error('A <Controller> component can only specify one hand.')
  }
  $: if (!left && !right) {
    throw new Error('A <Controller> component must specify a hand.')
  }

  $: handedness = (left ? 'left' : 'right') as 'left' | 'right'

  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const handTrackingNow = useHandTrackingState()

  const handleEvent = (event: XRControllerEvent) => {
    if (!handTrackingNow()) {
      dispatch(event.type, event)
    }
  }

  const handleConnected = (event: XRControllerEvent<'connected'>) => {
    const data = event.data as XRInputSource
    const targetData = eventMap.get(event.target)

    if (data.handedness !== handedness || !targetData) return

    stores[data.handedness].set({ ...targetData, inputSource: data })

    if (!handTrackingNow()) {
      dispatch('connected', event)
    }

    events.forEach((name) => event.target.addEventListener(name, handleEvent))
  }

  const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
    if (event.data!.handedness !== handedness) return

    stores[event.data!.handedness].set(undefined)

    if (!$isHandTracking) {
      dispatch('disconnected', event)
    }

    events.forEach((name) => event.target.removeEventListener(name, handleEvent))
  }

  for (const index of [0, 1]) {
    const controller = xr.getController(index)
    const grip = xr.getControllerGrip(index)

    // "createControllerModel" currently only will attach a model if the "connected" event is fired,
    // so it must be called immediately before a controller connects.
    const model = factory.createControllerModel(grip)

    eventMap.set(controller, { targetRay: controller, model, grip })

    /**
     * @todo(mp) event.data is missing from @three/types. Need to make a PR there.
    */
    controller.addEventListener('connected', handleConnected as any)
    controller.addEventListener('disconnected', handleDisconnected as any)
  }

  $: store = left ? stores.left : stores.right
  $: grip = $store?.grip
  $: targetRay = $store?.targetRay
  $: model = $store?.model

  onDestroy(() => {
    for (const index of [0, 1]) {
      const controller = xr.getController(index)
      controller.removeEventListener('connected', handleConnected as any)
      controller.removeEventListener('disconnected', handleDisconnected as any)
    }

    const controller = $store?.targetRay
    events.forEach((name) => controller?.removeEventListener(name, handleEvent as any))

    store.set(undefined)
  })
</script>

{#if !$isHandTracking}
  {#if grip}
    <T
      is={grip}
      name="XR controller grip {handedness}"
    >
      <slot>
        <T is={model} />
      </slot>

      <slot name="grip" />
    </T>
  {/if}

  {#if targetRay}
    <T
      is={targetRay}
      name="XR controller {handedness}"
      visible={!$isHandTracking}
    >
      <slot name="target-ray" />
      <ShortRay
        visible={$activeTeleportController === targetRay &&
          $pendingTeleportDestination === undefined}
      />
    </T>
  {/if}
{/if}

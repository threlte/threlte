<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script
  lang="ts"
  context="module"
>
  import type { XRTargetRaySpace } from 'three'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
  import { onDestroy } from 'svelte'
  import { T, createRawEventDispatcher, useThrelte, useFrame } from '@threlte/core'
  import { gaze, left as leftStore, right as rightStore } from '../hooks/useController'
  import { activeTeleportController, pendingTeleportDestination, isHandTracking, hasPointerControls, hasTeleportControls } from '../internal/stores'
  import { useHandTrackingState } from '../internal/useHandTrackingState'
  import type { XRController, XRControllerEvent } from '../types'
  import { handContext } from '../plugins/teleportControls'
  import Cursor from './Cursor.svelte'
  import ShortRay from './ShortRay.svelte'
  
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
        right?: undefined
        hand?: undefined
      }
    | {
        /** Whether the controller should be matched with the right hand. */
        right: true
        left?: undefined
        hand?: undefined
      }
    | {
        /** Whether the controller should be matched with the left or right hand. */
        hand: 'left' | 'right'
        left?: undefined
        right?: undefined
      }

  export let left: $$Props['left'] = undefined
  export let right: $$Props['right'] = undefined
  export let hand: $$Props['hand'] = undefined

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

  $: handedness = (left ? 'left' : right ? 'right' : hand) as 'left' | 'right'

  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const handTrackingNow = useHandTrackingState()

  let lineGeometry = new LineGeometry()

  const handleEvent = (event: XRControllerEvent) => {
    if (!handTrackingNow()) {
      dispatch(event.type, event)
    }
  }

  const handleConnected = (event: XRControllerEvent<'connected'>) => {
    const targetData = eventMap.get(event.target)

    if (event.data.handedness !== handedness || !targetData) return

    stores[handedness].set({ ...targetData, inputSource: event.data })

    if (!handTrackingNow()) {
      dispatch('connected', event)
    }

    events.forEach((name) => event.target.addEventListener(name, handleEvent))
  }

  const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
    if (event.data.handedness !== handedness) return

    stores[handedness].set(undefined)

    if (!$isHandTracking) {
      dispatch('disconnected', event)
    }

    events.forEach((name) => event.target.removeEventListener(name, handleEvent))
  }

  for (const index of [0, 1]) {
    const targetRay = xr.getController(index)
    const grip = xr.getControllerGrip(index)

    // "createControllerModel" currently only will attach a model if the "connected" event is fired,
    // so it must be called immediately before a controller connects.
    const model = factory.createControllerModel(grip)

    eventMap.set(targetRay, { targetRay, model, grip })

    /**
     * @todo(mp) event.data is missing from @three/types. Need to make a PR there.
    */
    targetRay.addEventListener('connected', handleConnected as any)
    targetRay.addEventListener('disconnected', handleDisconnected as any)
  }

  $: store = stores[handedness]
  $: grip = $store?.grip
  $: targetRay = $store?.targetRay
  $: model = $store?.model
  $: isControllerTeleporting = (
    $activeTeleportController === targetRay &&
    $pendingTeleportDestination === undefined
  )
  $: teleportSurface = handContext[handedness].hovered

  const { start, stop } = useFrame(() => {
    lineGeometry.setPositions(positions)
  }, { autostart: false })

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
    >
      <slot name="target-ray" />

      <slot name="pointer-ray">
        <ShortRay
          visible={$hasPointerControls || isControllerTeleporting}
        />
      </slot>
    </T>
  {/if}
{/if}

{#if $hasPointerControls}
  <T.Group>
    <slot name='pointer-cursor'>
      <Cursor />
    </slot>
  </T.Group>
{/if}

{#if $hasTeleportControls}
  <slot name='teleport-ray'>
    <T is={Line2}
      {...$$restProps}
      position.z={-0.01}
    >
      <T is={lineGeometry} />
      <T is={LineMaterial}
        color='white'
        linewidth={0.004}
      />
    </T>    
  </slot>

  <slot name='teleport-cursor'>
    <T.Mesh
      visible={$teleportSurface !== undefined}
      position.x={$teleportSurface?.point.x}
      position.y={$teleportSurface?.point.y}
      position.z={$teleportSurface?.point.z}
    >
      {@const innerRadius = 0.175}
      {@const outerRadius = 0.2}
      {@const thetaSegments = 32}
      <T.RingGeometry
        args={[innerRadius, outerRadius, thetaSegments]}
        on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
      />
      <T.MeshBasicMaterial
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </T.Mesh>
  </slot>
{/if}
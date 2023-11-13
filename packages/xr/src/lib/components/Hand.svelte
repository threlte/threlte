<script lang='ts' context='module'>
  import { onDestroy } from 'svelte'
  import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
  import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
  import type { XRHandEvent } from '../types'
  import { isHandTracking } from '../internal/stores'
  import { useHandTrackingState } from '../internal/useHandTrackingState'
  import { left as leftStore, right as rightStore } from '../hooks/useHand'
  
  const factory = new XRHandModelFactory()

  const stores = {
    left: leftStore,
    right: rightStore,
  } as const

  const eventMap = new WeakMap()
</script>

<script lang='ts'>
  import ScenePortal from "./internal/ScenePortal.svelte"

  type $$Props =
    | {
        /** Whether the XRHand should be matched with the left hand. */
        left: true
        right?: undefined
        hand?: undefined
      }
    | {
        /** Whether the XRHand should be matched with the right hand. */
        right: true
        left?: undefined
        hand?: undefined
      }
    | {
        /** Whether the XRHand should be matched with the left or right hand. */
        hand: 'left' | 'right'
        left?: undefined
        right?: undefined
      }
  
  export let left: $$Props['left'] = undefined
  export let right: $$Props['right'] = undefined
  export let hand: $$Props['hand'] = undefined

  type $$Events = {
    connected: XRHandEvent<'connected'>
    disconnected: XRHandEvent<'disconnected'>
    pinchstart: XRHandEvent<'pinchstart'>
    pinchend: XRHandEvent<'pinchend'>
  }

  const handTrackingNow = useHandTrackingState()
  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const space = xr.getReferenceSpace()

  $: handedness = (left ? 'left' : right ? 'right' : hand) as 'left' | 'right'

  const handleConnected = (event: XRHandEvent<'connected'>) => {
    if (event.data.handedness !== handedness) return

    stores[handedness].set({ ...eventMap.get(event.target), inputSource: event.data.hand })

    if (handTrackingNow()) {
      dispatch('connected', event)
    }
  
    /**
     * @todo(mp) event.handedness is missing from @three/types. Need to make a PR there.
    */
    event.target.addEventListener('pinchstart', handlePinchEvent as any)
    event.target.addEventListener('pinchend', handlePinchEvent as any)
  }

  const handleDisconnected = (event: XRHandEvent<'disconnected'>) => {
    if (event.data.handedness !== handedness) return

    stores[handedness].set(undefined)

    if ($isHandTracking) {
      dispatch('disconnected', event)
    }

    event.target.removeEventListener('pinchstart', handlePinchEvent as any)
    event.target.removeEventListener('pinchend', handlePinchEvent as any)
  }

  const handlePinchEvent = (event: XRHandEvent<'pinchstart' | 'pinchend'>) => {
    dispatch(event.type, event)
  }

  let children: THREE.Group

  /**
   * Currently children of a hand XRSpace or model will not
   * move relative to their parent, so this hack of checking wrist position
   * and syncing any slots is used.
   * 
   * @todo(mp) investigate why this is happening and see if there's
   * a way to just parent to the hand to avoid this.
   */
  const { start, stop } = useFrame(() => {
    const frame = xr.getFrame()
    const joint = inputSource!.get('wrist' as unknown as number)

    if (joint === undefined || space === null) return 

    const pose = frame.getJointPose?.(joint, space)

    // This isn't correctly typed by @types/xr. Pose can also be null.
    if (pose === undefined || pose === null) return

    const { position, orientation } = pose.transform
    children.position.set(position.x, position.y, position.z)
    children.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
  }, { autostart: false })

  $: if (($$slots.wrist || $$slots.default) && inputSource) {
    start()
  } else {
    stop()
  }

  $: store = stores[handedness]
  $: inputSource = $store?.inputSource
  $: model = $store?.model

  for (const index of [0, 1]) {
    const hand = xr.getHand(index)
    const model = factory.createHandModel(hand, 'mesh')

    eventMap.set(hand, { hand, model })

    /**
     * @todo(mp) event.data is missing from @three/types. Need to make a PR there.
    */
    hand.addEventListener('connected', handleConnected as any)
    hand.addEventListener('disconnected', handleDisconnected as any)
  }

  onDestroy(() => {
    for (const index of [0, 1]) {
      const hand = xr.getHand(index)
      hand.removeEventListener('connected', handleConnected as any)
      hand.removeEventListener('disconnected', handleDisconnected as any)
    }

    const hand = stores[handedness].current?.hand

    hand?.removeEventListener('pinchstart', handlePinchEvent as any)
    hand?.removeEventListener('pinchend', handlePinchEvent as any)

    stores[handedness].set(undefined)
  })
</script>

{#if $store?.hand}
  <T
    is={$store.hand}
    name='XR hand {handedness}'
  >
    {#if $$slots.default === undefined}
      <T is={model} />
    {/if}
  </T>
{/if}

<ScenePortal>
  <T.Group bind:ref={children}>
    <slot name='wrist' />
    <slot />
  </T.Group>
</ScenePortal>

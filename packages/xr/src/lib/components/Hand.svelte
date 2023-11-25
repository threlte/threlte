<script lang='ts' context='module'>
  import { Group } from 'three'
  import { T, useThrelte, createRawEventDispatcher, useFrame, watch } from '@threlte/core'
  import type { XRHandEvent } from '../types'
  import { isHandTracking, handDispatchers } from '../internal/stores'
  import { left as leftStore, right as rightStore } from '../hooks/useHand'
  import ScenePortal from "./internal/ScenePortal.svelte"
  import { writable } from 'svelte/store'
  
  const stores = {
    left: leftStore,
    right: rightStore,
  } as const
</script>

<script lang='ts'>

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

  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const space = xr.getReferenceSpace()

  const handedness = writable<'left' | 'right'>(left ? 'left' : right ? 'right' : hand)
  $: handedness.set(left ? 'left' : right ? 'right' : hand as 'left' | 'right')
  $: handDispatchers[$handedness].set(dispatch)

  const handleDisconnected = (event: XRHandEvent<'disconnected'>) => {
    stores[$handedness].set(undefined)

    if ($isHandTracking) {
      dispatch('disconnected', event)
    }
  }

  const handlePinchEvent = (event: XRHandEvent<'pinchstart' | 'pinchend'>) => {
    dispatch(event.type, event)
  }

  let children: Group

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

  $: if ($isHandTracking && ($$slots.wrist || $$slots.default) && inputSource) {
    start()
  } else {
    stop()
  }

  watch([stores.left, stores.right, handedness], ([_, __, handedness]) => {
    const store = stores[handedness]

    if (!store.current) return

    const { hand } = store.current
    hand.addEventListener('disconnected', handleDisconnected as any)
    hand.addEventListener('pinchstart', handlePinchEvent as any)
    hand.addEventListener('pinchend', handlePinchEvent as any)
    return () => {
      hand.removeEventListener('disconnected', handleDisconnected as any)
      hand.removeEventListener('pinchstart', handlePinchEvent as any)
      hand.removeEventListener('pinchend', handlePinchEvent as any)
    }
  })

  $: store = stores[$handedness]
  $: inputSource = $store?.inputSource
  $: model = $store?.model
</script>

{#if $store?.hand && $isHandTracking}
  <T is={$store.hand}>
    {#if $$slots.default === undefined}
      <T is={model} />
    {/if}
  </T>

  <T is={$store.targetRay}>
    <T.Mesh>
      <T.CylinderGeometry args={[0.01, 0.01, 0.1]} />
    </T.Mesh>
  </T>
{/if}

{#if $isHandTracking}
  <ScenePortal>
    <T.Group bind:ref={children}>
      <slot name='wrist' />
      <slot />
    </T.Group>
  </ScenePortal>
{/if}

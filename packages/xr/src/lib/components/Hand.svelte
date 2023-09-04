<script lang='ts' context='module'>
  import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
  import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
  import type { XRHandEvent } from '../types'
  import { fire } from '../internal/events'
  import { left as leftStore, right as rightStore } from '../hooks/useHand'
  import { useHandEvent } from '../hooks/useEvent'
  import { onDestroy } from 'svelte'

  const factory = new XRHandModelFactory()

  const stores = {
    left: leftStore,
    right: rightStore,
  } as const

  const eventMap = new WeakMap()
</script>

<script lang='ts'>
  /** Whether the XRHand should be matched with the left hand. */
  export let left = false

  /** Whether the XRHand should be matched with the right hand. */
  export let right = false

  type $$Events = {
    connected: XRHandEvent<'connected', null>
    disconnected: XRHandEvent<'disconnected', null>
    pinchstart: XRHandEvent<'pinchstart', THREE.XRHandSpace>
    pinchend: XRHandEvent<'pinchend', THREE.XRHandSpace>
  }

  const dispatch = createRawEventDispatcher<$$Events>()
  const { xr } = useThrelte().renderer
  const space = xr.getReferenceSpace()

  $: if (left && right) {
    throw new Error('A <Hand> component can only specify one hand.')
  }
  $: if (!left && !right) {
    throw new Error('A <Hand> component must specify a hand.')
  }
  $: handedness = left ? 'left' : 'right'

  const handleConnected = (event: XRHandEvent<'connected', null>) => {
    const inputSource = event.data.hand as globalThis.XRHand
    const eventHandedness = event.data.handedness as 'left' | 'right'
    if (eventHandedness !== handedness) return
    stores[handedness].set({ ...eventMap.get(event.target), inputSource })
    fire('connected', event, { input: 'hand' })
  }

  const handleDisconnected = (event: XRHandEvent<'disconnected', null>) => {
    const eventHandedness = event.data.handedness as 'left' | 'right'
    if (eventHandedness !== handedness) return
    stores[handedness].set(undefined)
    fire('disconnected', event, { input: 'hand' })
  }

  const handlePinchEvent = (event: XRHandEvent<'pinchstart' | 'pinchend', THREE.XRHandSpace>) => {
    fire(event.type, event)
  }

  for (const index of [0, 1]) {
    const hand = xr.getHand(index)
    const model = factory.createHandModel(hand, 'mesh')

    eventMap.set(hand, { hand, model })

    hand.addEventListener('connected', handleConnected)
    hand.addEventListener('disconnected', handleDisconnected)
    hand.addEventListener('pinchstart', handlePinchEvent)
    hand.addEventListener('pinchend', handlePinchEvent)
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

  $: store = left ? stores.left : stores.right
  $: hand = $store?.hand
  $: inputSource = $store?.inputSource
  $: model = $store?.model

  const handEvents = [
    'connected',
    'disconnected',
    'pinchstart',
    'pinchend'
  ] as const

  for (const name of handEvents) {
    useHandEvent(name, (event) => dispatch(name, event), {
      handedness: left ? 'left' : 'right'
    })
  }

  onDestroy(() => {
    for (const index of [0, 1]) {
      const hand = xr.getHand(index)
      hand.removeEventListener('connected', handleConnected)
      hand.removeEventListener('disconnected', handleDisconnected)
      hand.removeEventListener('pinchstart', handlePinchEvent)
      hand.removeEventListener('pinchend', handlePinchEvent)
    }
  })
</script>

{#if hand}
  <T
    is={hand}
    name='XR hand {handedness}'
  >
    {#if $$slots.default === undefined}
      <T is={model} />
    {/if}
    <T.Group bind:ref={children}>
      <slot name='wrist' />
      <slot />
    </T.Group>
  </T>
{/if}

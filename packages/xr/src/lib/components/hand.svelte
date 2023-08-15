<script lang='ts' context='module'>

import { onMount, onDestroy } from 'svelte'
import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import type { XRHandEvent } from '$lib/types'
import { fire } from '$lib/internal/events'
import { left, right } from '$lib/hooks/use-hand'

const handModelFactory = new XRHandModelFactory()

</script>

<script lang='ts'>

export let index: number

export let profile: 'mesh' | 'spheres' | 'boxes' | 'none' = 'mesh'


type $$Events = {
  connected: XRHandEvent<'connected', null>
  disconnected: XRHandEvent<'disconnected', null>
  pinchstart: XRHandEvent<'pinchstart', THREE.XRHandSpace>
  pinchend: XRHandEvent<'pinchend', THREE.XRHandSpace>
}

const dispatch = createRawEventDispatcher<$$Events>()
const { xr } = useThrelte().renderer
const hand = xr.getHand(index)
const space = xr.getReferenceSpace()
const model = handModelFactory.createHandModel(hand, profile === 'none' ? 'mesh' : profile)

let connected = false
let inputSource: XRHand | undefined
let children: THREE.Group

const handleConnected = (event: XRHandEvent<'connected', null>) => {
  inputSource = event.data.hand as globalThis.XRHand
  connected = true

  dispatch(event.type, event)

  const xrHand = { hand, inputSource }

  switch (event.data.handedness) {
    case 'left': return left.set(xrHand)
    case 'right': return right.set(xrHand)
  }
}

const handleDisconnected = (event: XRHandEvent<'disconnected', null>) => {
  inputSource = event.data.hand
  connected = false

  dispatch(event.type, event)
}

const handlePinchEvent = (event: XRHandEvent<'pinchstart' | 'pinchend', THREE.XRHandSpace>) => {
  dispatch(event.type, event)
  fire(event.type, event)
}

const { start, stop } = useFrame(() => {
  const frame = xr.getFrame()
  const joint = inputSource?.get('wrist' as unknown as number)

  if (joint === undefined || space === null) return 

  const pose = frame.getJointPose?.(joint, space)

  // This isn't correctly typed by @types/xr. Pose can also be null.
  if (pose === undefined || pose === null) return

  const { position, orientation } = pose.transform
  children.position.set(position.x, position.y, position.z)
  children.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
}, { autostart: false })

$: if ($$slots.default) {
  start()
} else {
  stop()
}

onMount(() => {
  hand.addEventListener('connected', handleConnected)
  hand.addEventListener('disconnected', handleDisconnected)
  hand.addEventListener('pinchstart', handlePinchEvent)
  hand.addEventListener('pinchend', handlePinchEvent)
})

onDestroy(() => {
  hand.removeEventListener('connected', handleConnected)
  hand.removeEventListener('disconnected', handleDisconnected)
  hand.removeEventListener('pinchstart', handlePinchEvent)
  hand.removeEventListener('pinchend', handlePinchEvent)
})

</script>

<T
  is={hand}
  name='XR Hand {index}'
  visible={connected}
>
  {#if profile !== 'none'}
    <T is={model} name='XR Hand Model {index}' />
  {/if}

  <T.Group bind:ref={children}>
    <slot />
  </T.Group>
</T>

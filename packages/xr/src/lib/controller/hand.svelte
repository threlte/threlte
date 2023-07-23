<script lang='ts' context='module'>

import { onMount, onDestroy } from 'svelte'
import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import type { XRHandEvent } from '$lib/types'
import { fire } from '$lib/events'
import { left, right } from '$lib/hooks/use-hand'

const handModelFactory = new XRHandModelFactory()

</script>

<script lang='ts'>

export let index: number

export let profile: 'mesh' | 'spheres' | 'boxes' | 'none' = 'mesh'

type $$Events = {
  connected: XRHandEvent<'connected'>
  disconnected: XRHandEvent<'disconnected'>
  pinchstart: XRHandEvent<'pinchstart'>
  pinchend: XRHandEvent<'pinchend'>
}

type ConnectionEvent<Type> = THREE.Event & { type: Type } & { target: THREE.XRHandSpace }

const dispatch = createRawEventDispatcher<$$Events>()

const { renderer } = useThrelte()
const { xr } = renderer!

const hand = xr.getHand(index)
const space = xr.getReferenceSpace()
const model = handModelFactory.createHandModel(hand, profile === 'none' ? 'mesh' : profile)

let connected = false
let inputSource: globalThis.XRHand | undefined
let children: THREE.Group

const handleConnected = (event: ConnectionEvent<'connected'>) => {
  inputSource = event.data.hand as XRHand
  connected = true

  dispatch(event.type, event)

  const xrHand = { hand, inputSource }

  switch (event.data.handedness) {
    case 'left': return left.set(xrHand)
    case 'right': return right.set(xrHand)
  }
}

const handleDisconnected = (event: ConnectionEvent<'disconnected'>) => {
  inputSource = event.data.hand
  connected = false

  dispatch(event.type, event)
}

const handlePinchEvent = (event: XRHandEvent) => {
  dispatch(event.type, event)
  fire(event.type, event)
}

const { start, stop } = useFrame(() => {
  const frame = xr.getFrame()
  const joint = inputSource?.get('wrist' as unknown as number)

  if (joint === undefined || space === null) return 

  const pose = frame.getJointPose?.(joint, space)

  if (pose === undefined) return

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

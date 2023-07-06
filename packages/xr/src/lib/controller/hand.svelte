<script lang='ts' context='module'>

import { onMount, onDestroy } from 'svelte'
import { T, useThrelte, createRawEventDispatcher, useFrame } from '@threlte/core'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import type { XRHandEvent } from '$lib/types'
import { fire } from '$lib/events'

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

const dispatch = createRawEventDispatcher<$$Events>()

const { renderer } = useThrelte()
const hand = renderer!.xr.getHand(index)
const model = handModelFactory.createHandModel(hand, profile === 'none' ? 'mesh' : profile)

let connected = false
let inputSource: XRHand | undefined

const handleConnectionUpdate = (event: XRHandEvent) => {
  inputSource = event.data.hand
  connected = event.type === 'connected'
  hand.visible = connected
  dispatch(event.type, event)
}

const handlePinchEvent = (event: XRHandEvent) => {
  dispatch(event.type, event)
  fire(event.type, event)
}

onMount(() => {
  hand.addEventListener('connected', handleConnectionUpdate)
  hand.addEventListener('disconnected', handleConnectionUpdate)
  hand.addEventListener('pinchstart', handlePinchEvent)
  hand.addEventListener('pinchend', handlePinchEvent)
})

onDestroy(() => {
  hand.removeEventListener('connected', handleConnectionUpdate)
  hand.removeEventListener('disconnected', handleConnectionUpdate)
  hand.removeEventListener('pinchstart', handlePinchEvent)
  hand.removeEventListener('pinchend', handlePinchEvent)
})

const space = renderer!.xr.getReferenceSpace()

let children: THREE.Group

const { start, stop } = useFrame(() => {
  const frame = renderer!.xr.getFrame()
  const joint = inputSource?.get('wrist' as unknown as number)

  if (joint === undefined || space === null) return 

  const pose = frame?.getJointPose?.(joint, space)

  if (pose === undefined) return

  const { position, orientation } = pose.transform
  children.position.set(position.x, position.y, position.z)
  children.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
}, { autostart: false })

$: if ($$slots.default) { start() } else { stop() }

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



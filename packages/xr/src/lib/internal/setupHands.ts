import type { Event, XRHandSpace } from 'three'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import { hands } from '../hooks/useHand.svelte.js'
import { useHandTrackingState } from './useHandTrackingState.js'
import type { XRHandEvent, XRHandEvents } from '../types.js'
import { handEvents } from './state.svelte.js'

export const setupHands = () => {
  const factory = new XRHandModelFactory()
  const { xr } = useThrelte().renderer
  const hasHands = useHandTrackingState()
  const handSpaces = [xr.getHand(0), xr.getHand(1)]
  const map = new Map()

  handSpaces.forEach((handSpace, index) => {
    map.set(handSpace, {
      hand: handSpace,
      targetRay: xr.getController(index),
      model: factory.createHandModel(handSpace, 'mesh')
    })
  })

  onMount(() => {
    const dispatch = (event: Event) => {
      if (!hasHands()) return
      const handEvent = event as unknown as
        | { handedness: 'left' | 'right' }
        | { data: { handedness: 'left' | 'right' } }
      const handedness =
        'handedness' in handEvent ? handEvent.handedness : handEvent.data.handedness
      handEvents[handedness]?.[`on${event.type}` as keyof XRHandEvents]?.(event as any)
    }

    function handleConnected(this: XRHandSpace, event: XRHandEvent<'connected'>) {
      const { model, targetRay } = map.get(this)
      const { data } = event
      const { handedness, hand: inputSource } = data

      if (handedness === 'none' || inputSource === undefined) {
        return
      }

      hands[handedness] = {
        hand: this,
        model,
        inputSource,
        targetRay
      }

      dispatch(event)
    }

    const handleDisconnected = (event: XRHandEvent<'disconnected'>) => {
      dispatch(event)
      hands[event.data.handedness as 'left' | 'right'] = undefined
    }

    for (const handSpace of handSpaces) {
      handSpace.addEventListener('connected', handleConnected)
      handSpace.addEventListener('disconnected', handleDisconnected)
      handSpace.addEventListener('pinchstart', dispatch)
      handSpace.addEventListener('pinchend', dispatch)
    }

    return () => {
      for (const handSpace of handSpaces) {
        handSpace.removeEventListener('connected', handleConnected)
        handSpace.removeEventListener('disconnected', handleDisconnected)
        handSpace.removeEventListener('pinchstart', dispatch)
        handSpace.removeEventListener('pinchend', dispatch)
      }

      hands.left = undefined
      hands.right = undefined
    }
  })
}

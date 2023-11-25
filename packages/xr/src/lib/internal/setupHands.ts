import type { XRHandSpace, Group } from 'three'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import { left, right } from '../hooks/useHand'
import { useHandTrackingState } from './useHandTrackingState'
import type { XRHandEvent } from '../types'
import { handDispatchers } from './stores'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'

export const setupHands = () => {
  const factory = new XRHandModelFactory()
  const stores = { left, right } as const
  const { xr } = useThrelte().renderer
  const handSpace0 = xr.getHand(0)
  const handSpace1 = xr.getHand(1)
  const hasHands = useHandTrackingState()

  const map = new Map()
  map.set(handSpace0, {
    index: 0,
    hand: handSpace0,
    model: factory.createHandModel(handSpace0 as unknown as Group, 'mesh')
  })
  map.set(handSpace1, {
    index: 1,
    hand: handSpace1,
    model: factory.createHandModel(handSpace1 as unknown as Group, 'mesh')
  })

  onMount(() => {
    function handleConnected (this: XRHandSpace, event: XRHandEvent) {
      const hand = this
      const { index, model } = map.get(this)
      const { data } = event as { data: {
        handedness: 'left' | 'right'
        hand: XRHand
      } }
      const { handedness, hand: inputSource } = data

      stores[handedness].set({
        hand,
        model,
        inputSource,
        targetRay: xr.getController(index),
        grip: xr.getControllerGrip(index)
      })

      if (hasHands()) {
        handDispatchers[handedness]?.current?.('connected', event)
      }
    }  

    handSpace0.addEventListener('connected', handleConnected as any)
    handSpace1.addEventListener('connected', handleConnected as any)

    return () => {
      handSpace0.removeEventListener('connected', handleConnected as any)
      handSpace1.removeEventListener('connected', handleConnected as any)
      stores.left.set(undefined)
      stores.right.set(undefined)
    }
  })
}

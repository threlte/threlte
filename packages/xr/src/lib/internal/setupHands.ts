import type { XRHandSpace } from 'three'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import { left, right } from '../hooks/useHand'
import { useHandTrackingState } from './useHandTrackingState'
import type { XRHandEvent } from '../types'
import { handDispatchers } from './stores'
import { createHandModel } from './handModelFactory'

const stores = { left, right } as const

export const setupHands = () => {
  const { xr } = useThrelte().renderer
  const hand0 = xr.getHand(0)
  const hand1 = xr.getHand(1)
  const hasHands = useHandTrackingState()

  onMount(() => {
    function handleConnected (this: XRHandSpace, event: XRHandEvent) {
      const hand = this
      const handedness = event.data.handedness as 'left' | 'right'
      const model = createHandModel(hand, event)
      const inputSource = event.data.hand
      
      stores[handedness].set({ hand, model, inputSource })

      if (hasHands()) {
        handDispatchers[handedness]?.current?.('connected', event)
      }
    }  

    hand0.addEventListener('connected', handleConnected as any)
    hand1.addEventListener('connected', handleConnected as any)

    return () => {
      hand0.removeEventListener('connected', handleConnected as any)
      hand1.removeEventListener('connected', handleConnected as any)
      stores.left.set(undefined)
      stores.right.set(undefined)
    }
  })
}

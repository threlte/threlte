import type { XRTargetRaySpace, Event } from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import { useHandTrackingState } from './useHandTrackingState'
import type { XRControllerEvent, XRControllerEvents } from '../types'
import { gaze, left, right } from '../hooks/useController'
import { controllerEvents } from './stores'

export const setupControllers = () => {
  const factory = new XRControllerModelFactory()
  const stores = { left, right, none: gaze } as const
  const { xr } = useThrelte().renderer
  const hasHands = useHandTrackingState()
  const controllers = [xr.getController(0), xr.getController(1)]
  const indexMap = new Map()

  controllers.forEach((targetRay, index) => {
    indexMap.set(targetRay, {
      targetRay,
      grip: xr.getControllerGrip(index),
      model: factory.createControllerModel(targetRay)
    })
  })

  onMount(() => {
    const dispatch = (event: Event) => {
      if (hasHands()) return
      const { data } = event as unknown as { data: { handedness: 'left' | 'right' } }
      controllerEvents[data.handedness]?.current?.[`on${event.type}` as keyof XRControllerEvents]?.(
        event
      )
    }

    function handleConnected(this: XRTargetRaySpace, event: XRControllerEvent<'connected'>) {
      const { model, targetRay, grip } = indexMap.get(this)
      const { data: inputSource } = event

      stores[event.data.handedness].set({
        inputSource,
        targetRay,
        grip,
        model
      })

      dispatch(event)
    }

    const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
      dispatch(event)
      stores[event.data.handedness].set(undefined)
    }

    for (const targetRay of controllers) {
      targetRay.addEventListener('connected', handleConnected)
      targetRay.addEventListener('disconnected', handleDisconnected)
      targetRay.addEventListener('select', dispatch)
      targetRay.addEventListener('selectstart', dispatch)
      targetRay.addEventListener('selectend', dispatch)
      targetRay.addEventListener('squeeze', dispatch)
      targetRay.addEventListener('squeezestart', dispatch)
      targetRay.addEventListener('squeezeend', dispatch)
    }

    return () => {
      for (const targetRay of controllers) {
        targetRay.removeEventListener('connected', handleConnected)
        targetRay.removeEventListener('disconnected', handleDisconnected)
        targetRay.removeEventListener('select', dispatch)
        targetRay.removeEventListener('selectstart', dispatch)
        targetRay.removeEventListener('selectend', dispatch)
        targetRay.removeEventListener('squeeze', dispatch)
        targetRay.removeEventListener('squeezestart', dispatch)
        targetRay.removeEventListener('squeezeend', dispatch)
      }

      stores.left.set(undefined)
      stores.right.set(undefined)
      stores.none.set(undefined)
    }
  })
}

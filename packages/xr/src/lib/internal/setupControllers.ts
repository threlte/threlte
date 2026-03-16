import type { XRTargetRaySpace, Event } from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import { useHandTrackingState } from './useHandTrackingState.js'
import type { XRControllerEvent, XRControllerEvents } from '../types.js'
import { controllers } from '../hooks/useController.svelte.js'
import { controllerEvents } from './state.svelte.js'

export const setupControllers = () => {
  const factory = new XRControllerModelFactory()
  const { xr } = useThrelte().renderer
  const hasHands = useHandTrackingState()
  const targetRaySpaces = [xr.getController(0), xr.getController(1)]
  const indexMap = new Map()

  targetRaySpaces.forEach((targetRay, index) => {
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
      controllerEvents[data.handedness]?.[`on${event.type}` as keyof XRControllerEvents]?.(
        event as any
      )
    }

    function handleConnected(this: XRTargetRaySpace, event: XRControllerEvent<'connected'>) {
      const { model, targetRay, grip } = indexMap.get(this)
      const { data: inputSource } = event

      controllers[event.data.handedness] = {
        inputSource,
        targetRay,
        grip,
        model
      }

      dispatch(event)
    }

    const handleDisconnected = (event: XRControllerEvent<'disconnected'>) => {
      dispatch(event)
      controllers[event.data.handedness] = undefined
    }

    for (const targetRay of targetRaySpaces) {
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
      for (const targetRay of targetRaySpaces) {
        targetRay.removeEventListener('connected', handleConnected)
        targetRay.removeEventListener('disconnected', handleDisconnected)
        targetRay.removeEventListener('select', dispatch)
        targetRay.removeEventListener('selectstart', dispatch)
        targetRay.removeEventListener('selectend', dispatch)
        targetRay.removeEventListener('squeeze', dispatch)
        targetRay.removeEventListener('squeezestart', dispatch)
        targetRay.removeEventListener('squeezeend', dispatch)
      }

      controllers.left = undefined
      controllers.right = undefined
      controllers.none = undefined
    }
  })
}

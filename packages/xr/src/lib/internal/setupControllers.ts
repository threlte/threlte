import type { XRTargetRaySpace, Event } from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import { useThrelte } from '@threlte/core'
import { onMount } from 'svelte'
import type { XRControllerEvent, XRControllerEvents } from '../types.js'
import { controllers } from '../hooks/useController.svelte.js'
import { controllerEvents } from './state.svelte.js'

export const setupControllers = (factory?: XRControllerModelFactory) => {
  const { xr } = useThrelte().renderer
  const targetRaySpaces = [xr.getController(0), xr.getController(1)]
  const indexMap = new Map()
  const modelFactory = factory ?? new XRControllerModelFactory()

  targetRaySpaces.forEach((targetRay, index) => {
    indexMap.set(targetRay, {
      targetRay,
      grip: xr.getControllerGrip(index),
      model: modelFactory.createControllerModel(targetRay)
    })
  })

  onMount(() => {
    const dispatch = (event: Event) => {
      const { data } = event as unknown as { data: XRInputSource }
      if (data.hand !== undefined) return
      const key = `on${event.type}` as keyof XRControllerEvents
      for (const events of controllerEvents[data.handedness]) {
        events[key]?.(event as any)
      }
    }

    function handleConnected(this: XRTargetRaySpace, event: XRControllerEvent<'connected'>) {
      const { data: inputSource } = event

      // The targetRaySpace 'connected' event fires for both controller and
      // hand-tracking input sources. The controllers slot represents a physical
      // controller — setupHands handles the hand-tracking side.
      if (inputSource.hand) return

      const { model, targetRay, grip } = indexMap.get(this)

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

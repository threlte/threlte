<script lang="ts">
  import { createRawEventDispatcher, useParent, useThrelte, watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Camera, Renderer } from 'three'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
  import { useControlsContext } from '../useControlsContext'
  import type { TransformControlsEvents, TransformControlsProps } from './TransformControls.svelte'

  type $$Props = TransformControlsProps
  type $$Events = TransformControlsEvents

  export let autoPauseOrbitControls: $$Props['autoPauseOrbitControls'] = true
  export let mode: $$Props['mode'] = undefined
  export let axis: $$Props['axis'] = null
  export let dragging: $$Props['dragging'] = false
  export let enabled: $$Props['enabled'] = undefined
  export let translationSnap: $$Props['translationSnap'] = undefined
  export let scaleSnap: $$Props['scaleSnap'] = undefined
  export let rotationSnap: $$Props['rotationSnap'] = undefined
  export let showX: $$Props['showX'] = undefined
  export let showY: $$Props['showY'] = undefined
  export let showZ: $$Props['showZ'] = undefined
  export let size: $$Props['size'] = undefined
  export let space: $$Props['space'] = undefined

  const { camera, renderer, invalidate, scene } = useThrelte()
  const parent = useParent()
  if (!$parent)
    throw new Error('TransformControls: parent not defined. Is this component a child of <Canvas>?')

  const dispatch = createRawEventDispatcher<$$Events>()

  const { orbitControls } = useControlsContext()
  const isDragging = writable(false)
  const useAutoPauseOrbitControls = writable(autoPauseOrbitControls) ?? true
  $: useAutoPauseOrbitControls.set(autoPauseOrbitControls ?? true)

  watch(
    [orbitControls, isDragging, useAutoPauseOrbitControls],
    ([orbitControls, isDragging, useAutoPauseOrbitControls]) => {
      // if there are no orbitcontrols or we're not even
      // dragging, or the orbitcontrols are disabled, return
      if (!orbitControls || (!orbitControls.enabled && isDragging)) return
      orbitControls.enabled = !(isDragging && useAutoPauseOrbitControls)
      return () => {
        // we know they were enabled before, so we can
        // safely re-enable them
        orbitControls.enabled = true
      }
    }
  )

  const eventMap: Record<string, (e: any) => void> = {
    change: (e) => {
      invalidate('TransformControls: change event')
      dispatch('change', e)
    },
    'camera-changed': (e) => dispatch('camera-changed', e),
    'object-changed': (e) => dispatch('object-changed', e),
    'enabled-changed': (e) => dispatch('enabled-changed', e),
    'axis-changed': (e) => {
      axis = e.value
      dispatch('axis-changed', e)
    },
    'mode-changed': (e) => dispatch('mode-changed', e),
    'translationSnap-changed': (e) => dispatch('translationSnap-changed', e),
    'rotationSnap-changed': (e) => dispatch('rotationSnap-changed', e),
    'scaleSnap-changed': (e) => dispatch('scaleSnap-changed', e),
    'space-changed': (e) => dispatch('space-changed', e),
    'size-changed': (e) => dispatch('size-changed', e),
    'dragging-changed': (e) => {
      isDragging.set(e.value)
      dispatch('dragging-changed', e)
    },
    'showX-changed': (e) => dispatch('showX-changed', e),
    'showY-changed': (e) => dispatch('showY-changed', e),
    'showZ-changed': (e) => dispatch('showZ-changed', e),
    'worldPosition-changed': (e) => dispatch('worldPosition-changed', e),
    'worldPositionStart-changed': (e) => dispatch('worldPositionStart-changed', e),
    'worldQuaternion-changed': (e) => dispatch('worldQuaternion-changed', e),
    'worldQuaternionStart-changed': (e) => dispatch('worldQuaternionStart-changed', e),
    'cameraPosition-changed': (e) => dispatch('cameraPosition-changed', e),
    'cameraQuaternion-changed': (e) => dispatch('cameraQuaternion-changed', e),
    'pointStart-changed': (e) => dispatch('pointStart-changed', e),
    'pointEnd-changed': (e) => dispatch('pointEnd-changed', e),
    'rotationAxis-changed': (e) => dispatch('rotationAxis-changed', e),
    'rotationAngle-changed': (e) => dispatch('rotationAngle-changed', e),
    'eye-changed': (e) => dispatch('eye-changed', e),
    mouseDown: () => dispatch('mouseDown'),
    mouseUp: () => dispatch('mouseUp'),
    objectChange: () => dispatch('objectChange')
  }

  if (!renderer) {
    throw new Error(
      'TransformControls: renderer is undefined, is this component a child of <Canvas>?'
    )
  }

  let transformControls: TransformControls | undefined = undefined

  export const reset = () => transformControls?.reset()

  $: if (mode !== undefined) transformControls?.setMode(mode)
  $: if (enabled !== undefined && transformControls) transformControls.enabled = enabled
  $: if (translationSnap !== undefined) transformControls?.setTranslationSnap(translationSnap)
  $: if (scaleSnap !== undefined) transformControls?.setScaleSnap(scaleSnap)
  $: if (rotationSnap !== undefined) transformControls?.setRotationSnap(rotationSnap)
  $: if (showX !== undefined && transformControls) transformControls.showX = showX
  $: if (showY !== undefined && transformControls) transformControls.showY = showY
  $: if (showZ !== undefined && transformControls) transformControls.showZ = showZ
  $: if (size !== undefined) transformControls?.setSize(size)
  $: if (space !== undefined) transformControls?.setSpace(space)

  // The TransformControls are depending on the camera, so we need to watch that.
  watch(camera, (camera) => {
    if (!$parent) {
      throw new Error(
        'TransformControls: parent not defined. Is this component a child of <Canvas>?'
      )
    }

    const transformControls = new TransformControls(camera, renderer.domElement)

    // add events
    Object.entries(eventMap).forEach(([key, fn]) => {
      transformControls.addEventListener(key, fn)
    })

    // TransformControls need to be added to the scene …
    scene.add(transformControls)
    // … and *attached* to the parent object
    transformControls.attach($parent)

    return () => {
      transformControls.detach()
      transformControls.dispose()
      scene.remove(transformControls)

      Object.entries(eventMap).forEach(([key, fn]) => {
        transformControls.removeEventListener(key, fn)
      })
    }
  })
</script>

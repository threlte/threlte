<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { get } from 'svelte/store'
  import type { Camera, Object3D, Quaternion, Vector3 } from 'three'
  import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
  import { useOnStoreChange } from '../hooks/useOnStoreChange'
  import { useThrelte } from '../hooks/useThrelte'
  import { useParent } from '../internal/HierarchicalObject.svelte'
  import LayerableObject from '../internal/LayerableObject.svelte'
  import { getThrelteUserData } from '../lib/getThrelteUserData'
  import type { TransformControlsProperties } from '../types/components'

  export let autoPauseOrbitControls: TransformControlsProperties['autoPauseOrbitControls'] = true
  export let mode: TransformControlsProperties['mode'] = undefined
  export let axis: TransformControlsProperties['axis'] = null
  export let dragging: TransformControlsProperties['dragging'] = false
  export let enabled: TransformControlsProperties['enabled'] = undefined
  export let translationSnap: TransformControlsProperties['translationSnap'] = undefined
  export let scaleSnap: TransformControlsProperties['scaleSnap'] = undefined
  export let rotationSnap: TransformControlsProperties['rotationSnap'] = undefined
  export let showX: TransformControlsProperties['showX'] = undefined
  export let showY: TransformControlsProperties['showY'] = undefined
  export let showZ: TransformControlsProperties['showZ'] = undefined
  export let size: TransformControlsProperties['size'] = undefined
  export let space: TransformControlsProperties['space'] = undefined

  const { camera, renderer, invalidate, scene } = useThrelte()
  const parent = useParent()
  if (!$parent)
    throw new Error('TransformControls: parent not defined. Is this component a child of <Canvas>?')

  const dispatch = createEventDispatcher<{
    change: void
    'camera-changed': {
      type: 'camera-changed'
      value: Camera
    }
    'object-changed': {
      type: 'object-changed'
      value: Object3D
    }
    'enabled-changed': {
      type: 'enabled-changed'
      value: boolean
    }
    'axis-changed': {
      type: 'axis-changed'
      value: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null
    }
    'mode-changed': {
      type: 'mode-changed'
      value: 'translate' | 'rotate' | 'scale'
    }
    'translationSnap-changed': {
      type: 'translationSnap-changed'
      value: number
    }
    'rotationSnap-changed': {
      type: 'rotationSnap-changed'
      value: number
    }
    'scaleSnap-changed': {
      type: 'scaleSnap-changed'
      value: number
    }
    'space-changed': {
      type: 'space-changed'
      value: 'world' | 'local'
    }
    'size-changed': {
      type: 'size-changed'
      value: number
    }
    'dragging-changed': {
      type: 'dragging-changed'
      value: boolean
    }
    'showX-changed': {
      type: 'showX-changed'
      value: boolean
    }
    'showY-changed': {
      type: 'showY-changed'
      value: boolean
    }
    'showZ-changed': {
      type: 'showZ-changed'
      value: boolean
    }
    'worldPosition-changed': {
      type: 'worldPosition-changed'
      value: Vector3
    }
    'worldPositionStart-changed': {
      type: 'worldPositionStart-changed'
      value: Vector3
    }
    'worldQuaternion-changed': {
      type: 'worldQuaternion-changed'
      value: Quaternion
    }
    'worldQuaternionStart-changed': {
      type: 'worldQuaternionStart-changed'
      value: Quaternion
    }
    'cameraPosition-changed': {
      type: 'cameraPosition-changed'
      value: Vector3
    }
    'cameraQuaternion-changed': {
      type: 'cameraQuaternion-changed'
      value: Quaternion
    }
    'pointStart-changed': {
      type: 'pointStart-changed'
      value: Vector3
    }
    'pointEnd-changed': {
      type: 'pointEnd-changed'
      value: Vector3
    }
    'rotationAxis-changed': {
      type: 'rotationAxis-changed'
      value: Vector3
    }
    'rotationAngle-changed': {
      type: 'rotationAngle-changed'
      value: number
    }
    'eye-changed': {
      type: 'eye-changed'
      value: Vector3
    }
    mouseDown: void
    mouseUp: void
    objectChange: void
  }>()

  const maybeGetCameraOrbitControls = (): OrbitControls | undefined => {
    if (!$camera) return
    return getThrelteUserData($camera).orbitControls as OrbitControls | undefined
  }

  let enabledStateBeforeAutoPause: boolean | undefined
  const cleanupAutoPause = () => {
    if (enabledStateBeforeAutoPause !== undefined) {
      const orbitControls = maybeGetCameraOrbitControls()
      if (orbitControls) orbitControls.enabled = enabledStateBeforeAutoPause
      enabledStateBeforeAutoPause = undefined
    }
  }
  $: if (!autoPauseOrbitControls) cleanupAutoPause()
  onDestroy(cleanupAutoPause)

  const eventMap: Record<string, (e: any) => void> = {
    change: (e) => {
      /**
       * Inform parent object that it's being transformed
       * This is currently only important for <Instance> components
       * as they rely on a proxy Object3D instance.
       * The event handler is set by <TransformableObject>.
       * Not the best solution but quite efficient.
       */
      if ($parent) getThrelteUserData($parent).onTransform?.()
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
      dragging = e.value
      autopause: {
        if (autoPauseOrbitControls) {
          const orbitControls = maybeGetCameraOrbitControls()
          if (!orbitControls) break autopause
          const shouldBeEnabled = !e.value
          if (orbitControls.enabled === shouldBeEnabled) break autopause
          enabledStateBeforeAutoPause = orbitControls.enabled
          orbitControls.enabled = shouldBeEnabled
        }
      }
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
    'eye-changed': (e) => dispatch('eye-changed', e)
  }

  if (!renderer)
    throw new Error(
      'TransformControls: renderer is undefined, is this component a child of <Canvas>?'
    )

  const transformControls = new TransformControls($camera, renderer.domElement)

  export const reset = () => transformControls.reset()

  $: if (mode !== undefined) transformControls.setMode(mode)
  $: if (enabled !== undefined) transformControls.enabled = enabled
  $: if (translationSnap !== undefined) transformControls.setTranslationSnap(translationSnap)
  $: if (scaleSnap !== undefined) transformControls.setScaleSnap(scaleSnap)
  $: if (rotationSnap !== undefined) transformControls.setRotationSnap(rotationSnap)
  $: if (showX !== undefined) transformControls.showX = showX
  $: if (showY !== undefined) transformControls.showY = showY
  $: if (showZ !== undefined) transformControls.showZ = showZ
  $: if (size !== undefined) transformControls.setSize(size)
  $: if (space !== undefined) transformControls.setSpace(space)

  transformControls.attach($parent)

  const addListeners = () => {
    Object.entries(eventMap).forEach(([key, fn]) => {
      transformControls.addEventListener(key, fn)
    })
  }

  const removeListeners = () => {
    Object.entries(eventMap).forEach(([key, fn]) => {
      transformControls.removeEventListener(key, fn)
    })
  }

  addListeners()

  scene.add(transformControls)

  onDestroy(() => {
    transformControls.detach()
    scene.remove(transformControls)
    removeListeners()
    transformControls.dispose()
  })
</script>

<LayerableObject object={transformControls} />

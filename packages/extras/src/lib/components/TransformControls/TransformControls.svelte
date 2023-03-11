<script lang="ts">
  import {
    createRawEventDispatcher,
    useParent,
    useThrelte,
    useThrelteUserContext
  } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
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

  const maybeGetCameraOrbitControls = (): OrbitControls | undefined => {
    if (!$camera) return
    if ($camera.userData && $camera.userData.orbitControls) {
      return $camera.userData.orbitControls as OrbitControls
    }
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
          if (e.value) {
            // only save the state if we're actually pausing
            enabledStateBeforeAutoPause = orbitControls.enabled
          }
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
    transformControls.dispose()
    scene.remove(transformControls)
    removeListeners()
  })
</script>

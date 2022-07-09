<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Camera, Object3D } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import { useParent } from '../internal/HierarchicalObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import { getThrelteUserData } from '../lib/getThrelteUserData'
  import type { OrbitControlsProperties } from '../types/components'

  export let autoRotate: OrbitControlsProperties['autoRotate'] = undefined
  export let autoRotateSpeed: OrbitControlsProperties['autoRotateSpeed'] = undefined
  export let dampingFactor: OrbitControlsProperties['dampingFactor'] = undefined
  export let enableDamping: OrbitControlsProperties['enableDamping'] = undefined
  export let enabled: OrbitControlsProperties['enabled'] = undefined
  export let enablePan: OrbitControlsProperties['enablePan'] = undefined
  export let enableRotate: OrbitControlsProperties['enableRotate'] = undefined
  export let enableZoom: OrbitControlsProperties['enableZoom'] = undefined
  export let keyPanSpeed: OrbitControlsProperties['keyPanSpeed'] = undefined
  export let keys: OrbitControlsProperties['keys'] = undefined
  export let maxAzimuthAngle: OrbitControlsProperties['maxAzimuthAngle'] = undefined
  export let maxDistance: OrbitControlsProperties['maxDistance'] = undefined
  export let maxPolarAngle: OrbitControlsProperties['maxPolarAngle'] = undefined
  export let maxZoom: OrbitControlsProperties['maxZoom'] = undefined
  export let minAzimuthAngle: OrbitControlsProperties['minAzimuthAngle'] = undefined
  export let minDistance: OrbitControlsProperties['minDistance'] = undefined
  export let minPolarAngle: OrbitControlsProperties['minPolarAngle'] = undefined
  export let minZoom: OrbitControlsProperties['minZoom'] = undefined
  export let mouseButtons: OrbitControlsProperties['mouseButtons'] = undefined
  export let panSpeed: OrbitControlsProperties['panSpeed'] = undefined
  export let rotateSpeed: OrbitControlsProperties['rotateSpeed'] = undefined
  export let screenSpacePanning: OrbitControlsProperties['screenSpacePanning'] = undefined
  export let touches: OrbitControlsProperties['touches'] = undefined
  export let zoomSpeed: OrbitControlsProperties['zoomSpeed'] = undefined
  export let target: OrbitControlsProperties['target'] = undefined

  const parent = useParent()

  const { renderer, invalidate } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

  if (!($parent instanceof Camera)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  const dispatch = createEventDispatcher<{
    change: undefined
    start: undefined
    end: undefined
  }>()

  const onChange = () => {
    invalidate('Orbitcontrols: change event')
    dispatch('change')
  }
  const onStart = () => dispatch('start')
  const onEnd = () => dispatch('end')

  export const controls = new ThreeOrbitControls($parent, renderer.domElement)
  getThrelteUserData($parent).orbitControls = controls

  controls.addEventListener('change', onChange)
  controls.addEventListener('start', onStart)
  controls.addEventListener('end', onEnd)

  onDestroy(() => {
    if ($parent) {
      delete getThrelteUserData($parent).orbitControls
    }
    controls.removeEventListener('change', onChange)
    controls.removeEventListener('start', onStart)
    controls.removeEventListener('end', onEnd)
  })

  $: {
    if (autoRotate !== undefined) controls.autoRotate = autoRotate
    if (autoRotateSpeed !== undefined) controls.autoRotateSpeed = autoRotateSpeed
    if (dampingFactor !== undefined) controls.dampingFactor = dampingFactor
    if (enableDamping !== undefined) controls.enableDamping = enableDamping
    if (enabled !== undefined) controls.enabled = enabled
    if (enablePan !== undefined) controls.enablePan = enablePan
    if (enableRotate !== undefined) controls.enableRotate = enableRotate
    if (enableZoom !== undefined) controls.enableZoom = enableZoom
    if (keyPanSpeed !== undefined) controls.keyPanSpeed = keyPanSpeed
    if (keys !== undefined) controls.keys = keys
    if (maxAzimuthAngle !== undefined) controls.maxAzimuthAngle = maxAzimuthAngle
    if (maxDistance !== undefined) controls.maxDistance = maxDistance
    if (maxPolarAngle !== undefined) controls.maxPolarAngle = maxPolarAngle
    if (maxZoom !== undefined) controls.maxZoom = maxZoom
    if (minAzimuthAngle !== undefined) controls.minAzimuthAngle = minAzimuthAngle
    if (minDistance !== undefined) controls.minDistance = minDistance
    if (minPolarAngle !== undefined) controls.minPolarAngle = minPolarAngle
    if (minZoom !== undefined) controls.minZoom = minZoom
    if (mouseButtons !== undefined) controls.mouseButtons = mouseButtons
    if (panSpeed !== undefined) controls.panSpeed = panSpeed
    if (rotateSpeed !== undefined) controls.rotateSpeed = rotateSpeed
    if (screenSpacePanning !== undefined) controls.screenSpacePanning = screenSpacePanning
    if (touches !== undefined) controls.touches = touches
    if (zoomSpeed !== undefined) controls.zoomSpeed = zoomSpeed
    controls.update()
    invalidate('OrbitControls: props changed')
  }

  const { start, stop } = useFrame(() => controls.update(), {
    autostart: false,
    debugFrameloopMessage: 'OrbitControlts: updating controls'
  })

  $: {
    if (autoRotate || enableDamping) start()
    else stop()
  }

  const targetObject = new Object3D()

  const updateControls = () => {
    controls.target = targetObject.position
    controls.update()
    invalidate('OrbitControls: target changed')
  }

  onDestroy(() => {
    controls.dispose()
    invalidate('OrbitControls: onDestroy')
  })
</script>

<TransformableObject on:transform={updateControls} object={targetObject} position={target} />

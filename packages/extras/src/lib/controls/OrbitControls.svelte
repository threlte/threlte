<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Camera, Object3D } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import {
    useFrame,
    useParent,
    useThrelte,
    DisposableObject,
    TransformableObject
  } from '@threlte/core'
  import { getThrelteUserData } from '../../../../core/src/lib/lib/getThrelteUserData'
  import type { OrbitControlsProps } from './OrbitControls.svelte'

  type $$Props = OrbitControlsProps

  export let autoRotate: $$Props['autoRotate'] = undefined
  export let autoRotateSpeed: $$Props['autoRotateSpeed'] = undefined
  export let dampingFactor: $$Props['dampingFactor'] = undefined
  export let enableDamping: $$Props['enableDamping'] = undefined
  export let enabled: $$Props['enabled'] = undefined
  export let enablePan: $$Props['enablePan'] = undefined
  export let enableRotate: $$Props['enableRotate'] = undefined
  export let enableZoom: $$Props['enableZoom'] = undefined
  export let keyPanSpeed: $$Props['keyPanSpeed'] = undefined
  export let keys: $$Props['keys'] = undefined
  export let maxAzimuthAngle: $$Props['maxAzimuthAngle'] = undefined
  export let maxDistance: $$Props['maxDistance'] = undefined
  export let maxPolarAngle: $$Props['maxPolarAngle'] = undefined
  export let maxZoom: $$Props['maxZoom'] = undefined
  export let minAzimuthAngle: $$Props['minAzimuthAngle'] = undefined
  export let minDistance: $$Props['minDistance'] = undefined
  export let minPolarAngle: $$Props['minPolarAngle'] = undefined
  export let minZoom: $$Props['minZoom'] = undefined
  export let mouseButtons: $$Props['mouseButtons'] = undefined
  export let panSpeed: $$Props['panSpeed'] = undefined
  export let rotateSpeed: $$Props['rotateSpeed'] = undefined
  export let screenSpacePanning: $$Props['screenSpacePanning'] = undefined
  export let touches: $$Props['touches'] = undefined
  export let zoomSpeed: $$Props['zoomSpeed'] = undefined
  export let target: $$Props['target'] = undefined
  export let dispose: $$Props['dispose'] = undefined

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
    debugFrameloopMessage: 'OrbitControls: updating controls'
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
</script>

<DisposableObject
  {dispose}
  object={controls}
/>

<TransformableObject
  on:transform={updateControls}
  object={targetObject}
  position={target}
/>

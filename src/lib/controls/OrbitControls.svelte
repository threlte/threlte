<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Camera, Object3D } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import { getParent } from '../internal/HierarchicalObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import type { OrbitControlsProps } from '../types/components'

  export let autoRotate: OrbitControlsProps['autoRotate'] = undefined
  export let autoRotateSpeed: OrbitControlsProps['autoRotateSpeed'] = undefined
  export let dampingFactor: OrbitControlsProps['dampingFactor'] = undefined
  export let enableDamping: OrbitControlsProps['enableDamping'] = undefined
  export let enabled: OrbitControlsProps['enabled'] = undefined
  export let enablePan: OrbitControlsProps['enablePan'] = undefined
  export let enableRotate: OrbitControlsProps['enableRotate'] = undefined
  export let enableZoom: OrbitControlsProps['enableZoom'] = undefined
  export let keyPanSpeed: OrbitControlsProps['keyPanSpeed'] = undefined
  export let keys: OrbitControlsProps['keys'] = undefined
  export let maxAzimuthAngle: OrbitControlsProps['maxAzimuthAngle'] = undefined
  export let maxDistance: OrbitControlsProps['maxDistance'] = undefined
  export let maxPolarAngle: OrbitControlsProps['maxPolarAngle'] = undefined
  export let maxZoom: OrbitControlsProps['maxZoom'] = undefined
  export let minAzimuthAngle: OrbitControlsProps['minAzimuthAngle'] = undefined
  export let minDistance: OrbitControlsProps['minDistance'] = undefined
  export let minPolarAngle: OrbitControlsProps['minPolarAngle'] = undefined
  export let minZoom: OrbitControlsProps['minZoom'] = undefined
  export let mouseButtons: OrbitControlsProps['mouseButtons'] = undefined
  export let panSpeed: OrbitControlsProps['panSpeed'] = undefined
  export let rotateSpeed: OrbitControlsProps['rotateSpeed'] = undefined
  export let screenSpacePanning: OrbitControlsProps['screenSpacePanning'] = undefined
  export let touches: OrbitControlsProps['touches'] = undefined
  export let zoomSpeed: OrbitControlsProps['zoomSpeed'] = undefined
  export let target: OrbitControlsProps['target'] = undefined

  const parent = getParent()
  const { renderer, render } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

  if (!(parent instanceof Camera)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  export const controls = new ThreeOrbitControls(parent, renderer.domElement)

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
    render('OrbitControls: props changed')
  }

  useFrame(() => {
    controls.update()
  })

  const targetObject = new Object3D()

  $: if (target) {
    controls.target = targetObject.position
    controls.update()
    render('OrbitControls: target changed')
  }

  onDestroy(() => {
    controls.dispose()
    render('OrbitControls: onDestroy')
  })
</script>

<TransformableObject
  object={targetObject}
  position={target}
  rotation={undefined}
  scale={undefined}
  lookAt={undefined}
/>

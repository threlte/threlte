<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Camera, MOUSE, Object3D, TOUCH } from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import { getParent } from '../internal/HierarchicalObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import type { Position } from '../types/types'

  export let autoRotate: boolean = false
  export let autoRotateSpeed: number = 2
  export let dampingFactor: number = 0.05
  export let enableDamping: boolean = false
  export let enabled: boolean = true
  export let enablePan: boolean = true
  export let enableRotate: boolean = true
  export let enableZoom: boolean = true
  export let keyPanSpeed: number = 7
  export let keys: OrbitControls['keys'] = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    BOTTOM: 'ArrowDown'
  }
  export let maxAzimuthAngle: number = Infinity
  export let maxDistance: number = Infinity
  export let maxPolarAngle: number = Math.PI
  export let maxZoom: number = Infinity
  export let minAzimuthAngle: number = Infinity
  export let minDistance: number = 0
  export let minPolarAngle: number = 0
  export let minZoom: number = 0
  export let mouseButtons: OrbitControls['mouseButtons'] = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.PAN
  }
  export let panSpeed: number = 1
  export let rotateSpeed: number = 1
  export let screenSpacePanning: boolean = true
  export let touches: OrbitControls['touches'] = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }
  export let zoomSpeed: number = 1
  export let target: Position | undefined = undefined

  const parent = getParent()
  const { renderer, render } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

  if (!(parent instanceof Camera)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  export const controls = new OrbitControls(parent, renderer.domElement)

  $: {
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = autoRotateSpeed
    controls.dampingFactor = dampingFactor
    controls.enableDamping = enableDamping
    controls.enabled = enabled
    controls.enablePan = enablePan
    controls.enableRotate = enableRotate
    controls.enableZoom = enableZoom
    controls.keyPanSpeed = keyPanSpeed
    controls.keys = keys
    controls.maxAzimuthAngle = maxAzimuthAngle
    controls.maxDistance = maxDistance
    controls.maxPolarAngle = maxPolarAngle
    controls.maxZoom = maxZoom
    controls.minAzimuthAngle = minAzimuthAngle
    controls.minDistance = minDistance
    controls.minPolarAngle = minPolarAngle
    controls.minZoom = minZoom
    controls.mouseButtons = mouseButtons
    controls.panSpeed = panSpeed
    controls.rotateSpeed = rotateSpeed
    controls.screenSpacePanning = screenSpacePanning
    controls.touches = touches
    controls.zoomSpeed = zoomSpeed
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

{#if target}
  <TransformableObject
    object={targetObject}
    position={target}
    rotation={undefined}
    scale={undefined}
    lookAt={undefined}
  />
{/if}

<script context="module" lang="ts">
  const v1 = new Vector3()
  const v2 = new Vector3()
  const v3 = new Vector3()

  export const defaultCalculatePosition = (
    obj: Object3D,
    camera: Camera,
    size: { width: number; height: number }
  ): [number, number] => {
    const objectPos = v1.setFromMatrixPosition(obj.matrixWorld)
    objectPos.project(camera)
    const widthHalf = size.width / 2
    const heightHalf = size.height / 2
    return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf]
  }

  const isObjectBehindCamera = (el: Object3D, camera: Camera) => {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const deltaCamObj = objectPos.sub(cameraPos)
    const camDir = camera.getWorldDirection(v3)
    return deltaCamObj.angleTo(camDir) > Math.PI / 2
  }

  const isObjectVisible = (
    el: Object3D,
    camera: Camera,
    raycaster: Raycaster,
    occlude: Object3D[]
  ) => {
    const elPos = v1.setFromMatrixPosition(el.matrixWorld)
    const screenPos = elPos.clone()
    screenPos.project(camera)
    raycaster.setFromCamera(screenPos, camera)
    const intersects = raycaster.intersectObjects(occlude, true)
    if (intersects.length) {
      const intersectionDistance = intersects[0].distance
      const pointDistance = elPos.distanceTo(raycaster.ray.origin)
      return pointDistance < intersectionDistance
    }
    return true
  }

  const objectScale = (el: Object3D, camera: Camera) => {
    if (camera instanceof OrthographicCamera) {
      return camera.zoom
    } else if (camera instanceof PerspectiveCamera) {
      const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
      const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
      const vFOV = (camera.fov * Math.PI) / 180
      const dist = objectPos.distanceTo(cameraPos)
      const scaleFOV = 2 * Math.tan(vFOV / 2) * dist
      return 1 / scaleFOV
    } else {
      return 1
    }
  }

  const objectZIndex = (el: Object3D, camera: Camera, zIndexRange: Array<number>) => {
    if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
      const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
      const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
      const dist = objectPos.distanceTo(cameraPos)
      const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near)
      const B = zIndexRange[1] - A * camera.far
      return Math.round(A * dist + B)
    }
    return undefined
  }

  const epsilon = (value: number) => (Math.abs(value) < 1e-10 ? 0 : value)

  const getCSSMatrix = (matrix: Matrix4, multipliers: number[], prepend = '') => {
    let matrix3d = 'matrix3d('
    for (let i = 0; i !== 16; i++) {
      matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? ',' : ')')
    }
    return prepend + matrix3d
  }

  const getCameraCSSMatrix = ((multipliers: number[]) => {
    return (matrix: Matrix4) => getCSSMatrix(matrix, multipliers)
  })([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1])

  const getObjectCSSMatrix = ((scaleMultipliers: (n: number) => number[]) => {
    return (matrix: Matrix4, factor: number) =>
      getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)')
  })((f: number) => [
    1 / f,
    1 / f,
    1 / f,
    1,
    -1 / f,
    -1 / f,
    -1 / f,
    -1,
    1 / f,
    1 / f,
    1 / f,
    1,
    1,
    1,
    1,
    1
  ])
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { derived } from 'svelte/store'
  import {
    Camera,
    Group as ThreeGroup,
    Matrix4,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
    Raycaster,
    Vector3
  } from 'three'
  import { useFrame, useThrelte } from 'threlte'
  import { useHasEventListeners } from '../../hooks/useHasEventListeners'
  import { useThrelteRoot } from '../../hooks/useThrelteRoot'
  import Group from '../../objects/Group.svelte'
  import type { HTMLProperties } from '../types/components'

  // Group Properties
  export let position: HTMLProperties['position'] = undefined
  export let scale: HTMLProperties['scale'] = undefined
  export let rotation: HTMLProperties['rotation'] = undefined
  export let lookAt: HTMLProperties['lookAt'] = undefined
  export let viewportAware: HTMLProperties['viewportAware'] = false
  export let inViewport: HTMLProperties['inViewport'] = false

  export let transform: HTMLProperties['transform'] = false
  export let calculatePosition: HTMLProperties['calculatePosition'] = defaultCalculatePosition
  export let eps: HTMLProperties['eps'] = 0.001
  export let occlude: HTMLProperties['occlude'] = undefined
  export let zIndexRange: HTMLProperties['zIndexRange'] = [16777271, 0]
  export let sprite: HTMLProperties['sprite'] = false
  export let pointerEvents: HTMLProperties['pointerEvents'] = 'auto'
  export let center: HTMLProperties['center'] = false
  export let fullscreen: HTMLProperties['fullscreen'] = false
  export let distanceFactor: HTMLProperties['distanceFactor'] = undefined
  export let as: HTMLProperties['as'] = 'div'
  export let portal: HTMLProperties['portal'] = undefined

  const dispatch = createEventDispatcher<{
    visibilitychange: boolean
  }>()

  let group: ThreeGroup | undefined

  const { renderer, camera, scene, size } = useThrelte()

  const getCamera = (): PerspectiveCamera | OrthographicCamera => {
    if (!($camera instanceof PerspectiveCamera) && !($camera instanceof OrthographicCamera))
      throw new Error('Only PerspectiveCamera or OrthographicCamera supported for component <HTML>')
    return $camera
  }

  const { raycaster } = useThrelteRoot()

  let oldPosition = [0, 0]
  let oldZoom = 0
  export let visible = true
  let el = document.createElement(as)

  let transformOuterRef: HTMLDivElement
  let transformInnerRef: HTMLDivElement

  const { hasEventListeners } = useHasEventListeners<typeof dispatch>()

  let raytraceTarget =
    typeof occlude === 'boolean' && occlude === true
      ? [scene]
      : Array.isArray(occlude)
      ? occlude
      : undefined
  $: raytraceTarget =
    typeof occlude === 'boolean' && occlude === true
      ? [scene]
      : Array.isArray(occlude)
      ? occlude
      : undefined

  const widthHalf = derived(size, (size) => size.width / 2)
  const heightHalf = derived(size, (size) => size.height / 2)

  useFrame(() => {
    if (!group || !el) return

    const camera = getCamera()

    camera.updateMatrixWorld()
    group.updateWorldMatrix(true, false)

    const vec = transform ? oldPosition : calculatePosition(group, camera, $size)

    if (
      transform ||
      Math.abs(oldZoom - camera.zoom) > eps ||
      Math.abs(oldPosition[0] - vec[0]) > eps ||
      Math.abs(oldPosition[1] - vec[1]) > eps
    ) {
      const isBehindCamera = isObjectBehindCamera(group, camera)

      const previouslyVisible = visible
      if (raytraceTarget) {
        const isvisible = isObjectVisible(group, camera, raycaster, raytraceTarget)
        visible = isvisible && !isBehindCamera
      } else {
        visible = !isBehindCamera
      }

      if (previouslyVisible !== visible) {
        if (hasEventListeners('visibilitychange')) dispatch('visibilitychange', visible)
        else el.style.display = visible ? 'block' : 'none'
      }

      el.style.zIndex = `${objectZIndex(group, camera, zIndexRange)}`
      if (transform) {
        const fov = camera.projectionMatrix.elements[5] * $heightHalf
        const { isOrthographicCamera, top, left, bottom, right } = camera as OrthographicCamera

        let matrix = group.matrixWorld
        if (sprite) {
          matrix = camera.matrixWorldInverse
            .clone()
            .transpose()
            .copyPosition(matrix)
            .scale(group.scale)
          matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0
          matrix.elements[15] = 1
        }
        el.style.width = $size.width + 'px'
        el.style.height = $size.height + 'px'
        el.style.perspective = isOrthographicCamera ? '' : `${fov}px`
        if (transformOuterRef && transformInnerRef) {
          // prettier-ignore
          const cameraTransform = isOrthographicCamera
            ? `scale(${fov}) translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)`
            : `translateZ(${fov}px)`

          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse)

          transformOuterRef.style.transform = `${cameraTransform}${cameraMatrix}translate(${$widthHalf}px, ${$heightHalf}px)`
          transformInnerRef.style.transform = getObjectCSSMatrix(
            matrix,
            1 / ((distanceFactor || 10) / 400)
          )
        }
      } else {
        const scale = distanceFactor === undefined ? 1 : objectScale(group, camera) * distanceFactor
        el.style.transform = `translate3d(${vec[0]}px, ${vec[1]}px, 0) scale(${scale})`
      }
      oldPosition = vec
      oldZoom = camera.zoom
    }
  })

  onMount(() => {
    if (!group || transform || !el) return
    scene.updateMatrixWorld()
    const vec = calculatePosition(group, $camera, $size)
    el.style.cssText = `position: absolute; top: 0; left: 0; transform: translate3d(${vec[0]}px, ${vec[1]}px, 0); transform-origin: 0 0;`
  })

  const portalAction = (el: HTMLElement) => {
    const target = portal ?? renderer.domElement.parentElement
    target.appendChild(el)
    return {
      destroy: () => {
        if (!el.parentNode) return
        el.parentNode.removeChild(el)
      }
    }
  }
</script>

<Group
  {position}
  {scale}
  {rotation}
  {lookAt}
  {viewportAware}
  bind:group
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot name="threlte" />
</Group>

{#if transform}
  <svelte:element
    this={as}
    use:portalAction
    bind:this={el}
    style="position: absolute; top: 0; left: 0; pointer-events: none; overflow: hidden; display: block"
  >
    <div
      bind:this={transformOuterRef}
      style="position: absolute; top: 0; left: 0; width: {$size.width}px; height: {$size.height}px; transform-style: preserve-3d; pointer-events: none"
    >
      <div
        bind:this={transformInnerRef}
        style="position: absolute; pointer-events: {pointerEvents}"
      >
        <slot />
      </div>
    </div>
  </svelte:element>
{:else}
  <svelte:element this={as} bind:this={el} use:portalAction>
    <!-- prettier-ignore -->
    <div
        style={[
          'position: absolute',
          center ? 'transform: translate3d(-50%,-50%,0)' : 'transform: none',
          fullscreen && `top: ${-$heightHalf}px; left: ${-$widthHalf}px; width: ${$size.width}px; height: ${$size.height}px`
        ]
          .filter((i) => !!i)
          .join('; ')}
      >
        <slot />
      </div>
  </svelte:element>
{/if}

<script
  lang="ts"
  module
>
  let canvasModified = false
  let activeOccludeInstances = 0

  let oldZIndex = ''
  let oldPosition = ''
  let oldPointerEvents = ''

  const modifyCanvas = (canvas: HTMLCanvasElement, zIndexRange: number) => {
    if (activeOccludeInstances === 1 && !canvasModified) {
      oldZIndex = canvas.style.zIndex
      oldPosition = canvas.style.position
      oldPointerEvents = canvas.style.pointerEvents

      canvas.style.zIndex = `${Math.floor(zIndexRange / 2)}`
      canvas.style.position = 'absolute'
      canvas.style.pointerEvents = 'none'
      canvasModified = true
    } else if (activeOccludeInstances === 0 && canvasModified) {
      canvas.style.zIndex = oldZIndex
      canvas.style.position = oldPosition
      canvas.style.pointerEvents = oldPointerEvents
      canvasModified = false
    }
  }
</script>

<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'
  import {
    DoubleSide,
    Group,
    Matrix4,
    Mesh,
    type Object3D,
    type OrthographicCamera,
    type PerspectiveCamera,
    Raycaster,
    Vector3
  } from 'three'
  import { useSuspense } from '../../suspense/useSuspense.js'
  import { logFragment, logVertex, spriteVertex } from './shaders.js'
  import type { HTMLProps } from './types.js'
  import {
    defaultCalculatePosition,
    epsilon,
    getCameraCSSMatrix,
    getObjectCSSMatrix,
    getViewportFactor,
    isObjectBehindCamera,
    isObjectVisible,
    objectScale,
    objectZIndex
  } from './utils.js'

  let {
    autoRender = true,
    eps = 0.001,
    center = false,
    fullscreen = false,
    portal,
    distanceFactor,
    sprite = false,
    transform = false,
    occlude = false,
    castShadow = false,
    receiveShadow = false,
    material,
    geometry,
    zIndexRange = [16777271, 0],
    calculatePosition = defaultCalculatePosition,
    as = 'div',
    wrapperClass,
    pointerEvents = 'auto',
    ref = $bindable(),
    visible = $bindable(),
    children,
    ...props
  }: HTMLProps = $props()

  visible = true

  const { camera, scene, size, dom, canvas, renderStage } = useThrelte()

  const group = new Group()

  let element!: HTMLElement
  let oldZoom = 0
  let oldX = 0
  let oldY = 0
  let cachedZIndexNum = Number.MIN_SAFE_INTEGER
  let cachedWidth = -1
  let cachedHeight = -1
  let cachedPerspective = ''
  let cachedOuterTransform = ''
  let cachedInnerTransform = ''
  let cachedTransform = ''
  let transformOuterRef: HTMLDivElement | undefined = $state()
  let transformInnerRef: HTMLDivElement | undefined = $state()
  let isMeshSizeSet = false

  const occlusionMesh = new Mesh()
  const raycaster = new Raycaster()
  const matrix = new Matrix4()
  const viewportTarget = new Vector3()

  const isRayCastOcclusion = $derived(!!occlude && occlude !== 'blending')
  const viewportFactor = $derived(getViewportFactor($camera, viewportTarget, $size))

  // Stable zRange tuple — objectZIndex only reads zRange[0] and zRange[1].
  // Recomputes only when occlude/raycast/zIndexRange actually change.
  const zRange = $derived.by(() => {
    if (!occlude) return zIndexRange
    const halfRange = Math.floor(zIndexRange[0] / 2)
    return isRayCastOcclusion ? [zIndexRange[0], halfRange] : [halfRange - 1, 0]
  })

  $effect.pre(() => {
    if (occlude !== 'blending') return
    activeOccludeInstances += 1
    modifyCanvas(canvas, zIndexRange[0])

    return () => {
      activeOccludeInstances -= 1
      modifyCanvas(canvas, zIndexRange[0])
    }
  })

  export const render = () => {
    camera.current.updateMatrixWorld()
    group.updateWorldMatrix(true, false)
    const vec = transform ? null : calculatePosition(group, camera.current, $size)

    if (
      transform ||
      (vec &&
        (Math.abs(oldZoom - (camera.current as PerspectiveCamera).zoom) > eps ||
          Math.abs(oldX - vec[0]) > eps ||
          Math.abs(oldY - vec[1]) > eps))
    ) {
      const isBehindCamera = isObjectBehindCamera(group, camera.current)
      let raytraceTarget: null | undefined | boolean | Object3D[] = false

      if (isRayCastOcclusion) {
        if (Array.isArray(occlude)) {
          raytraceTarget = occlude as Object3D[]
        } else if (occlude !== 'blending') {
          raytraceTarget = [scene]
        }
      }

      const previouslyVisible = visible

      if (raytraceTarget) {
        const isvisible = isObjectVisible(group, camera.current, raycaster, raytraceTarget)
        visible = isvisible && !isBehindCamera
      } else {
        visible = !isBehindCamera
      }

      if (previouslyVisible !== visible) {
        if (props.onvisibilitychange) {
          props.onvisibilitychange(visible)
        } else {
          element.style.display = visible ? 'block' : 'none'
        }
      }

      const zIndexNum = objectZIndex(
        group,
        camera.current as OrthographicCamera | PerspectiveCamera,
        zRange
      )
      if (cachedZIndexNum !== zIndexNum) {
        element.style.zIndex = `${zIndexNum}`
        cachedZIndexNum = zIndexNum
      }

      if (transform && transformOuterRef && transformInnerRef) {
        const { isOrthographicCamera, top, left, bottom, right } =
          camera.current as OrthographicCamera
        const { width, height } = $size
        const halfWidth = width / 2
        const halfHeight = height / 2
        const fov = $camera.projectionMatrix.elements[5] * halfHeight
        const cameraMatrix = getCameraCSSMatrix(camera.current.matrixWorldInverse)
        const cameraTransform = isOrthographicCamera
          ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon(
              (top + bottom) / 2
            )}px)`
          : `translateZ(${fov}px)`

        if (sprite) {
          matrix
            .copy(camera.current.matrixWorldInverse)
            .transpose()
            .copyPosition(matrix)
            .scale(group.scale)
          matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0
          matrix.elements[15] = 1
        } else {
          matrix.copy(group.matrixWorld)
        }

        if (cachedWidth !== width) {
          element.style.width = `${width}px`
          cachedWidth = width
        }
        if (cachedHeight !== height) {
          element.style.height = `${height}px`
          cachedHeight = height
        }
        const perspective = isOrthographicCamera ? '' : `${fov}px`
        if (cachedPerspective !== perspective) {
          element.style.perspective = perspective
          cachedPerspective = perspective
        }
        const newOuterTransform = `${cameraTransform}${cameraMatrix}translate(${halfWidth}px,${halfHeight}px)`
        if (cachedOuterTransform !== newOuterTransform) {
          transformOuterRef.style.transform = newOuterTransform
          cachedOuterTransform = newOuterTransform
        }
        const newInnerTransform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400))
        if (cachedInnerTransform !== newInnerTransform) {
          transformInnerRef.style.transform = newInnerTransform
          cachedInnerTransform = newInnerTransform
        }
      } else if (vec) {
        const scale =
          distanceFactor === undefined ? 1 : objectScale(group, camera.current) * distanceFactor
        const newTransform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`
        if (cachedTransform !== newTransform) {
          element.style.transform = newTransform
          cachedTransform = newTransform
        }
      }

      if (vec) {
        oldX = vec[0]
        oldY = vec[1]
      }
      oldZoom = (camera.current as PerspectiveCamera).zoom
    }

    if (!isRayCastOcclusion && !isMeshSizeSet) {
      if (transform && transformOuterRef) {
        const el = transformOuterRef.children[0]

        if (el?.clientWidth && el?.clientHeight) {
          const { isOrthographicCamera } = camera.current as OrthographicCamera

          if (isOrthographicCamera || geometry) {
            const { scale } = props
            if (scale) {
              if (!Array.isArray(scale)) {
                occlusionMesh.scale.setScalar(1 / scale)
              } else {
                occlusionMesh.scale.set(1 / scale[0], 1 / scale[1], 1 / scale[2])
              }
            }
          } else {
            const ratio = (distanceFactor ?? 10) / 400
            const w = el.clientWidth * ratio
            const h = el.clientHeight * ratio

            occlusionMesh.scale.set(w, h, 1)
          }

          isMeshSizeSet = true
        }
      } else {
        const el = element.children[0]

        if (el?.clientWidth && el?.clientHeight) {
          const ratio = 1 / viewportFactor
          const w = el.clientWidth * ratio
          const h = el.clientHeight * ratio

          occlusionMesh.scale.set(w, h, 1)

          isMeshSizeSet = true
        }

        occlusionMesh.lookAt(camera.current.position)
      }
    }
  }

  useTask(render, {
    autoInvalidate: false,
    stage: renderStage,
    running: () => autoRender
  })

  $effect(() => {
    // Track $size so resize updates the DOM synchronously, ahead of the next renderStage tick.
    void $size
    untrack(render)
  })

  const portalAction = (el: HTMLElement) => {
    const target = portal ?? dom
    if (!target) {
      console.warn('<HTML>: target is undefined.')
      return
    }
    target.append(el)
    return {
      destroy: () => el.remove()
    }
  }

  const { suspended } = useSuspense()
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {#if occlude && !isRayCastOcclusion}
    <T
      is={occlusionMesh}
      {castShadow}
      {receiveShadow}
    >
      {#if geometry}
        <T is={geometry} />
      {:else}
        <T.PlaneGeometry />
      {/if}

      {#if material}
        <T is={material} />
      {:else if !transform}
        <T.ShaderMaterial
          side={DoubleSide}
          vertexShader={spriteVertex}
          fragmentShader={logFragment}
        />
      {:else}
        <T.ShaderMaterial
          side={DoubleSide}
          vertexShader={logVertex}
          fragmentShader={logFragment}
        />
      {/if}
    </T>
  {/if}
</T>

<svelte:element
  this={as}
  use:portalAction
  bind:this={element}
  class={wrapperClass}
  style:position="absolute"
  style:top="0"
  style:left="0"
  style:pointer-events={transform ? 'none' : undefined}
  style:overflow={transform ? 'hidden' : undefined}
  style:transform-origin={transform ? undefined : '0 0'}
  style:display={$suspended ? 'none' : undefined}
>
  {#if transform}
    <div
      bind:this={transformOuterRef}
      style:position="absolute"
      style:top="0"
      style:left="0"
      style:transform-style="preserve-3d"
      style:pointer-events="none"
      style:width={`${$size.width}px`}
      style:height={`${$size.height}px`}
    >
      <div
        bind:this={transformInnerRef}
        style:position="absolute"
        style:pointer-events={pointerEvents}
      >
        <div
          class={props.class}
          style={props.style}
        >
          {@render children?.({ render })}
        </div>
      </div>
    </div>
  {:else}
    <div
      style:position="absolute"
      style:transform={center ? 'translate3d(-50%,-50%,0)' : 'none'}
      style:top={fullscreen ? `${-$size.height / 2}px` : undefined}
      style:left={fullscreen ? `${-$size.width / 2}px` : undefined}
      style:width={fullscreen ? `${$size.width}px` : undefined}
      style:height={fullscreen ? `${$size.height}px` : undefined}
      style={props.style}
      class={props.class}
    >
      {@render children?.({ render })}
    </div>
  {/if}
</svelte:element>

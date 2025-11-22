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
  import {
    DoubleSide,
    Group,
    Matrix4,
    Mesh,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
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

  let element = document.createElement(as)
  let oldZoom = 0
  let oldPosition = [0, 0]
  let transformOuterRef: HTMLDivElement | undefined = $state()
  let transformInnerRef: HTMLDivElement | undefined = $state()
  let isMeshSizeSet = false

  const occlusionMesh = new Mesh()
  const raycaster = new Raycaster()

  let isRayCastOcclusion = $derived(
    (occlude && occlude !== 'blending') || (Array.isArray(occlude) && occlude.length > 0)
  )

  let matrix = new Matrix4()
  let width = $derived($size.width)
  let height = $derived($size.height)
  let halfWidth = $derived(width / 2)
  let halfHeight = $derived(height / 2)
  let fov = $derived($camera.projectionMatrix.elements[5] * halfHeight)
  let viewportFactor = $derived(getViewportFactor($camera, new Vector3(), $size))

  $effect.pre(() => {
    if (wrapperClass) element.className = wrapperClass
  })

  $effect.pre(() => {
    if (occlude === 'blending') {
      activeOccludeInstances += 1
      modifyCanvas(canvas, zIndexRange[0])
    }

    return () => {
      activeOccludeInstances -= 1
      modifyCanvas(canvas, zIndexRange[0])
    }
  })

  export const render = () => {
    camera.current.updateMatrixWorld()
    group.updateWorldMatrix(true, false)
    const vec = transform ? oldPosition : calculatePosition(group, camera.current, $size)

    if (
      transform ||
      Math.abs(oldZoom - (camera.current as PerspectiveCamera).zoom) > eps ||
      Math.abs(oldPosition[0] - vec[0]) > eps ||
      Math.abs(oldPosition[1] - vec[1]) > eps
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

      const halfRange = Math.floor(zIndexRange[0] / 2)
      const zRange = occlude
        ? isRayCastOcclusion //
          ? [zIndexRange[0], halfRange]
          : [halfRange - 1, 0]
        : zIndexRange

      element.style.zIndex = `${objectZIndex(group, camera.current as OrthographicCamera | PerspectiveCamera, zRange)}`

      if (transform && transformOuterRef && transformInnerRef) {
        const { isOrthographicCamera, top, left, bottom, right } =
          camera.current as OrthographicCamera
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

        element.style.width = `${width}px`
        element.style.height = `${height}px`
        element.style.perspective = isOrthographicCamera ? '' : `${fov}px`
        transformOuterRef.style.transform = `${cameraTransform}${cameraMatrix}translate(${halfWidth}px,${halfHeight}px)`
        transformInnerRef.style.transform = getObjectCSSMatrix(
          matrix,
          1 / ((distanceFactor || 10) / 400)
        )
      } else {
        const scale =
          distanceFactor === undefined ? 1 : objectScale(group, camera.current) * distanceFactor
        element.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`
      }
      oldPosition = vec
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

  export const { start: startRendering, stop: stopRendering } = useTask(render, {
    autoStart: false,
    autoInvalidate: false,
    stage: renderStage
  })

  $effect(() => {
    if (!autoRender) {
      return
    }

    startRendering()
    return () => {
      stopRendering()
    }
  })

  let pos = $derived.by(() => {
    scene.updateMatrixWorld()
    return calculatePosition(group, $camera, $size)
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
  style:position="absolute"
  style:top="0"
  style:left="0"
  style:pointer-events={transform ? 'none' : undefined}
  style:overflow={transform ? 'hidden' : undefined}
  style:transform={transform ? undefined : `translate3d(${pos[0]}px,${pos[1]}px,0)`}
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
      style:width={`${width}px`}
      style:height={`${height}px`}
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
          {@render children?.({ render, startRendering, stopRendering })}
        </div>
      </div>
    </div>
  {:else}
    <div
      style:position="absolute"
      style:transform={center ? 'translate3d(-50%,-50%,0)' : 'none'}
      style:top={fullscreen ? `${-height / 2}px` : undefined}
      style:left={fullscreen ? `${-width / 2}px` : undefined}
      style:width={fullscreen ? `${width}px` : undefined}
      style:height={fullscreen ? `${height}px` : undefined}
      style={props.style}
      class={props.class}
    >
      {@render children?.({ render, startRendering, stopRendering })}
    </div>
  {/if}
</svelte:element>

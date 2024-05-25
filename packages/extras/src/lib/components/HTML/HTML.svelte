<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import {
    Vector3,
    Group,
    Mesh,
    PerspectiveCamera,
    Object3D,
    DoubleSide,
    Matrix4,
    OrthographicCamera,
    Raycaster
  } from 'three'
  import {
    defaultCalculatePosition,
    epsilon,
    getCameraCSSMatrix,
    getObjectCSSMatrix,
    isObjectBehindCamera,
    isObjectVisible,
    objectScale,
    objectZIndex,
    getViewportFactor
  } from './utils'
  import { logVertex, logFragment, spriteVertex } from './shaders'
  import type { HTMLEvents, HTMLProps, HTMLSlots } from './HTML.svelte'

  type $$Events = HTMLEvents
  type $$Slots = HTMLSlots

  let {
    eps = 0.001,
    center = false,
    fullscreen = false,
    portal,
    distanceFactor,
    sprite = false,
    transform = false,
    occlude = false,
    castShadow,
    receiveShadow,
    material,
    geometry,
    zIndexRange = [16777271, 0],
    calculatePosition = defaultCalculatePosition,
    as = 'div',
    wrapperClass,
    pointerEvents = 'auto',
    ref = $bindable(),
    visible = $bindable(),
    style,
    ...props
  }: HTMLProps = $props()

  visible = true

  const { renderer, camera, scene, size } = useThrelte()

  const group = new Group()

  let element = document.createElement(as)
  let oldZoom = 0
  let oldPosition = [0, 0]
  let transformOuterRef: HTMLDivElement
  let transformInnerRef: HTMLDivElement
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

  let oldZIndex = ''

  $effect.pre(() => {
    const canvas = renderer.domElement

    if (occlude && occlude === 'blending') {
      oldZIndex = canvas.style.zIndex
      canvas.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`
      canvas.style.position = 'absolute'
      canvas.style.pointerEvents = 'none'
    } else {
      canvas.style.zIndex = oldZIndex
      canvas.style.removeProperty('position')
      canvas.style.pointerEvents = null!
    }
  })

  useTask(() => {
    camera.current.updateMatrixWorld()
    group.updateWorldMatrix(true, false)
    const vec = transform ? oldPosition : calculatePosition(group, camera.current, $size)

    if (
      transform ||
      Math.abs(oldZoom - camera.current.zoom) > eps ||
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
        if (props.$$events.visibilitychange) {
          props.$$events.visibilitychange(visible)
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

      if (transform) {
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
      oldZoom = camera.current.zoom
    }

    if (!isRayCastOcclusion && !isMeshSizeSet) {
      if (transform) {
        const el = transformOuterRef.children[0]

        console.log(el.clientWidth, el.clientHeight)
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
  })

  let pos = $derived.by(() => {
    scene.updateMatrixWorld()
    return calculatePosition(group, $camera, $size)
  })

  const portalAction = (el: HTMLElement) => {
    const target = portal ?? renderer.domElement.parentElement?.parentElement
    if (!target) {
      console.warn('<HTML>: target is undefined.')
      return
    }
    target.append(el)
    return {
      destroy: () => el.remove()
    }
  }
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
          <slot />
        </div>
      </div>
    </div>
  {:else}
    <div
      style:position="absolute"
      style:transform={center ? 'translate3d(-50%,-50%,0)' : 'none'}
      style:top={fullscreen ? `${-height / 2}px` : undefined}
      style:left={fullscreen ? `${-width / 2}px` : undefined}
      style:width={fullscreen ? `${width / 2}px` : undefined}
      style:height={fullscreen ? `${height}px` : undefined}
      style={props.style}
      class={props.class}
    >
      <slot />
    </div>
  {/if}
</svelte:element>

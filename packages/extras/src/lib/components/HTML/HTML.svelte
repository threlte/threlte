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
  import VertexShader from './vertex'
  import type { HTMLEvents, HTMLProps, HTMLSlots } from './HTML.svelte'

  type $$Events = HTMLEvents
  type $$Slots = HTMLSlots

  let {
    transform = false,
    calculatePosition = defaultCalculatePosition,
    eps = 0.001,
    occlude = false,
    zIndexRange = [16777271, 0],
    sprite = false,
    pointerEvents = 'auto',
    center = false,
    fullscreen = false,
    distanceFactor,
    as = 'div',
    castShadow,
    receiveShadow,
    material,
    geometry,
    wrapperClass,
    portal,
    onOcclude,
    ref = $bindable(),
    visible = $bindable(),
    ...props
  }: HTMLProps = $props()

  visible = true

  const group = new Group()

  const { renderer, camera, scene, size } = useThrelte()

  const raycaster = new Raycaster()

  let matrix = new Matrix4()
  let width = $derived($size.width)
  let height = $derived($size.height)
  let halfWidth = $derived(width / 2)
  let halfHeight = $derived(height / 2)
  let fov = $derived($camera.projectionMatrix.elements[5] * halfHeight)
  let viewportFactor = $derived(getViewportFactor($camera, new Vector3(), $size))

  const occlusionMesh = new Mesh()

  let element = document.createElement(as)
  let oldZoom = 0
  let oldPosition = [0, 0]
  let transformOuterRef: HTMLDivElement = null!
  let transformInnerRef: HTMLDivElement = null!
  let isMeshSizeSet = false

  let isRayCastOcclusion = $derived(
    (occlude && occlude !== 'blending') || (Array.isArray(occlude) && occlude.length > 0)
  )

  $effect(() => {
    if (wrapperClass) element.className = wrapperClass
  })

  const { start } = useTask(
    () => {
      // @todo
      // isMeshSizeSet = false

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
          if (onOcclude) onOcclude(!visible)
          else element.style.display = visible ? 'block' : 'none'
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

          if (el?.clientWidth && el?.clientHeight) {
            const { isOrthographicCamera } = camera.current as OrthographicCamera

            if (isOrthographicCamera || geometry) {
              const scale = props.scale
              if (scale) {
                if (!Array.isArray(scale)) {
                  occlusionMesh.scale.setScalar(1 / (scale as number))
                } else if (scale instanceof Vector3) {
                  occlusionMesh.scale.copy(scale.clone().divideScalar(1))
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
    },
    { autoStart: false }
  )

  $effect(() => {
    if (!transform || (transform && transformInnerRef && transformOuterRef)) {
      start()
    }
  })

  let pos = $derived(calculatePosition(group, camera.current, $size))
  let vertexShader = $derived(transform ? undefined : VertexShader)

  const portalAction = (el: HTMLElement) => {
    const target = portal ?? renderer.domElement.parentElement
    if (!target) {
      console.warn('<HTML>: target is undefined.')
      return
    }
    target.appendChild(el)
    return {
      destroy: () => {
        if (!el.parentNode) return
        el.parentNode.removeChild(el)
      }
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
        <T.PlaneGeometry />
      {/if}

      {#if material}
        <T.ShaderMaterial
          side={DoubleSide}
          {vertexShader}
          fragmentShader={`void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); }`}
        />
      {/if}
    </T>
  {/if}
</T>

<svelte:element
  this={as}
  id="el"
  use:portalAction
  bind:this={element}
  style:position="absolute"
  style:top="0"
  style:left="0"
  style:pointer-events={transform ? 'none' : 'auto'}
  style:overflow={transform ? 'hidden' : undefined}
  style:transform={transform ? undefined : `translate3d(${pos[0]}px,${pos[1]}px,0)`}
>
  {#if transform}
    <div
      bind:this={transformOuterRef}
      style:position="absolute"
      style:top="0"
      style:left="0"
      style:width={`${width}px`}
      style:height={`${height}px`}
      style:transform-style="preserve-3d"
      style:pointer-events="none"
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

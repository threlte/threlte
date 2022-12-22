<script lang="ts">
  import { T, useFrame, useThrelte, useThrelteRoot } from '@threlte/core'
  import { createEventDispatcher } from 'svelte'
  import { derived, writable, type Writable } from 'svelte/store'
  import { Group, Object3D as ThreeeObject3D, OrthographicCamera, PerspectiveCamera } from 'three'
  import { useHasEventListeners } from '../../hooks/useHasEventListeners'
  import {
    compileStyles,
    defaultCalculatePosition,
    epsilon,
    getCameraCSSMatrix,
    getObjectCSSMatrix,
    isObjectBehindCamera,
    isObjectVisible,
    objectScale,
    objectZIndex,
    updateStyles
  } from './utils'

  import type { HTMLEvents, HTMLProps, HTMLSlots } from './HTML.svelte'

  type $$Props = HTMLProps
  type $$PropsWithDefaults = Required<$$Props>
  type $$Events = HTMLEvents
  type $$Slots = HTMLSlots

  // Group Properties
  export let transform: $$PropsWithDefaults['transform'] = false
  export let calculatePosition: $$PropsWithDefaults['calculatePosition'] = defaultCalculatePosition
  export let eps: $$PropsWithDefaults['eps'] = 0.001
  export let occlude: $$PropsWithDefaults['occlude'] = false
  export let zIndexRange: $$PropsWithDefaults['zIndexRange'] = [16777271, 0]
  export let sprite: $$PropsWithDefaults['sprite'] = false
  export let pointerEvents: $$PropsWithDefaults['pointerEvents'] = 'auto'
  export let center: $$PropsWithDefaults['center'] = false
  export let fullscreen: $$PropsWithDefaults['fullscreen'] = false
  export let distanceFactor: $$Props['distanceFactor'] | undefined = undefined
  export let as: $$PropsWithDefaults['as'] = 'div'
  export let portal: $$Props['portal'] | undefined = undefined

  const dispatch = createEventDispatcher<{
    visibilitychange: boolean
  }>()

  let group: Group | undefined

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

  let styles: {
    common: {
      el: Writable<Partial<CSSStyleDeclaration>>
    }
    transform: {
      el: Writable<Partial<CSSStyleDeclaration>>
      outerRef: Writable<Partial<CSSStyleDeclaration>>
      innerRef: Writable<Partial<CSSStyleDeclaration>>
    }
    noTransform: {
      el: Writable<Partial<CSSStyleDeclaration>>
      div: Writable<Partial<CSSStyleDeclaration>>
    }
  } = {
    common: {
      el: writable({})
    },
    transform: {
      el: writable({
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        overflow: 'hidden',
        display: 'block',
        width: `${$size.width}px`,
        height: `${$size.height}px`
      }),
      outerRef: writable({
        position: 'absolute',
        top: '0',
        left: '0',
        width: `${$size.width}px`,
        height: `${$size.height}px`,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none'
      }),
      innerRef: writable({
        position: 'absolute',
        pointerEvents
      })
    },
    noTransform: {
      el: writable({}),
      div: writable({
        position: 'absolute',
        transform: center ? 'translate3d(-50%,-50%,0)' : 'none',
        top: fullscreen ? `${-$heightHalf}px` : undefined,
        left: fullscreen ? `${-$widthHalf}px` : undefined,
        width: fullscreen ? `${$size.width}px` : undefined,
        height: fullscreen ? `${$size.height}px` : undefined
      })
    }
  }

  $: updateStyles(styles.transform.el, {
    width: `${$size.width}px`,
    height: `${$size.height}px`
  })
  $: updateStyles(styles.transform.outerRef, {
    width: `${$size.width}px`,
    height: `${$size.height}px`
  })
  $: updateStyles(styles.transform.innerRef, {
    pointerEvents
  })
  $: updateStyles(styles.noTransform.div, {
    transform: center ? 'translate3d(-50%, -50%, 0)' : 'none'
  })
  $: updateStyles(styles.noTransform.div, {
    top: fullscreen ? `${-$heightHalf}px` : undefined,
    left: fullscreen ? `${-$widthHalf}px` : undefined,
    width: fullscreen ? `${$size.width}px` : undefined,
    height: fullscreen ? `${$size.height}px` : undefined
  })

  const transformElStyles = derived([styles.transform.el, styles.common.el], ([vA, vB]) => {
    return {
      ...vA,
      ...vB
    }
  })
  const transformOuterRefStyles = derived(styles.transform.outerRef, (v) => v)
  const transformInnerRefStyles = derived(styles.transform.innerRef, (v) => v)
  const noTransformElStyles = derived(styles.noTransform.el, (v) => v)
  const noTransformDivStyles = derived(styles.noTransform.div, (v) => v)

  /**
   * Check ancestor visibility
   */
  const getAncestorVisibility = (): boolean => {
    if (!group) return true
    let ancestorsAreVisible = true
    let parent: ThreeeObject3D | null = group.parent
    traverse: while (parent) {
      if ('visible' in parent && !parent.visible) {
        ancestorsAreVisible = false
        break traverse
      }
      parent = parent.parent
    }
    return ancestorsAreVisible
  }

  let showEl = getAncestorVisibility()

  useFrame(
    async () => {
      if (!group) return

      showEl = getAncestorVisibility()

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
          else {
            updateStyles(styles.common.el, {
              display: visible ? 'block' : 'none'
            })
          }
        }

        updateStyles(styles.common.el, {
          zIndex: `${objectZIndex(group, camera, zIndexRange)}`
        })
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
          updateStyles(styles.transform.el, {
            perspective: isOrthographicCamera ? '' : `${fov}px`
          })
          if (transformOuterRef && transformInnerRef) {
            // prettier-ignore
            const cameraTransform = isOrthographicCamera
            ? `scale(${fov}) translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)`
            : `translateZ(${fov}px)`

            const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse)

            updateStyles(styles.transform.outerRef, {
              transform: `${cameraTransform}${cameraMatrix}translate(${$widthHalf}px, ${$heightHalf}px)`
            })
            updateStyles(styles.transform.innerRef, {
              transform: getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400))
            })
          }
        } else {
          const scale =
            distanceFactor === undefined ? 1 : objectScale(group, camera) * distanceFactor
          updateStyles(styles.noTransform.el, {
            transform: `translate3d(${vec[0]}px, ${vec[1]}px, 0) scale(${scale})`
          })
        }
        oldPosition = vec
        oldZoom = camera.zoom
      }
    },
    {
      debugFrameloopMessage: 'HTML: tracking parent'
    }
  )

  const buildDefaultNonTransformStyles = (_: HTMLElement) => {
    if (!group || transform) return
    scene.updateMatrixWorld()
    const vec = calculatePosition(group, $camera, $size)
    updateStyles(styles.noTransform.el, {
      position: 'absolute',
      top: '0',
      left: '0',
      transform: `translate3d(${vec[0]}px, ${vec[1]}px, 0)`,
      transformOrigin: '0 0'
    })
  }

  const portalAction = (el: HTMLElement) => {
    if (!renderer) {
      console.warn('HTML: renderer is undefined. Is this component a child to <Canvas>?')
      return
    }
    const target = portal ?? renderer.domElement.parentElement
    if (!target) {
      console.warn('HTML: target is undefined.')
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

<T.Group
  bind:ref={group}
  {...$$restProps}
  let:ref
>
  <slot
    name="threlte"
    {ref}
  />
</T.Group>

{#if transform}
  <svelte:element
    this={as}
    use:portalAction
    bind:this={el}
    style={compileStyles($transformElStyles)}
  >
    <div
      bind:this={transformOuterRef}
      style={compileStyles($transformOuterRefStyles)}
    >
      <div
        bind:this={transformInnerRef}
        style={compileStyles($transformInnerRefStyles)}
      >
        {#if showEl}
          <slot />
        {/if}
      </div>
    </div>
  </svelte:element>
{:else}
  <svelte:element
    this={as}
    bind:this={el}
    use:portalAction
    use:buildDefaultNonTransformStyles
    style={compileStyles($noTransformElStyles)}
  >
    <div style={compileStyles($noTransformDivStyles)}>
      {#if showEl}
        <slot />
      {/if}
    </div>
  </svelte:element>
{/if}

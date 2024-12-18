<script lang="ts">
  import {
    currentWritable,
    useTask,
    useThrelte,
    createCameraContext,
    createSceneContext,
    createParentContext,
    createParentObject3DContext,
    createDOMContext,
    type ThrelteContext
  } from '@threlte/core'
  import { onMount, setContext } from 'svelte'
  import { Color, Vector4 } from 'three'
  import type { ViewProps } from './types'

  let { dom, children }: ViewProps = $props()

  const parentContext = useThrelte()
  const { renderer, canvas, renderStage } = useThrelte()
  const { camera } = createCameraContext()
  const { scene } = createSceneContext()
  // @ts-ignore The DOM element might not be their on creation. Can be assigned or re-assigned later
  createDOMContext({ dom })
  createParentContext(scene)
  createParentObject3DContext(scene)
  // we also want to make a new context for the user context
  const userCtx = currentWritable({})
  setContext('threlte-user-context', userCtx)

  const viewContextOverrides = {
    scene: scene,
    camera: camera
  }

  const viewContext: ThrelteContext = {
    ...parentContext,
    size: currentWritable(new DOMRect()),
    scene: viewContextOverrides.scene,
    camera: viewContextOverrides.camera
  }

  onMount(() => {
    // Only render the view scene if it has children, otherwise render the
    // default scene.
    if (!viewContextOverrides.scene.children.length) {
      viewContext.scene = parentContext.scene
      viewContext.camera = parentContext.camera
    }
  })

  setContext<ThrelteContext>('threlte', viewContext)

  const originalViewport = new Vector4()
  const originalScissor = new Vector4()
  let originalScissorTest: boolean
  const clearColor = new Color()

  function computeContainerPosition(
    canvas: HTMLCanvasElement,
    trackingElement: HTMLElement
  ): {
    position: { left: number; width: number; bottom: number; height: number }
    isOffscreen: boolean
  } {
    const trackRect = trackingElement.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()
    const { right, top, left: trackLeft, bottom: trackBottom, width, height } = trackRect

    const isOffscreen =
      trackRect.bottom < 0 ||
      top > canvasRect.height ||
      right < 0 ||
      trackRect.left > canvasRect.width

    const canvasBottom = canvasRect.top + canvasRect.height
    const bottom = canvasBottom - trackBottom
    const left = trackLeft - canvasRect.left

    return { position: { width, height, left, bottom }, isOffscreen }
  }

  useTask(
    () => {
      if (!dom) return
      const {
        position: { left, bottom, width, height },
        isOffscreen
      } = computeContainerPosition(canvas, dom)

      if (viewContext.size.current.width !== width || viewContext.size.current.height !== height) {
        viewContext.size.current = dom.getBoundingClientRect()
      }

      // save original state
      renderer.getScissor(originalScissor)
      renderer.getViewport(originalViewport)
      originalScissorTest = renderer.getScissorTest()

      // apply scissor
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)
      renderer.setScissorTest(true)

      // render or clear depending on offscreen status
      if (isOffscreen) {
        renderer.getClearColor(clearColor)
        renderer.setClearColor(clearColor, renderer.getClearAlpha())
        renderer.clear(true, true)
      } else {
        renderer.render(viewContext.scene, viewContext.camera.current)
      }

      // reset state
      renderer.setViewport(originalViewport)
      renderer.setScissor(originalScissor)
      renderer.setScissorTest(originalScissorTest)
    },
    {
      stage: renderStage
    }
  )
</script>

{@render children?.()}

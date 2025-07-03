<script lang="ts">
  import {
    createCacheContext,
    createCameraContext,
    createDOMContext,
    createParentContext,
    createParentObject3DContext,
    createSceneContext,
    createUserContext,
    type ThrelteContext,
    useTask,
    useThrelte
  } from '@threlte/core'
  import { setContext, type Snippet } from 'svelte'
  import { Vector4, WebGLRenderer } from 'three'
  import { OffscreenObserver } from './OffscreenObserver.svelte'

  let { dom, children }: { dom: HTMLElement; children: Snippet<[]> } = $props()

  const offscreenObserver = new OffscreenObserver(() => dom)

  const parentContext = useThrelte()
  const { renderer, renderStage, canvas } = parentContext

  createDOMContext({ dom, canvas: parentContext.canvas })
  createCacheContext()
  const { scene } = createSceneContext()
  createParentContext(scene)
  createParentObject3DContext(scene)
  const { camera } = createCameraContext()
  createUserContext()

  setContext<ThrelteContext<WebGLRenderer>>('threlte-context', {
    ...parentContext,
    camera,
    dom
  })

  const originalViewport = new Vector4()
  const originalScissor = new Vector4()
  let originalScissorTest: boolean

  const { start, stop } = useTask(
    Symbol('<View>'),
    () => {
      if (offscreenObserver.isOffscreen) return

      const { left: trackLeft, bottom: trackBottom, width, height } = dom.getBoundingClientRect()
      const { bottom: canvasBottom, left: canvasLeft } = canvas.getBoundingClientRect()
      const bottom = canvasBottom - trackBottom
      const left = trackLeft - canvasLeft

      // save original state
      renderer.getScissor(originalScissor)
      renderer.getViewport(originalViewport)
      originalScissorTest = renderer.getScissorTest()

      // apply scissor
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)
      renderer.setScissorTest(true)

      // render
      renderer.render(scene, camera.current)

      // reset state
      renderer.setViewport(originalViewport)
      renderer.setScissor(originalScissor)
      renderer.setScissorTest(originalScissorTest)
    },
    {
      stage: renderStage,
      autoStart: false
    }
  )

  $effect(() => {
    if (offscreenObserver.isOffscreen) {
      stop()
    } else {
      start()
    }
  })
</script>

{@render children?.()}

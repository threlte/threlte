<script lang="ts">
  import {
    createCacheContext,
    createCameraContext,
    createDOMContext,
    createParentContext,
    createParentObject3DContext,
    createSceneContext,
    createUserContext,
    useTask,
    useThrelte
  } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Vector4 } from 'three'
  import { OffscreenObserver } from './OffscreenObserver.svelte.js'

  let { dom, children }: { dom: HTMLElement; children: Snippet<[]> } = $props()

  const offscreenObserver = new OffscreenObserver(() => dom)

  const parentContext = useThrelte()

  createDOMContext({ dom, canvas: parentContext.canvas })
  createCacheContext()
  const { scene } = createSceneContext()
  createParentContext(scene)
  createParentObject3DContext(scene)
  const { camera } = createCameraContext()
  createUserContext()

  const { renderer, renderStage, canvas } = useThrelte()

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

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
  import { Scene, Vector4 } from 'three'

  let {
    dom,
    scene: providedScene,
    children
  }: { dom: HTMLElement; scene?: Scene; children: Snippet<[]> } = $props()

  let isOffscreen = $state(false)

  const observer = new IntersectionObserver(([entry]) => {
    isOffscreen = !entry.isIntersecting
  })

  $effect(() => {
    observer.observe(dom)

    return () => {
      observer.disconnect()
    }
  })

  const parentContext = useThrelte()

  createDOMContext(() => ({ dom, canvas: parentContext.canvas }))
  createCacheContext()
  const { scene } = createSceneContext(providedScene)
  createParentContext(scene)
  createParentObject3DContext(scene)
  const { camera } = createCameraContext()
  createUserContext()

  const { renderer, renderStage, canvas } = useThrelte()

  const originalViewport = new Vector4()
  const originalScissor = new Vector4()
  let originalScissorTest: boolean

  useTask(
    Symbol('<View>'),
    () => {
      if (isOffscreen) return

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
      running: () => !isOffscreen
    }
  )
</script>

{@render children?.()}

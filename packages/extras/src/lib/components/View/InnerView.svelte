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
  import { untrack, type Snippet } from 'svelte'
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
  const defaultScene = new Scene()
  const currentScene = $derived(providedScene ?? defaultScene)

  createDOMContext(() => ({ dom, canvas: parentContext.canvas }))
  createCacheContext()
  const sceneContext = createSceneContext(untrack(() => currentScene))
  createParentContext(() => currentScene)
  createParentObject3DContext(() => currentScene)
  const { camera } = createCameraContext()
  createUserContext()

  $effect(() => {
    sceneContext.scene = currentScene
  })

  const { renderer, renderStage, canvas } = useThrelte()

  const originalViewport = new Vector4()
  const originalScissor = new Vector4()
  let originalScissorTest: boolean

  useTask(
    Symbol('<View>'),
    () => {
      if (isOffscreen) return

      const track = dom.getBoundingClientRect()
      const bounds = canvas.getBoundingClientRect()
      const left = track.left - bounds.left
      const y =
        'isWebGPURenderer' in renderer && renderer.isWebGPURenderer
          ? track.top - bounds.top
          : bounds.bottom - track.bottom
      const { width, height } = track

      // save original state
      renderer.getScissor(originalScissor)
      renderer.getViewport(originalViewport)
      originalScissorTest = renderer.getScissorTest()

      // apply scissor
      renderer.setViewport(left, y, width, height)
      renderer.setScissor(left, y, width, height)
      renderer.setScissorTest(true)

      // render
      renderer.render(currentScene, camera.current)

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

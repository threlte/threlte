<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { Color, Vector4 } from 'three'

  let { isOffscreen = false, children } = $props()

  const { renderer, renderStage, scene, camera, canvas, dom } = useThrelte()

  const originalViewport = new Vector4()
  const originalScissor = new Vector4()
  let originalScissorTest: boolean
  const clearColor = new Color()

  useTask(
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

      // render or clear depending on offscreen status
      if (isOffscreen) {
        renderer.getClearColor(clearColor)
        renderer.setClearColor(clearColor, renderer.getClearAlpha())
        renderer.clear(true, true)
      } else {
        renderer.render(scene, camera.current)
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

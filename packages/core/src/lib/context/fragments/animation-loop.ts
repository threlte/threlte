import { onDestroy } from 'svelte'
import { type WebGLRenderer } from 'three'
import { useTask } from '../../hooks/useTask'
import { watch } from '../../utilities'
import { useCanvas } from './canvas'
import { useDisposal } from './disposal'
import { useScheduler } from './scheduler.svelte'
import { useRenderer } from './renderer.svelte'
import { useRenderTask } from './render-task'

export const setRendererAnimationLoopWithAutoResize = () => {
  const { size } = useCanvas()
  const { dispose } = useDisposal()
  const { invalidate, scheduler, resetFrameInvalidation } = useScheduler()
  const { renderer } = useRenderer()
  const { autoRenderTask } = useRenderTask()
  // Resize the renderer when the size changes
  const { start, stop } = useTask(
    () => {
      if (!('xr' in renderer) || (renderer as WebGLRenderer).xr?.isPresenting) return
      renderer.setSize(size.current.width, size.current.height)
      invalidate()
      stop()
    },
    {
      before: autoRenderTask,
      autoStart: false,
      autoInvalidate: false
    }
  )
  watch([size], () => {
    start()
  })

  if ('setAnimationLoop' in renderer) {
    const glRenderer = renderer as WebGLRenderer
    glRenderer.setAnimationLoop((time) => {
      dispose()
      scheduler.run(time)
      resetFrameInvalidation()
    })
  }

  onDestroy(() => {
    if ('dispose' in renderer) {
      const dispose = renderer.dispose as () => void
      dispose()
    }
  })
}

import { getContext, setContext } from 'svelte'
import type { Task } from '../../frame-scheduling'
import { watch } from '../../utilities'
import { useCamera } from './camera'
import { useScene } from './scene'
import { useScheduler } from './scheduler.svelte'
import { useRenderer } from './renderer.svelte'

type RenderTaskContext = {
  autoRenderTask: Task
}

const CTX_KEY = 'threlte-render-task-context'
export const createRenderTaskContext = (): RenderTaskContext => {
  const { camera } = useCamera()
  const { scene } = useScene()
  const { renderStage, autoRender } = useScheduler()
  const { renderer } = useRenderer()

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    renderer.render(scene, camera.current)
  })

  const context: RenderTaskContext = { autoRenderTask }
  setContext<RenderTaskContext>(CTX_KEY, context)

  watch([autoRender], ([autoRender]) => {
    if (autoRender) {
      context.autoRenderTask.start()
    } else {
      context.autoRenderTask.stop()
    }
    return () => {
      context.autoRenderTask.stop()
    }
  })

  return context
}

export const useRenderTask = (): RenderTaskContext => {
  const context = getContext<RenderTaskContext>(CTX_KEY)

  if (!context) {
    throw new Error('useRenderTask can only be used in a child component to <Canvas>.')
  }

  return context
}

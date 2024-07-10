import { useTask, useThrelte, useThrelteUserContext } from '@threlte/core'
import { BatchedRenderer } from 'three.quarks'

export const useBatchedRenderer = () => {
  return useThrelteUserContext('quarks-renderer', () => {
    console.log('RENDERER')

    const { autoRenderTask, scene } = useThrelte()
    const renderer = new BatchedRenderer()

    scene.add(renderer)

    useTask(
      (delta) => {
        renderer.update(delta)
      },
      {
        before: autoRenderTask
      }
    )

    return {
      renderer
    }
  })
}

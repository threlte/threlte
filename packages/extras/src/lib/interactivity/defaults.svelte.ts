import { useThrelte, type CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './context.js'
import { fromStore } from 'svelte/store'

export const getDefaultComputeFunction = (
  targetWritable: CurrentWritable<HTMLElement>
): ComputeFunction => {
  const { camera } = useThrelte()

  let width = targetWritable.current.clientWidth
  let height = targetWritable.current.clientHeight

  const resizeObserver = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width
    height = entry.contentRect.height
  })

  const target = fromStore(targetWritable)

  $effect.pre(() => {
    const { current } = target

    if (!current) return

    resizeObserver.observe(current)
    return () => resizeObserver.unobserve(current)
  })

  return (event, state) => {
    state.pointer.update((pointer) => {
      pointer.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1)
      return pointer
    })
    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

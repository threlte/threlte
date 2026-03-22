import { useThrelte } from '@threlte/core'
import type { ComputeFunction } from './context.svelte.js'
import { Vector2 } from 'three'

export const getDefaultComputeFunction = (target: () => HTMLElement): ComputeFunction => {
  const current = $derived(target())
  const { camera } = useThrelte()

  let width = current.clientWidth
  let height = current.clientHeight

  const resizeObserver = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width
    height = entry.contentRect.height
  })

  $effect.pre(() => {
    if (!current) return

    resizeObserver.observe(current)
    return () => resizeObserver.unobserve(current)
  })

  return (event, state) => {
    state.pointer.current = new Vector2(
      (event.offsetX / width) * 2 - 1,
      -(event.offsetY / height) * 2 + 1
    )

    state.raycaster.setFromCamera(state.pointer.current, camera.current)
  }
}

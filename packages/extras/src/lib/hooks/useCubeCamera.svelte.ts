import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'
import { untrack } from 'svelte'

/**
 * creates a CubeCamera and renderTarget instance
 */
export const useCubeCamera = (
  near: () => number | undefined,
  far: () => number | undefined,
  resolution: () => number | undefined
) => {
  const currentNear = $derived(near() ?? 0.1)
  const currentFar = $derived(far() ?? 1000)
  const currentResolution = $derived(resolution() ?? 256)

  const renderTarget = new WebGLCubeRenderTarget(untrack(() => currentResolution))

  const camera = new CubeCamera(
    untrack(() => currentNear),
    untrack(() => currentFar),
    renderTarget
  )

  $effect(() => {
    renderTarget.setSize(currentResolution, currentResolution)
  })

  $effect(() => {
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.near = currentNear
        child.far = currentFar
        child.updateProjectionMatrix()
      }
    }
  })

  $effect(() => {
    return () => {
      renderTarget.dispose()
    }
  })

  return {
    camera,
    renderTarget
  }
}

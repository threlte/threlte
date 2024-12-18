import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'

const DEFAULT_NEAR = 1
const DEFAULT_FAR = 1000
const DEFAULT_RESOLUTION = 256

/**
 * creates a `CubeCamera` instance
 * `near` and `far`, and `resolution` are getters so you can use $state()
 * the camera's `renderTarget` is disposed when the component unmounts.
 */
export const useCubeCamera = (
  near: () => number = () => DEFAULT_FAR,
  far: () => number = () => DEFAULT_FAR,
  resolution: () => number = () => DEFAULT_RESOLUTION
) => {
  const renderTarget = new WebGLCubeRenderTarget(resolution())
  const camera = new CubeCamera(DEFAULT_NEAR, DEFAULT_FAR, renderTarget)

  $effect(() => {
    const _resolution = resolution()
    renderTarget.setSize(_resolution, _resolution)
  })

  $effect(() => {
    const _near = near()
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.near = _near
        child.updateProjectionMatrix()
      }
    }
  })

  $effect(() => {
    const _far = far()
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.far = _far
        child.updateProjectionMatrix()
      }
    }
  })

  // dispose on unmount
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

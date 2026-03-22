import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'

/**
 * creates a `CubeCamera` instance
 * `near` and `far`, and `resolution` are getters so you can use $state()
 * the camera's `renderTarget` is disposed when the component unmounts.
 */
export const useCubeCamera = (near: () => number, far: () => number, resolution: () => number) => {
  const renderTarget = new WebGLCubeRenderTarget(resolution())
  const camera = new CubeCamera(near(), far(), renderTarget)

  $effect.pre(() => {
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

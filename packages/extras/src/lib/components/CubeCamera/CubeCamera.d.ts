import type { Props } from '@threlte/core'
import type { Component, Snippet } from 'svelte'
import type {
  CubeCamera,
  Group,
  Scene,
  CubeCamera as ThreeCubeCamera,
  WebGLCubeRenderTarget
} from 'three'

export type CubeCameraProps = Omit<Props<Group>, 'children'> & {
  /**
   * background that will be set before rendering to the render target. a value of `'auto'` will use the current background
   * @default 'auto'
   */
  background?: Scene['background'] | 'auto'
  /**
   * passed along to the internal CubeCamera
   * @default 1000
   */
  far?: number
  /**
   * fog that will be set before rendering to the render target. a value of `'auto'` will use the current fog
   */
  fog?: Scene['fog'] | 'auto'
  /**
   * controls how many times camera will be updated
   * @default Infinity
   */
  frames?: number
  /**
   * passed along to the internal CubeCamera
   * @default 0.1
   */
  near?: number
  /**
   * a function that will be called anytime the render has been started
   */
  onrenderstart?: () => void
  /**
   * a function that will be called anytime the render has been stopped
   */
  onrenderstop?: () => void
  /**
   * size of the render target. a higher resolution should have more detail
   * @default 256
   */
  resolution?: number
  /**
   * the children snippet has access to the underlying cube camera, the render target, and the outer group
   */
  children?: Snippet<
    [{ camera: ThreeCubeCamera; ref: Group; renderTarget: WebGLCubeRenderTarget; restart(): void }]
  >
}

export type CubeCameraExports = {
  camera(): CubeCamera
  renderTarget(): WebGLCubeRenderTarget
  restart(): void
}

declare const CubeCameraComponent: Component<CubeCameraProps, CubeCameraExports>

export default CubeCameraComponent

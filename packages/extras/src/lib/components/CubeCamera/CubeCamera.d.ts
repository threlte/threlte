import type { Component, Snippet } from 'svelte'
import type { CubeCamera as ThreeCubeCamera, Group, Scene, WebGLCubeRenderTarget } from 'three'
import type { Props } from '@threlte/core'

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

export declare const CubeCamera: Component<CubeCameraProps>

import type { Component, Snippet } from 'svelte'
import type { Group, Scene, WebGLCubeRenderTarget } from 'three'
import type { Props } from '@threlte/core'

export type CubeCameraProps = Props<Group> & {
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
   */
  resolution?: number
  /**
   * the children snippet has access to the underlying render target
   */
  children?: Snippet<[{ renderTarget: WebGLCubeRenderTarget }]>
}

type T = CubeCameraProps['children']

export declare const CubeCamera: Component<CubeCameraProps>

/* Based on https://github.com/pmndrs/drei/blob/master/src/core/useFBO.tsx under the MIT License */
import { useThrelte, watch } from '@threlte/core'
import { onDestroy } from 'svelte'
import { type RenderTargetOptions, WebGLRenderTarget, LinearFilter, HalfFloatType, FloatType, DepthTexture } from 'three'

type UseFBOOptions = {
  /** Defines the count of MSAA samples. Can only be used with WebGL 2. Default: 0 */
  samples?: number
  /** If set, the scene depth will be rendered into buffer.depthTexture. Default: false */
  depth?: boolean
} & RenderTargetOptions

// 👇 uncomment when TS version supports function overloads
// export function useFBO(options?: UseFBOOptions)
export function useFBO(
  /** Width in pixels, or options (will render fullscreen by default) */
  width?: number | UseFBOOptions,
  /** Height in pixels */
  height?: number,
  /** Options */
  options?: UseFBOOptions
): WebGLRenderTarget {
  const { dpr, size } = useThrelte()

  const _width = typeof width === 'number' ? width : size.current.width * (dpr.current ?? 1)
  const _height = typeof height === 'number' ? height : size.current.height * (dpr.current ?? 1)
  const _options = (typeof width === 'number' ? options : (width as UseFBOOptions)) || {}
  const { samples = 0, depth, ...targetOptions } = _options

  const target = new WebGLRenderTarget(_width, _height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    samples,
    ...targetOptions
  })

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  onDestroy(() => {
    target.dispose()
  })

  if (typeof width !== 'number' && typeof height !== 'number') {
    watch(size, ($size) => {
      target.setSize($size.width * dpr.current, $size.height * dpr.current)
    })
  }
  
  return target
}

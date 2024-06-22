/* Based on https://github.com/pmndrs/drei/blob/master/src/core/useFBO.tsx under the MIT License */
import { useThrelte } from '@threlte/core'
import { onDestroy, onMount } from 'svelte'
import {
  type RenderTargetOptions,
  WebGLRenderTarget,
  LinearFilter,
  HalfFloatType,
  DepthTexture,
  FloatType
} from 'three'

interface UseFBOOptions extends RenderTargetOptions {
  /** Defines the count of MSAA samples. Can only be used with WebGL 2. Default: 0 */
  samples?: number
  /** If set, the scene depth will be rendered into buffer.depthTexture. Default: false */
  depth?: boolean
}

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

  const _width = typeof width === 'number' ? width : 1 * (dpr.current ?? 1)
  const _height = typeof height === 'number' ? height : 1 * (dpr.current ?? 1)
  const _options = (typeof width === 'number' ? options : (width as UseFBOOptions)) || {}
  const { samples = 0, depth, ...targetOptions } = _options

  const target = new WebGLRenderTarget(_width, _height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    ...targetOptions
  })

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  target.samples = samples

  onMount(() => {
    if (samples) target.samples = samples
  })

  onDestroy(() => {
    target.dispose()
  })

  const unsubscribeSize = size.subscribe((val) => {
    // Update the width and height on size change
    const _width = typeof width === 'number' ? width : val.width * dpr.current
    const _height = typeof height === 'number' ? height : val.height * dpr.current
    if (target.width !== _width && target.height !== _height) {
      target.setSize(_width, _height)
    }
  })

  onDestroy(unsubscribeSize)

  return target
}

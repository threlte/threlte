/* Based on https://github.com/pmndrs/drei/blob/master/src/core/useFBO.tsx under the MIT License */

import type { RenderTargetOptions } from 'three'
import { HalfFloatType, DepthTexture, FloatType, WebGLRenderTarget } from 'three'
import { onMount } from 'svelte'
import { useThrelte, watch } from '@threlte/core'

type UseFBOOptions = RenderTargetOptions & {
  /**
   * If set, the scene depth will be rendered into buffer.depthTexture.
   * @default false
   */
  depth?: boolean
}

export function useFBO(
  /** Width in pixels, or options (will render fullscreen by default) */
  width: number | UseFBOOptions = {},
  /** Height in pixels */
  height?: number,
  /** Options that are passed to the  */
  options?: UseFBOOptions
): WebGLRenderTarget {
  const { dpr, size } = useThrelte()

  const _width = typeof width === 'number' ? width : Math.max(dpr.current, 1)
  const _height = typeof height === 'number' ? height : Math.max(dpr.current, 1)

  const {
    samples = 0,
    depth = false,
    type = HalfFloatType,
    ...targetOptions
  } = typeof width === 'number' ? options ?? {} : width

  const target = new WebGLRenderTarget(_width, _height, {
    type,
    ...targetOptions
  })

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  target.samples = samples

  onMount(() => {
    if (samples > 0) target.samples = samples
    return () => target.dispose()
  })

  watch(size, ({ width, height }) => {
    // Update the width and height on size change
    const _width = typeof width === 'number' ? width : width * dpr.current
    const _height = typeof height === 'number' ? height : height * dpr.current
    if (target.width !== _width || target.height !== _height) {
      target.setSize(_width, _height)
    }
  })

  return target
}

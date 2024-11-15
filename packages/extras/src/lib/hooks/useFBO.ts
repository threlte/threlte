/* Based on https://github.com/pmndrs/drei/blob/master/src/core/useFBO.tsx under the MIT License */

import type { RenderTargetOptions } from 'three'
import { DepthTexture, FloatType, WebGLRenderTarget } from 'three'
import { onDestroy } from 'svelte'
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

  const widthIsNumber = typeof width === 'number'

  const _width = widthIsNumber ? width : Math.max(dpr.current, 1)
  const _height = typeof height === 'number' ? height : Math.max(dpr.current, 1)

  const { depth = false, ...targetOptions } = widthIsNumber ? options ?? {} : width

  const target = new WebGLRenderTarget(_width, _height, targetOptions)

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  onDestroy(() => {
    target.dispose()
  })

  watch(size, (size) => {
    // Update the width and height on size change
    const _width = typeof width === 'number' ? width : size.width * dpr.current
    const _height = typeof height === 'number' ? height : size.height * dpr.current
    if (target.width !== _width || target.height !== _height) {
      target.setSize(_width, _height)
    }
  })

  return target
}

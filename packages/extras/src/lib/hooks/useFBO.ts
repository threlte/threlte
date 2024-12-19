import type { RenderTargetOptions } from 'three'
import { DepthTexture, WebGLRenderTarget } from 'three'
import { onDestroy } from 'svelte'
import { isInstanceOf, useThrelte, watch } from '@threlte/core'

export type UseFBOOptions = RenderTargetOptions & {
  /**
   * if set, the scene depth will be rendered into buffer.depthTexture
   */
  depth?: { width?: number; height?: number } | DepthTexture | boolean
  /**
   * if set, the render target size will be set to the corresponding width and height and not use or follow the size of the canvas
   */
  size?: { width?: number; height?: number }
}

export const useFBO = ({
  depth = false,
  size,
  ...targetOptions
}: UseFBOOptions = {}): WebGLRenderTarget => {
  const target = new WebGLRenderTarget(1, 1, targetOptions)

  // first set the width and height because if a depth texture has to be created, it can only have its width and height set in its constructor
  if (size === undefined) {
    const { dpr, size } = useThrelte()
    watch([dpr, size], ([dpr, { width, height }]) => {
      target.setSize(dpr * width, dpr * height)
    })
  } else {
    // handle when width and height are undefined or the user set them to negative numbers
    const width = Math.max(size.width ?? 1, target.width)
    const height = Math.max(size.height ?? 1, target.height)
    target.setSize(width, height)
  }

  if (depth === true) {
    target.depthTexture = new DepthTexture(target.width, target.height)
  } else if (isInstanceOf(depth, 'DepthTexture')) {
    target.depthTexture = depth
  } else if (depth !== false) {
    const width = Math.max(depth.width ?? 1, 1)
    const height = Math.max(depth.height ?? 1, 1)
    target.depthTexture = new DepthTexture(width, height)
  }

  onDestroy(() => {
    target.dispose()
  })

  return target
}

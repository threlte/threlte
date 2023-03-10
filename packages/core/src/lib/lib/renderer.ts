import type { ShadowMapType, WebGLRendererParameters } from 'three'
import {
  ACESFilmicToneMapping,
  LinearEncoding,
  NoToneMapping,
  sRGBEncoding,
  WebGLRenderer
} from 'three'
import type { Size, ThrelteContext } from '../types/types'

export const createRendererAndComposer = (
  ctx: ThrelteContext,
  canvas: HTMLCanvasElement,
  rendererParameters: WebGLRendererParameters | undefined
): void => {
  ctx.renderer = new WebGLRenderer({
    powerPreference: 'high-performance',
    canvas: canvas,
    antialias: true,
    alpha: true,
    ...rendererParameters
  })
}

export const setRendererColorOutput = (
  ctx: ThrelteContext,
  linear: boolean,
  flat: boolean
): void => {
  if (!ctx.renderer) return
  if (linear) {
    ctx.renderer.outputEncoding = LinearEncoding
  } else {
    ctx.renderer.outputEncoding = sRGBEncoding
  }
  if (flat) {
    ctx.renderer.toneMapping = NoToneMapping
  } else {
    ctx.renderer.toneMapping = ACESFilmicToneMapping
  }
}

export const setRendererAndComposerSize = (ctx: ThrelteContext, size: Size, dpr: number): void => {
  if (!ctx.renderer) return
  ctx.renderer.setSize?.(size.width, size.height)
  ctx.renderer.setPixelRatio?.(dpr)
}

export const setRendererShadows = (
  ctx: ThrelteContext,
  shadows: boolean,
  shadowMapType: ShadowMapType
): void => {
  if (!ctx.renderer) return
  ctx.renderer.shadowMap.enabled = shadows
  ctx.renderer.shadowMap.type = shadowMapType
}

import { get } from 'svelte/store'
import type { ShadowMapType, WebGLRendererParameters } from 'three'
import {
  ACESFilmicToneMapping,
  LinearEncoding,
  NoToneMapping,
  sRGBEncoding,
  WebGLRenderer
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
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
  ctx.composer = new EffectComposer(ctx.renderer)
  ctx.composer.addPass(new RenderPass(ctx.scene, get(ctx.camera)))
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
  if (!ctx.renderer || !ctx.composer) return
  ctx.renderer.setSize(size.width, size.height)
  ctx.renderer.setPixelRatio(dpr)
  ctx.composer.setSize(size.width, size.height)
  ctx.composer.setPixelRatio(dpr)
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

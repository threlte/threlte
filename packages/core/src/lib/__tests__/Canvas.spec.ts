import {
  AgXToneMapping,
  LinearToneMapping,
  LinearSRGBColorSpace,
  SRGBColorSpace,
  PCFSoftShadowMap,
  BasicShadowMap,
  WebGLRenderer
} from 'three'
import { describe, it, expect, vi } from 'vitest'
import { mount } from 'svelte'
import CanvasContext from './__fixtures__/CanvasContext.svelte'
import type { ThrelteContext } from '../context/compounds/useThrelte.js'
import type { Renderer } from '../context/fragments/renderer.svelte.js'

const renderCanvas = (props: Record<string, unknown> = {}) => {
  const oncontext = vi.fn()
  const target = document.createElement('div')
  document.body.append(target)
  mount(CanvasContext, { target, props: { oncontext, ...props } })
  const ctx: ThrelteContext<Renderer> = oncontext.mock.calls[0]![0]
  return ctx
}

describe('<Canvas> props', () => {
  describe('colorSpace', () => {
    it('defaults to sRGB', () => {
      const ctx = renderCanvas()
      expect(ctx.renderer.outputColorSpace).toBe(SRGBColorSpace)
    })

    it('accepts a custom colorSpace', () => {
      const ctx = renderCanvas({ colorSpace: LinearSRGBColorSpace })
      expect(ctx.renderer.outputColorSpace).toBe(LinearSRGBColorSpace)
    })
  })

  describe('toneMapping', () => {
    it('defaults to AgXToneMapping', () => {
      const ctx = renderCanvas()
      expect(ctx.renderer.toneMapping).toBe(AgXToneMapping)
    })

    it('accepts a custom toneMapping', () => {
      const ctx = renderCanvas({ toneMapping: LinearToneMapping })
      expect(ctx.renderer.toneMapping).toBe(LinearToneMapping)
    })
  })

  describe('shadows', () => {
    it('defaults to PCFSoftShadowMap', () => {
      const ctx = renderCanvas()
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(PCFSoftShadowMap)
    })

    it('disables shadows when set to false', () => {
      const ctx = renderCanvas({ shadows: false })
      expect(ctx.renderer.shadowMap.enabled).toBe(false)
    })

    it('enables PCFSoftShadowMap when set to true', () => {
      const ctx = renderCanvas({ shadows: true })
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(PCFSoftShadowMap)
    })

    it('accepts a custom shadow map type', () => {
      const ctx = renderCanvas({ shadows: BasicShadowMap })
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(BasicShadowMap)
    })
  })

  describe('dpr', () => {
    it('defaults to window.devicePixelRatio', () => {
      const ctx = renderCanvas()
      expect(ctx.renderer.getPixelRatio()).toBe(window.devicePixelRatio)
    })

    it('accepts a custom dpr', () => {
      const ctx = renderCanvas({ dpr: 1 })
      expect(ctx.renderer.getPixelRatio()).toBe(1)
    })
  })

  describe('renderMode', () => {
    it('defaults to on-demand', () => {
      const ctx = renderCanvas()
      expect(ctx.renderMode.current).toBe('on-demand')
    })

    it('accepts always', () => {
      const ctx = renderCanvas({ renderMode: 'always' })
      expect(ctx.renderMode.current).toBe('always')
    })

    it('accepts manual', () => {
      const ctx = renderCanvas({ renderMode: 'manual' })
      expect(ctx.renderMode.current).toBe('manual')
    })
  })

  describe('autoRender', () => {
    it('defaults to true', () => {
      const ctx = renderCanvas()
      expect(ctx.autoRender.current).toBe(true)
    })

    it('can be disabled', () => {
      const ctx = renderCanvas({ autoRender: false })
      expect(ctx.autoRender.current).toBe(false)
    })
  })

  describe('createRenderer', () => {
    it('uses WebGLRenderer by default', () => {
      const ctx = renderCanvas()
      expect(ctx.renderer).toBeInstanceOf(WebGLRenderer)
    })

    it('accepts a custom renderer', () => {
      const customRenderer = new WebGLRenderer()
      const createRenderer = vi.fn(() => customRenderer)
      const ctx = renderCanvas({ createRenderer })

      expect(createRenderer).toHaveBeenCalledOnce()
      expect(ctx.renderer).toBe(customRenderer)
    })
  })
})

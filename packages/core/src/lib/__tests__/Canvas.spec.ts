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
import { mount, tick } from 'svelte'
import CanvasContext from './__fixtures__/CanvasContext.svelte'
import type { ThrelteContext } from '../context/compounds/useThrelte.js'
import type { Renderer } from '../context/fragments/renderer.svelte.js'

const renderCanvas = async (props: Record<string, unknown> = {}) => {
  const oncontext = vi.fn()
  const target = document.createElement('div')
  document.body.append(target)
  mount(CanvasContext, { target, props: { oncontext, ...props } })
  await tick()
  const ctx: ThrelteContext<Renderer> = oncontext.mock.calls[0]![0]
  return ctx
}

describe('<Canvas> props', () => {
  describe('colorSpace', () => {
    it('defaults to sRGB', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderer.outputColorSpace).toBe(SRGBColorSpace)
    })

    it('accepts a custom colorSpace', async () => {
      const ctx = await renderCanvas({ colorSpace: LinearSRGBColorSpace })
      expect(ctx.renderer.outputColorSpace).toBe(LinearSRGBColorSpace)
    })
  })

  describe('toneMapping', () => {
    it('defaults to AgXToneMapping', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderer.toneMapping).toBe(AgXToneMapping)
    })

    it('accepts a custom toneMapping', async () => {
      const ctx = await renderCanvas({ toneMapping: LinearToneMapping })
      expect(ctx.renderer.toneMapping).toBe(LinearToneMapping)
    })
  })

  describe('shadows', () => {
    it('defaults to PCFSoftShadowMap', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(PCFSoftShadowMap)
    })

    it('disables shadows when set to false', async () => {
      const ctx = await renderCanvas({ shadows: false })
      expect(ctx.renderer.shadowMap.enabled).toBe(false)
    })

    it('enables PCFSoftShadowMap when set to true', async () => {
      const ctx = await renderCanvas({ shadows: true })
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(PCFSoftShadowMap)
    })

    it('accepts a custom shadow map type', async () => {
      const ctx = await renderCanvas({ shadows: BasicShadowMap })
      expect(ctx.renderer.shadowMap.enabled).toBe(true)
      expect(ctx.renderer.shadowMap.type).toBe(BasicShadowMap)
    })
  })

  describe('dpr', () => {
    it('defaults to window.devicePixelRatio', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderer.getPixelRatio()).toBe(window.devicePixelRatio)
    })

    it('accepts a custom dpr', async () => {
      const ctx = await renderCanvas({ dpr: 1 })
      expect(ctx.renderer.getPixelRatio()).toBe(1)
    })
  })

  describe('renderMode', () => {
    it('defaults to on-demand', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderMode.current).toBe('on-demand')
    })

    it('accepts always', async () => {
      const ctx = await renderCanvas({ renderMode: 'always' })
      expect(ctx.renderMode.current).toBe('always')
    })

    it('accepts manual', async () => {
      const ctx = await renderCanvas({ renderMode: 'manual' })
      expect(ctx.renderMode.current).toBe('manual')
    })
  })

  describe('autoRender', () => {
    it('defaults to true', async () => {
      const ctx = await renderCanvas()
      expect(ctx.autoRender.current).toBe(true)
    })

    it('can be disabled', async () => {
      const ctx = await renderCanvas({ autoRender: false })
      expect(ctx.autoRender.current).toBe(false)
    })
  })

  describe('createRenderer', () => {
    it('uses WebGLRenderer by default', async () => {
      const ctx = await renderCanvas()
      expect(ctx.renderer).toBeInstanceOf(WebGLRenderer)
    })

    it('accepts a custom renderer', async () => {
      const customRenderer = new WebGLRenderer()
      const createRenderer = vi.fn(() => customRenderer)
      const ctx = await renderCanvas({ createRenderer })

      expect(createRenderer).toHaveBeenCalledOnce()
      expect(ctx.renderer).toBe(customRenderer)
    })
  })
})

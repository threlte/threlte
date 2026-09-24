import { PerspectiveCamera, Vector2 } from 'three'
import { describe, it, expect, vi } from 'vitest'
import { mount, tick } from 'svelte'
import CanvasContext from './__fixtures__/CanvasContext.svelte'
import type { ThrelteContext } from '../context/compounds/useThrelte.js'
import type { Renderer } from '../context/fragments/renderer.svelte.js'

const renderCanvas = async (width: number, height: number) => {
  let ctx!: ThrelteContext<Renderer>
  const target = document.createElement('div')
  target.style.cssText = `width: ${width}px; height: ${height}px;`
  document.body.append(target)
  mount(CanvasContext, {
    target,
    props: {
      oncontext: (c: ThrelteContext<Renderer>) => {
        ctx = c
      }
    }
  })
  await tick()
  return { ctx, target }
}

const createDOMRect = (width: number, height: number) =>
  ({
    x: 0,
    y: 0,
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    width,
    height,
    toJSON: () => ({})
  }) as DOMRect

const mockMeasuredSize = (element: HTMLElement, width: number, height: number) => {
  let current = { width, height }

  Object.defineProperties(element, {
    clientWidth: { get: () => current.width, configurable: true },
    clientHeight: { get: () => current.height, configurable: true }
  })
  vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() =>
    createDOMRect(current.width, current.height)
  )

  return (width: number, height: number) => {
    current = { width, height }
  }
}

describe('resize', () => {
  it('updates renderer size when the dom element resizes', async () => {
    const { ctx, target } = await renderCanvas(200, 200)

    target.style.width = '400px'
    target.style.height = '300px'

    ctx.scheduler.run(16)

    const size = ctx.renderer.getSize(new Vector2())
    expect(size.x).toBe(400)
    expect(size.y).toBe(300)
  })

  it('updates camera aspect ratio on resize', async () => {
    const { ctx, target } = await renderCanvas(200, 200)
    const camera = ctx.camera.current as PerspectiveCamera

    target.style.width = '800px'
    target.style.height = '400px'

    ctx.scheduler.run(16)

    expect(camera.aspect).toBe(2)
  })

  it('does not resize or auto-render while the dom element has empty dimensions', async () => {
    const { ctx } = await renderCanvas(0, 0)
    const setSize = vi.spyOn(ctx.renderer, 'setSize')
    const render = vi.spyOn(ctx.renderer, 'render')

    ctx.scheduler.run(16)

    expect(setSize).not.toHaveBeenCalled()
    expect(render).not.toHaveBeenCalled()

    mockMeasuredSize(ctx.dom, 400, 300)
    window.dispatchEvent(new Event('resize'))
    ctx.scheduler.run(32)

    expect(setSize).toHaveBeenCalledWith(400, 300)
    expect(render).toHaveBeenCalledOnce()
  })

  it('does not resize or auto-render when the dom element becomes empty', async () => {
    const { ctx } = await renderCanvas(400, 300)
    const setSize = vi.spyOn(ctx.renderer, 'setSize')
    const render = vi.spyOn(ctx.renderer, 'render')

    ctx.scheduler.run(16)

    expect(setSize).toHaveBeenCalledWith(400, 300)
    expect(render).toHaveBeenCalledOnce()

    setSize.mockClear()
    render.mockClear()

    mockMeasuredSize(ctx.dom, 0, 0)
    window.dispatchEvent(new Event('resize'))
    ctx.scheduler.run(32)

    expect(setSize).not.toHaveBeenCalled()
    expect(render).not.toHaveBeenCalled()
  })
})

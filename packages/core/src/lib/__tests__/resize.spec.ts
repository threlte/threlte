import { PerspectiveCamera, Vector2 } from 'three'
import { describe, it, expect } from 'vitest'
import { mount } from 'svelte'
import CanvasContext from './__fixtures__/CanvasContext.svelte'
import type { ThrelteContext } from '../context/compounds/useThrelte.js'
import type { Renderer } from '../context/fragments/renderer.svelte.js'

const renderCanvas = (props: Record<string, unknown> = {}) => {
  let ctx!: ThrelteContext<Renderer>
  const target = document.createElement('div')
  document.body.append(target)
  mount(CanvasContext, {
    target,
    props: {
      oncontext: (c: ThrelteContext<Renderer>) => {
        ctx = c
      },
      ...props
    }
  })
  return ctx
}

describe('resize', () => {
  it('updates renderer size when the dom element resizes', () => {
    const ctx = renderCanvas()

    ctx.dom.style.width = '400px'
    ctx.dom.style.height = '300px'

    ctx.scheduler.run(16)

    const size = ctx.renderer.getSize(new Vector2())
    expect(size.x).toBe(400)
    expect(size.y).toBe(300)
  })

  it('updates camera aspect ratio on resize', () => {
    const ctx = renderCanvas()
    const camera = ctx.camera.current as PerspectiveCamera

    ctx.dom.style.width = '800px'
    ctx.dom.style.height = '400px'

    ctx.scheduler.run(16)

    expect(camera.aspect).toBe(2)
  })
})

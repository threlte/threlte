import { PerspectiveCamera, Vector2 } from 'three'
import { describe, it, expect } from 'vitest'
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
})

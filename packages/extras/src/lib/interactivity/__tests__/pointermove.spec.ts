import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointermove', () => {
  it('fires onpointermove when moving over a mesh', async () => {
    const onpointermoveA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onpointermoveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // dispatch pointermove at center — hits mesh A
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    expect(onpointermoveA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointermove when moving over empty space', async () => {
    const onpointermoveA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onpointermoveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // dispatch pointermove at corner — hits nothing
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    expect(onpointermoveA).not.toHaveBeenCalled()
  })

  it('throttles pointermove to one per animation frame', async () => {
    const onpointermoveA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onpointermoveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // dispatch two pointermove events in rapid succession without waiting;
    // the throttle should coalesce them so only the latest fires
    pointer(target, 'pointermove', 100, 100)
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointermoveA).toHaveBeenCalledOnce()
  })
})

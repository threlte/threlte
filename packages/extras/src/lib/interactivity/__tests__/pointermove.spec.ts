import { tick } from 'svelte'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, nextFrame } from './helpers.js'
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

    // The first pointermove in a frame is processed immediately
    pointer(target, 'pointermove', 100, 100)
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

    // The first pointermove in a frame is processed immediately
    pointer(target, 'pointermove', 0, 0)
    await tick()

    expect(onpointermoveA).not.toHaveBeenCalled()
  })

  it('processes the first pointermove immediately and coalesces the rest', async () => {
    const onpointermoveA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onpointermoveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // The first pointermove in a frame is processed immediately for responsive
    // hover updates. Additional moves within the same frame are coalesced —
    // only the latest fires on the next rAF.
    pointer(target, 'pointermove', 100, 100) // processed immediately
    pointer(target, 'pointermove', 101, 100) // queued
    pointer(target, 'pointermove', 102, 100) // replaces queued

    // Before rAF: only the first event has been processed
    expect(onpointermoveA).toHaveBeenCalledOnce()

    // After rAF: the last queued event is processed
    await nextFrame()
    await tick()

    expect(onpointermoveA).toHaveBeenCalledTimes(2)
  })
})

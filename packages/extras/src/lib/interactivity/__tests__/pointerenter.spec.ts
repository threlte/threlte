import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerenter', () => {
  it('fires onpointerenter when the pointer enters a mesh', async () => {
    const onpointerenterA = vi.fn()

    const { context } = render(Scene, {
      props: { onpointerenterA }
    })

    await setupDom(context)
    const target = context.dom

    // First pointermove in a frame is processed immediately
    pointer(target, 'pointermove', 100, 100)
    await tick()

    expect(onpointerenterA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerenter again on subsequent moves within the mesh', async () => {
    const onpointerenterA = vi.fn()

    const { context } = render(Scene, {
      props: { onpointerenterA }
    })

    await setupDom(context)
    const target = context.dom

    // First move — processed immediately, fires onpointerenter
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Second move — coalesced to next rAF, pointer still inside mesh A
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointerenterA).toHaveBeenCalledOnce()
  })
})

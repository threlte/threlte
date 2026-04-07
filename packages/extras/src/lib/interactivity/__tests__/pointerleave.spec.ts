import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerleave', () => {
  it('fires onpointerleave when the pointer leaves a mesh', async () => {
    const onpointerleaveA = vi.fn()

    const { context } = render(Scene, {
      props: { onpointerleaveA }
    })

    await setupDom(context)
    const target = context.dom

    // First move — processed immediately, hovers mesh A
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Second move — coalesced to next rAF, leaves mesh A
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    expect(onpointerleaveA).toHaveBeenCalledOnce()
  })

  it('fires onpointerleave for all hovered objects when the pointer leaves the canvas', async () => {
    const onpointerleaveA = vi.fn()

    const { context } = render(Scene, {
      props: { onpointerleaveA }
    })

    await setupDom(context)
    const target = context.dom

    // First move — processed immediately, hovers mesh A
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Pointer leaves the canvas entirely — handled synchronously by
    // handlePointerLeaveOrCancel, no nextFrame needed, just tick
    target.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerId: 1 }))
    await tick()

    expect(onpointerleaveA).toHaveBeenCalledOnce()
  })
})

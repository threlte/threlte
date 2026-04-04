import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerout', () => {
  it('fires onpointerout when the pointer moves off a mesh', async () => {
    const onpointeroutA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointeroutA }
    })

    await setupDom(context, container)
    const target = context.dom

    // First move — processed immediately, hovers mesh A
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Second move — coalesced to next rAF, leaves mesh A
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    expect(onpointeroutA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerout if pointer stays on the mesh', async () => {
    const onpointeroutA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointeroutA }
    })

    await setupDom(context, container)
    const target = context.dom

    // First move — processed immediately, hovers mesh A
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Second move — coalesced to next rAF, still hits mesh A
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointeroutA).not.toHaveBeenCalled()
  })
})

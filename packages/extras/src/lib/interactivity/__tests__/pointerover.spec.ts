import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerover', () => {
  it('fires onpointerover when the pointer moves over a mesh', async () => {
    const onpointeroverA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointeroverA }
    })

    await setupDom(context, container)
    const target = context.dom

    // First pointermove in a frame is processed immediately
    pointer(target, 'pointermove', 100, 100)
    await tick()

    expect(onpointeroverA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerover again on subsequent moves over the same mesh', async () => {
    const onpointeroverA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointeroverA }
    })

    await setupDom(context, container)
    const target = context.dom

    // First move — processed immediately, fires onpointerover
    pointer(target, 'pointermove', 100, 100)
    await tick()

    // Second move — coalesced to next rAF, pointer still on mesh A
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointeroverA).toHaveBeenCalledOnce()
  })
})

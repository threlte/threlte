import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerover', () => {
  it('fires onpointerover when the pointer moves over a mesh', async () => {
    const onpointeroverA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointeroverA }
    })

    await setupDom(context, container)
    const target = context.dom

    // Move pointer to center — hits mesh A
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
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

    // First move — pointer enters mesh A, fires onpointerover
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    // Second move — pointer still on mesh A, should NOT fire again
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointeroverA).toHaveBeenCalledOnce()
  })
})

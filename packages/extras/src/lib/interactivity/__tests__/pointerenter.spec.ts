import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerenter', () => {
  it('fires onpointerenter when the pointer enters a mesh', async () => {
    const onpointerenterA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointerenterA }
    })

    await setupDom(context, container)
    const target = context.dom

    // Move pointer to center — enters mesh A
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    expect(onpointerenterA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerenter again on subsequent moves within the mesh', async () => {
    const onpointerenterA = vi.fn()

    const { context, container } = render(Scene, {
      props: { onpointerenterA }
    })

    await setupDom(context, container)
    const target = context.dom

    // First move — pointer enters mesh A, fires onpointerenter
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    // Second move — pointer still inside mesh A, should NOT fire again
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    expect(onpointerenterA).toHaveBeenCalledOnce()
  })
})

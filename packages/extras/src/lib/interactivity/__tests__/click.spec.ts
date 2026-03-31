import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

// In a real browser interaction, pointerdown always precedes click. The
// interactivity system records which objects were hit on pointerdown
// (initialHits) and only fires onclick for objects that were in that list.
// These tests mirror the real event sequence by dispatching pointerdown
// before click.

describe('onclick', () => {
  it('fires onclick when a mesh is hit', async () => {
    const onclickA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits mesh A
    pointer(target, 'pointerdown')
    await tick()

    // click at center → hits mesh A
    pointer(target, 'click')
    await tick()

    expect(onclickA).toHaveBeenCalledOnce()
  })

  it('does not fire onclick when clicking empty space', async () => {
    const onclickA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at (0, 0) → hits nothing
    pointer(target, 'pointerdown', 0, 0)
    await tick()

    // click at (0, 0) → hits nothing
    pointer(target, 'click', 0, 0)
    await tick()

    expect(onclickA).not.toHaveBeenCalled()
  })

})

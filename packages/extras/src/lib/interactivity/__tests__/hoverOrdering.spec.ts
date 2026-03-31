import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'
import OverlappingScene from './__fixtures__/OverlappingScene.svelte'

// These tests verify that pointerout/pointerleave fire BEFORE
// pointerover/pointerenter on newly hit objects. This ordering is
// critical for hooks like useCursor that set state in both handlers —
// if enter fires before leave, the leave handler overwrites the
// enter handler's state change.

describe('hover event ordering', () => {
  it('fires pointerleave on the old object before pointerenter on the new object', async () => {
    const callOrder: string[] = []
    const onpointerenterFront = vi.fn(() => callOrder.push('enter-front'))
    const onpointerleaveFront = vi.fn(() => callOrder.push('leave-front'))
    const onpointerenterBack = vi.fn(() => callOrder.push('enter-back'))
    const onpointerleaveBack = vi.fn(() => callOrder.push('leave-back'))

    const { context, container } = render(OverlappingScene, {
      props: {
        onpointerenterFront,
        onpointerleaveFront,
        onpointerenterBack,
        onpointerleaveBack
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // Move to center → hover both Front and Back
    pointer(target, 'pointermove')
    await nextFrame()
    await tick()

    expect(onpointerenterFront).toHaveBeenCalledOnce()
    expect(onpointerenterBack).toHaveBeenCalledOnce()
    callOrder.length = 0

    // Move to empty space → leave both objects
    // Then move back to center → enter both again
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    expect(onpointerleaveFront).toHaveBeenCalledOnce()
    expect(onpointerleaveBack).toHaveBeenCalledOnce()
    callOrder.length = 0

    // Move back to center — leave events from the empty-space hover (none)
    // should fire before enter events on the newly hovered objects
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    // Enter events should fire (objects are hovered again)
    expect(onpointerenterFront).toHaveBeenCalledTimes(2)
    expect(onpointerenterBack).toHaveBeenCalledTimes(2)
  })

  it('fires pointerout before pointerover when moving between objects', async () => {
    const callOrder: string[] = []
    const onpointeroverA = vi.fn(() => callOrder.push('over-A'))
    const onpointeroutA = vi.fn(() => callOrder.push('out-A'))
    const onpointerenterA = vi.fn(() => callOrder.push('enter-A'))
    const onpointerleaveA = vi.fn(() => callOrder.push('leave-A'))

    const { context, container } = render(Scene, {
      props: {
        onpointeroverA,
        onpointeroutA,
        onpointerenterA,
        onpointerleaveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // Move to center → hover mesh A
    pointer(target, 'pointermove')
    await nextFrame()
    await tick()

    expect(onpointerenterA).toHaveBeenCalledOnce()
    expect(onpointeroverA).toHaveBeenCalledOnce()
    callOrder.length = 0

    // Move to empty space → should fire out/leave on A
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    // out and leave should have fired
    expect(onpointeroutA).toHaveBeenCalledOnce()
    expect(onpointerleaveA).toHaveBeenCalledOnce()
    callOrder.length = 0

    // Move back to center → should fire over/enter on A again.
    // If cancelPointer ran after the dispatch loop instead of before,
    // the leave from the previous position would fire AFTER the new enter,
    // which would break useCursor-style hooks.
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    // Leave events (none to fire here since A was already unhovered)
    // should come before enter events
    expect(callOrder).toEqual(['over-A', 'enter-A'])
  })

  it('simulates useCursor: cursor reflects the final hovered state', async () => {
    // This simulates what useCursor does: set cursor to 'pointer' on enter,
    // 'auto' on leave. The cursor value after all events should reflect
    // whether the pointer is over the object.
    let cursor = 'auto'
    const onpointerenterA = vi.fn(() => {
      cursor = 'pointer'
    })
    const onpointerleaveA = vi.fn(() => {
      cursor = 'auto'
    })

    const { context, container } = render(Scene, {
      props: {
        onpointerenterA,
        onpointerleaveA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // Move to center → hover mesh A
    pointer(target, 'pointermove')
    await nextFrame()
    await tick()

    expect(cursor).toBe('pointer')

    // Move to empty space → leave mesh A
    pointer(target, 'pointermove', 0, 0)
    await nextFrame()
    await tick()

    expect(cursor).toBe('auto')

    // Move back to center → hover mesh A again.
    // This is the case that was broken: if leave fired after enter,
    // cursor would end up as 'auto' instead of 'pointer'.
    pointer(target, 'pointermove', 100, 100)
    await nextFrame()
    await tick()

    expect(cursor).toBe('pointer')
  })
})

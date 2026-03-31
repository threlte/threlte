import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import OverlappingScene from './__fixtures__/OverlappingScene.svelte'
import PropagationScene from './__fixtures__/PropagationScene.svelte'

describe('event propagation', () => {
  it('bubbles events from child to parent', async () => {
    const onpointerdownChild = vi.fn()
    const onpointerdownParent = vi.fn()

    const { context, container } = render(PropagationScene, {
      props: {
        onpointerdownChild,
        onpointerdownParent
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits Child, bubbles to Parent
    pointer(target, 'pointerdown')
    await tick()

    expect(onpointerdownChild).toHaveBeenCalledOnce()
    expect(onpointerdownParent).toHaveBeenCalledOnce()
  })

  it('delivers the event to the child before the parent', async () => {
    const callOrder: string[] = []
    const onpointerdownChild = vi.fn(() => callOrder.push('child'))
    const onpointerdownParent = vi.fn(() => callOrder.push('parent'))

    const { context, container } = render(PropagationScene, {
      props: {
        onpointerdownChild,
        onpointerdownParent
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits Child, bubbles to Parent
    pointer(target, 'pointerdown')
    await tick()

    expect(callOrder).toEqual(['child', 'parent'])
  })

  it('delivers events to the nearest object first', async () => {
    const callOrder: string[] = []
    const onpointerdownFront = vi.fn(() => callOrder.push('front'))
    const onpointerdownBack = vi.fn(() => callOrder.push('back'))

    const { context, container } = render(OverlappingScene, {
      props: {
        onpointerdownFront,
        onpointerdownBack
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits both Front (z=-3) and Back (z=-7)
    pointer(target, 'pointerdown')
    await tick()

    // Both should fire, but Front (nearer) should fire first
    expect(onpointerdownFront).toHaveBeenCalledOnce()
    expect(onpointerdownBack).toHaveBeenCalledOnce()
    expect(callOrder).toEqual(['front', 'back'])
  })

  it('objects are transparent to pointer events by default', async () => {
    const onpointerdownFront = vi.fn()
    const onpointerdownBack = vi.fn()

    const { context, container } = render(OverlappingScene, {
      props: {
        onpointerdownFront,
        onpointerdownBack
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits both overlapping meshes
    pointer(target, 'pointerdown')
    await tick()

    // Without stopPropagation, the event passes through the front object
    // and is also delivered to the back object
    expect(onpointerdownFront).toHaveBeenCalledOnce()
    expect(onpointerdownBack).toHaveBeenCalledOnce()
  })

  it('stopPropagation prevents delivery to farther objects', async () => {
    const onpointerdownFront = vi.fn((e) => e.stopPropagation())
    const onpointerdownBack = vi.fn()

    const { context, container } = render(OverlappingScene, {
      props: {
        onpointerdownFront,
        onpointerdownBack
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits both, but Front calls stopPropagation
    pointer(target, 'pointerdown')
    await tick()

    expect(onpointerdownFront).toHaveBeenCalledOnce()
    // Back should NOT receive the event — Front blocked it
    expect(onpointerdownBack).not.toHaveBeenCalled()
  })

  it('delivers pointerout to farther objects when a nearer object starts calling stopPropagation', async () => {
    const onpointeroverBack = vi.fn()
    const onpointeroutBack = vi.fn()
    const onpointermoveFront = vi.fn()

    const { context, container } = render(OverlappingScene, {
      props: {
        onpointeroverBack,
        onpointeroutBack,
        onpointermoveFront
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // First move → hover both objects (no stopPropagation)
    pointer(target, 'pointermove')
    await nextFrame()
    await tick()

    expect(onpointeroverBack).toHaveBeenCalledOnce()

    // Now Front's pointermove handler starts calling stopPropagation.
    // On the next move, Back should receive pointerout because it is
    // no longer reachable.
    onpointermoveFront.mockImplementation((e: any) => e.stopPropagation())

    // Move slightly so the throttle doesn't ignore it
    pointer(target, 'pointermove', 101, 100)
    await nextFrame()
    await tick()

    // Back was previously hovered but is now blocked — should get pointerout
    expect(onpointeroutBack).toHaveBeenCalledOnce()
  })
})

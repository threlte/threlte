import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick, nextFrame } from './helpers.js'
import PropagationScene from './__fixtures__/PropagationScene.svelte'
import type { IntersectionEvent } from '../types.js'

describe('stopPropagation', () => {
  it('prevents the event from bubbling to parent objects', async () => {
    const onpointerdownChild = vi.fn((e) => e.stopPropagation())
    const onpointerdownParent = vi.fn()

    const { context, container } = render(PropagationScene, {
      props: {
        onpointerdownChild,
        onpointerdownParent
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits Child, which calls stopPropagation
    pointer(target, 'pointerdown')
    await tick()

    expect(onpointerdownChild).toHaveBeenCalledOnce()
    // Parent should not receive the event because Child stopped propagation
    expect(onpointerdownParent).not.toHaveBeenCalled()
  })

  it('allows the event to bubble when not called', async () => {
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

    // pointerdown at center → hits Child, does not stop propagation
    pointer(target, 'pointerdown')
    await tick()

    // Both child and parent should receive the event
    expect(onpointerdownChild).toHaveBeenCalledOnce()
    expect(onpointerdownParent).toHaveBeenCalledOnce()
  })

  it('prevents parent from receiving pointerover when child stops propagation on first hover', async () => {
    const onpointeroverChild = vi.fn((e) => e.stopPropagation())
    const onpointeroverParent = vi.fn()

    const { context, container } = render(PropagationScene, {
      props: {
        onpointeroverChild,
        onpointeroverParent
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointermove at center → hovers Child, which calls stopPropagation
    pointer(target, 'pointermove')
    await nextFrame()
    await tick()

    expect(onpointeroverChild).toHaveBeenCalledOnce()
    // Parent should not receive pointerover because Child stopped propagation
    expect(onpointeroverParent).not.toHaveBeenCalled()
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

  it('sets the stopped property on the event object', async () => {
    let capturedEvent: IntersectionEvent<PointerEvent> | undefined

    const onpointerdownChild = vi.fn((e) => {
      e.stopPropagation()
      capturedEvent = e
    })

    const { context, container } = render(PropagationScene, {
      props: {
        onpointerdownChild
      }
    })

    await setupDom(context, container)
    const target = context.dom

    pointer(target, 'pointerdown')
    await tick()

    expect(capturedEvent?.stopped).toBe(true)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import PointerMissedScene from './__fixtures__/PointerMissedScene.svelte'

/**
 * Workaround for @threlte/test bugs #1, #5:
 * The dom element is detached so clientWidth/Height are 0. Appending it to the
 * container with explicit pixel dimensions gives it real layout. Must wait for
 * ResizeObserver to fire.
 */
const setupDom = async (context: any, container: HTMLElement) => {
  const dom = context.dom as HTMLElement
  dom.style.width = '200px'
  dom.style.height = '200px'
  container.appendChild(dom)
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
}

/**
 * Dispatch a pointer event at position (x, y) relative to the target element.
 * offsetX/offsetY are read-only computed properties that Chromium computes
 * unreliably for synthetic events (@threlte/test bug #6), so we override them.
 */
const pointer = (target: HTMLElement, type: string, x = 100, y = 100) => {
  const event = new PointerEvent(type, {
    bubbles: true,
    pointerId: 1,
    clientX: x,
    clientY: y,
  })
  Object.defineProperty(event, 'offsetX', { value: x })
  Object.defineProperty(event, 'offsetY', { value: y })
  target.dispatchEvent(event)
}

const tick = () => new Promise<void>((r) => setTimeout(r, 0))

describe('pointerMissed', () => {
  it('fires onpointermissed exactly once per object not under the pointer', async () => {
    const onclickA = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()
    const onpointermissedC = vi.fn()

    const { context, container } = render(PointerMissedScene, {
      props: {
        onclickA,
        onpointermissedA,
        onpointermissedB,
        onpointermissedC,
      },
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits mesh A
    pointer(target, 'pointerdown')
    await tick()

    // click at same position → hits mesh A
    pointer(target, 'click')
    await tick()

    expect(onclickA).toHaveBeenCalledOnce()
    expect(onpointermissedA).not.toHaveBeenCalled()
    expect(onpointermissedB).toHaveBeenCalledOnce()
    expect(onpointermissedC).toHaveBeenCalledOnce()
  })

  it('fires onpointermissed for all objects when clicking empty space', async () => {
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()
    const onpointermissedC = vi.fn()

    const { context, container } = render(PointerMissedScene, {
      props: {
        onpointermissedA,
        onpointermissedB,
        onpointermissedC,
      },
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown in empty space → hits nothing
    pointer(target, 'pointerdown', 0, 0)
    await tick()

    // click at same position → hits nothing
    pointer(target, 'click', 0, 0)
    await tick()

    expect(onpointermissedA).toHaveBeenCalledOnce()
    expect(onpointermissedB).toHaveBeenCalledOnce()
    expect(onpointermissedC).toHaveBeenCalledOnce()
  })

  it('does not fire onpointermissed when the pointer was dragged', async () => {
    const onclickA = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()
    const onpointermissedC = vi.fn()

    const { context, container } = render(PointerMissedScene, {
      props: {
        onclickA,
        onpointermissedA,
        onpointermissedB,
        onpointermissedC,
      },
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center
    pointer(target, 'pointerdown', 100, 100)
    await tick()

    // click far away (delta > 2) — this is a drag, not a click
    pointer(target, 'click', 150, 150)
    await tick()

    expect(onclickA).not.toHaveBeenCalled()
    expect(onpointermissedA).not.toHaveBeenCalled()
    expect(onpointermissedB).not.toHaveBeenCalled()
    expect(onpointermissedC).not.toHaveBeenCalled()
  })

  it('does not fire onclick on an object that was not under the pointer at pointerdown', async () => {
    const onclickA = vi.fn()
    const onclickB = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()

    const { context, container } = render(PointerMissedScene, {
      props: {
        onclickA,
        onclickB,
        onpointermissedA,
        onpointermissedB,
      },
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown on mesh A
    pointer(target, 'pointerdown', 100, 100)
    await tick()

    // click at the same spot — mesh A was under pointerdown, so onclick fires.
    // Mesh B was NOT under pointerdown, so even though it's interactive, onclick
    // should not fire for it and it should receive pointermissed.
    pointer(target, 'click', 100, 100)
    await tick()

    expect(onclickA).toHaveBeenCalledOnce()
    expect(onclickB).not.toHaveBeenCalled()
    expect(onpointermissedA).not.toHaveBeenCalled()
    expect(onpointermissedB).toHaveBeenCalledOnce()
  })
})

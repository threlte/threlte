import { describe, it, expect, vi } from 'vitest'
import { tick } from 'svelte'
import { render } from '@threlte/test'
import { setupDom, pointer } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerMissed', () => {
  it('fires onpointermissed exactly once per object not under the pointer', async () => {
    const onclickA = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()
    const onpointermissedC = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA,
        onpointermissedA,
        onpointermissedB,
        onpointermissedC
      }
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

    const { context, container } = render(Scene, {
      props: {
        onpointermissedA,
        onpointermissedB,
        onpointermissedC
      }
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

  it('treats a small movement within the distance threshold as a click', async () => {
    const onclickA = vi.fn()
    const onpointermissedB = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA,
        onpointermissedB
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center
    pointer(target, 'pointerdown', 100, 100)
    await tick()

    // click 5px away (within the default 8px threshold) — still a click
    pointer(target, 'click', 105, 100)
    await tick()

    expect(onclickA).toHaveBeenCalledOnce()
    expect(onpointermissedB).toHaveBeenCalledOnce()
  })

  it('does not fire click or pointermissed when dragged beyond distance threshold', async () => {
    const onclickA = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA,
        onpointermissedA,
        onpointermissedB
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center
    pointer(target, 'pointerdown', 100, 100)
    await tick()

    // click 10px away (beyond the default 8px threshold) — treated as drag
    pointer(target, 'click', 110, 100)
    await tick()

    expect(onclickA).not.toHaveBeenCalled()
    expect(onpointermissedA).not.toHaveBeenCalled()
    expect(onpointermissedB).not.toHaveBeenCalled()
  })

  it('does not fire click or pointermissed when click arrives after time threshold', async () => {
    const onclickA = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA,
        onpointermissedA,
        onpointermissedB,
        clickTimeThreshold: 200
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // Stub performance.now to control time deterministically.
    // handleEvent reads it twice: once on pointerdown (to record), once on click (to check).
    const now = vi.spyOn(performance, 'now')
    now.mockReturnValueOnce(0) // pointerdown records t=0
    now.mockReturnValueOnce(300) // click checks elapsed: 300 > 200ms threshold

    pointer(target, 'pointerdown', 100, 100)
    pointer(target, 'click', 100, 100)
    await tick()

    expect(onclickA).not.toHaveBeenCalled()
    expect(onpointermissedA).not.toHaveBeenCalled()
    expect(onpointermissedB).not.toHaveBeenCalled()

    now.mockRestore()
  })

  it('does not fire onclick on an object that was not under the pointer at pointerdown', async () => {
    const onclickA = vi.fn()
    const onclickB = vi.fn()
    const onpointermissedA = vi.fn()
    const onpointermissedB = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        onclickA,
        onclickB,
        onpointermissedA,
        onpointermissedB
      }
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

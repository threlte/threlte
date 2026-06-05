import { tick } from 'svelte'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, wheel } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('onwheel', () => {
  it('fires when scrolling over a mesh', async () => {
    const onwheelA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onwheelA
      }
    })

    await setupDom(context)
    const target = context.dom

    // wheel at center — hits mesh A
    wheel(target, 100, 100, 120)
    await tick()

    expect(onwheelA).toHaveBeenCalledOnce()
  })

  it('does not fire when scrolling over empty space', async () => {
    const onwheelA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onwheelA
      }
    })

    await setupDom(context)
    const target = context.dom

    // wheel in top-left corner — hits nothing
    wheel(target, 0, 0, 120)
    await tick()

    expect(onwheelA).not.toHaveBeenCalled()
  })

  it('fires for every event in a scroll burst', async () => {
    const onwheelA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onwheelA
      }
    })

    await setupDom(context)
    const target = context.dom

    // A real scroll gesture fires many wheel events in quick succession.
    // Unlike pointermove, wheel is not throttled — each event should be delivered.
    wheel(target, 100, 100, 120)
    wheel(target, 100, 100, 120)
    wheel(target, 100, 100, 80)
    wheel(target, 100, 100, 40)
    wheel(target, 100, 100, 10)
    await tick()

    expect(onwheelA).toHaveBeenCalledTimes(5)

    // Each event should carry the correct deltaY from the native event
    const deltas = onwheelA.mock.calls.map((call) => call[0].nativeEvent.deltaY)
    expect(deltas).toEqual([120, 120, 80, 40, 10])
  })
})

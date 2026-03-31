import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { setupDom, pointer, tick } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

// See click.spec.ts for why pointerdown precedes contextmenu in these tests.

describe('contextmenu', () => {
  it('fires oncontextmenu when a mesh is right-clicked', async () => {
    const oncontextmenuA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        oncontextmenuA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown at center → hits mesh A
    pointer(target, 'pointerdown')
    await tick()

    // contextmenu at same position → should fire oncontextmenu on mesh A
    pointer(target, 'contextmenu')
    await tick()

    expect(oncontextmenuA).toHaveBeenCalledOnce()
  })

  it('does not fire oncontextmenu when right-clicking empty space', async () => {
    const oncontextmenuA = vi.fn()

    const { context, container } = render(Scene, {
      props: {
        oncontextmenuA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // pointerdown in empty space → hits nothing
    pointer(target, 'pointerdown', 0, 0)
    await tick()

    // contextmenu in empty space → should not fire oncontextmenu
    pointer(target, 'contextmenu', 0, 0)
    await tick()

    expect(oncontextmenuA).not.toHaveBeenCalled()
  })
})

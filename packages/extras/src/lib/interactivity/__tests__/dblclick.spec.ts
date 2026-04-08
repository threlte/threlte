import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

// See click.spec.ts for why pointerdown precedes dblclick in these tests.

describe('ondblclick', () => {
  it('fires ondblclick when a mesh is double-clicked', async () => {
    const ondblclickA = vi.fn()

    const { context } = render(Scene, {
      props: { ondblclickA }
    })

    await setupDom(context)
    const target = context.dom

    // pointerdown at center — records initialHits so dblclick knows what was under the pointer
    pointer(target, 'pointerdown')
    await tick()

    // dblclick at center — hits mesh A, which was also under pointerdown
    pointer(target, 'dblclick')
    await tick()

    expect(ondblclickA).toHaveBeenCalledOnce()
  })

  it('does not fire ondblclick when double-clicking empty space', async () => {
    const ondblclickA = vi.fn()

    const { context } = render(Scene, {
      props: { ondblclickA }
    })

    await setupDom(context)
    const target = context.dom

    // pointerdown in empty space (0,0) — no mesh under the pointer
    pointer(target, 'pointerdown', 0, 0)
    await tick()

    // dblclick in empty space (0,0) — nothing to fire on
    pointer(target, 'dblclick', 0, 0)
    await tick()

    expect(ondblclickA).not.toHaveBeenCalled()
  })
})

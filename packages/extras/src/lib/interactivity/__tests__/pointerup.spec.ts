import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerup', () => {
  it('fires onpointerup when releasing over a mesh', async () => {
    const onpointerupA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onpointerupA
      }
    })

    await setupDom(context)
    const target = context.dom

    // Release pointer at center — ray hits mesh A directly in front of the camera
    pointer(target, 'pointerup')
    await tick()

    expect(onpointerupA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerup when releasing over empty space', async () => {
    const onpointerupA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onpointerupA
      }
    })

    await setupDom(context)
    const target = context.dom

    // Release pointer at top-left corner — ray misses all meshes
    pointer(target, 'pointerup', 0, 0)
    await tick()

    expect(onpointerupA).not.toHaveBeenCalled()
  })
})

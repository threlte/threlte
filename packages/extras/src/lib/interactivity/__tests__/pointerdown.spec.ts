import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { setupDom, pointer } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('pointerdown', () => {
  it('fires onpointerdown when pressing on a mesh', async () => {
    const onpointerdownA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onpointerdownA
      }
    })

    await setupDom(context)
    const target = context.dom

    // Press down at center — ray hits mesh A directly in front of the camera
    pointer(target, 'pointerdown')
    await tick()

    expect(onpointerdownA).toHaveBeenCalledOnce()
  })

  it('does not fire onpointerdown when pressing on empty space', async () => {
    const onpointerdownA = vi.fn()

    const { context } = render(Scene, {
      props: {
        onpointerdownA
      }
    })

    await setupDom(context)
    const target = context.dom

    // Press down at top-left corner — ray misses all meshes
    pointer(target, 'pointerdown', 0, 0)
    await tick()

    expect(onpointerdownA).not.toHaveBeenCalled()
  })
})

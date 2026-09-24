import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { tick } from 'svelte'
import { Vector3 } from 'three'
import type { ThrelteContext } from '@threlte/core'
import type { WebGLRenderer } from 'three'
import { setupDom, pointer, nextFrame } from './helpers.js'
import BatchedScene from './__fixtures__/BatchedScene.svelte'

/**
 * Project a world position into the pixel coordinates that the default compute
 * function maps back onto the pointer, so the test doesn't depend on the
 * canvas size the runner happens to give us.
 */
const toScreen = (context: ThrelteContext<WebGLRenderer>, world: Vector3) => {
  const ndc = world.clone().project(context.camera.current)
  const { width, height } = context.size.current
  return [((ndc.x + 1) / 2) * width, ((1 - ndc.y) / 2) * height] as const
}

const leftInstance = new Vector3(-2, 0, -10)
const rightInstance = new Vector3(2, 0, -10)

describe('BatchedMesh interactivity', () => {
  it('fires pointerleave and pointerenter when moving between instances of one batch', async () => {
    const onpointerenter = vi.fn()
    const onpointerleave = vi.fn()

    const { context } = render(BatchedScene, {
      props: { onpointerenter, onpointerleave }
    })

    await setupDom(context)
    const target = context.dom

    const [leftX, leftY] = toScreen(context, leftInstance)
    const [rightX, rightY] = toScreen(context, rightInstance)

    pointer(target, 'pointermove', leftX, leftY)
    await tick()

    expect(onpointerenter).toHaveBeenCalledOnce()
    expect(onpointerleave).not.toHaveBeenCalled()

    // Moving to a different instance without leaving the batch. Both instances
    // share one Object3D, so only batchId distinguishes them.
    pointer(target, 'pointermove', rightX, rightY)
    await nextFrame()
    await tick()

    expect(onpointerleave).toHaveBeenCalledOnce()
    expect(onpointerenter).toHaveBeenCalledTimes(2)
  })

  it('does not re-fire pointerenter while staying on the same instance', async () => {
    const onpointerenter = vi.fn()
    const onpointerleave = vi.fn()

    const { context } = render(BatchedScene, {
      props: { onpointerenter, onpointerleave }
    })

    await setupDom(context)
    const target = context.dom

    const [leftX, leftY] = toScreen(context, leftInstance)

    pointer(target, 'pointermove', leftX, leftY)
    await tick()

    pointer(target, 'pointermove', leftX + 1, leftY)
    await nextFrame()
    await tick()

    expect(onpointerenter).toHaveBeenCalledOnce()
    expect(onpointerleave).not.toHaveBeenCalled()
  })
})

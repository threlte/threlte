import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { Raycaster, Vector2 } from 'three'
import { tick } from 'svelte'
import { setupDom, pointer } from './helpers.js'
import Scene from './__fixtures__/Scene.svelte'

describe('event data', () => {
  it('extends the native Three.js intersection with interactivity properties', async () => {
    const onpointerdownA = vi.fn()

    const { context, container, scene } = render(Scene, {
      props: {
        onpointerdownA
      }
    })

    await setupDom(context, container)
    const target = context.dom

    // Perform a manual raycast to get the native Three.js intersection
    const raycaster = new Raycaster()
    raycaster.setFromCamera(new Vector2(0, 0), context.camera.current)
    const threeHits = raycaster.intersectObjects(scene.children, true)
    const threeHit = threeHits[0]!

    // pointerdown at center → hits mesh A
    pointer(target, 'pointerdown')
    await tick()

    expect(onpointerdownA).toHaveBeenCalledOnce()
    const event = onpointerdownA.mock.calls[0]![0]

    // Should contain all native Three.js Intersection properties with matching values
    expect(event.object).toBe(threeHit.object)
    expect(event.distance).toBeCloseTo(threeHit.distance)
    expect(event.point.x).toBeCloseTo(threeHit.point.x)
    expect(event.point.y).toBeCloseTo(threeHit.point.y)
    expect(event.point.z).toBeCloseTo(threeHit.point.z)
    expect(event.face).toEqual(threeHit.face)

    // Should extend with interactivity-specific properties
    expect(event.eventObject).toBe(threeHit.object)
    expect(event.nativeEvent).toBeInstanceOf(PointerEvent)
    expect(event.nativeEvent.type).toBe('pointerdown')
    expect(event.ray).toBeDefined()
    expect(event.camera).toBe(context.camera.current)
    expect(event.pointer).toBeDefined()
    expect(event.stopped).toBe(false)
    expect(event.stopPropagation).toBeTypeOf('function')
    expect(event.stopImmediatePropagation).toBeTypeOf('function')
    expect(Array.isArray(event.intersections)).toBe(true)
  })
})

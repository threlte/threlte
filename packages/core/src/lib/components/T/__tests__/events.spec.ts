import { Group, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T.js'
import { tick } from 'svelte'

describe('<T> events', () => {
  it('fires an oncreate event', () => {
    const group = new Group()
    const oncreate = vi.fn()
    render(T, { props: { is: group, oncreate } })

    expect(oncreate).toHaveBeenCalledOnce()
    expect(oncreate).toHaveBeenCalledWith(group)
  })

  it('fires a cleanup event passed to oncreate on unmount', () => {
    const cleanup = vi.fn()
    const { unmount } = render(T.Group, { props: { oncreate: () => cleanup } })

    unmount()
    expect(cleanup).toHaveBeenCalledOnce()
  })

  it('does not fire the oncreate cleanup method until unmount or "is" changes', () => {
    const cleanup = vi.fn()
    render(T.Group, { props: { oncreate: () => cleanup } })

    expect(cleanup).toHaveBeenCalledTimes(0)
  })

  it('fires oncreate after properties have been set', () => {
    const reference = new PerspectiveCamera()
    reference.position.set(5, 5, 5)
    reference.lookAt(0, 0, 0)

    const oncreate = (ref: PerspectiveCamera) => ref.lookAt(0, 0, 0)
    const { scene } = render(T.PerspectiveCamera, { props: { position: [5, 5, 5], oncreate } })

    const camera = scene.getObjectByProperty('type', 'PerspectiveCamera')
    expect(camera?.matrix.elements).toStrictEqual(reference.matrix.elements)
  })

  it('fires an oncreate event if the Three.js object changes', async () => {
    const group1 = new Group()
    const oncreate = vi.fn()
    const { rerender } = render(T, { props: { is: group1, oncreate } })

    const group2 = new Group()
    await rerender({ is: group2 })

    expect(oncreate).toHaveBeenCalledTimes(2)
    expect(oncreate).toHaveBeenCalledWith(group2)
  })

  it('adds an event listener to the Three.js object if the prop begins with "on"', () => {
    const onchange = vi.fn()
    const controls = new OrbitControls(new PerspectiveCamera())

    render(T, { is: controls, onchange })
    controls.dispatchEvent({ type: 'change' })
    expect(onchange).toHaveBeenCalledOnce()
  })

  it('removes an event listener from the Three.js object if unmounted', async () => {
    const onchange = vi.fn()
    const controls = new OrbitControls(new PerspectiveCamera(), document.createElement('div'))

    const { unmount } = render(T, { is: controls, onchange })
    unmount()
    await tick()
    controls.dispatchEvent({ type: 'change' })
    expect(onchange).toHaveBeenCalledTimes(0)
  })
})

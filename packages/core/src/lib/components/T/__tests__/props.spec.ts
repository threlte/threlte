import { PerspectiveCamera, Group } from 'three'
import { describe, it, expect } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T.js'

describe('<T> props', () => {
  it('sets a prop on a Three.js instance', () => {
    const group = new Group()
    render(T, { props: { is: group, visible: false } })

    expect(group.visible).toBe(false)
  })

  it('sets a tuple prop', () => {
    const group = new Group()
    const position = [1, 2, 3]
    const quaternion = [4, 5, 6, 1]
    render(T, { props: { is: group, position, quaternion } })

    expect(group.position.toArray()).toStrictEqual(position)
    expect(group.quaternion.toArray()).toStrictEqual(quaternion)
  })

  it('sets a pierced prop', () => {
    const group = new Group()
    const x = 3
    const ry = 2
    render(T, { props: { is: group, 'position.x': x, 'rotation.y': ry } })

    expect(group.position.x).toBe(x)
    expect(group.rotation.y).toBe(ry)
  })

  it('updates props', async () => {
    const group = new Group()
    const { rerender } = render(T, {
      props: {
        is: group,
        visible: false,
        position: [0, 0, 0]
      }
    })

    expect(group.visible).toBe(false)

    await rerender({ visible: true })

    expect(group.visible).toBe(true)
    expect(group.position.toArray()).toStrictEqual([0, 0, 0])

    await rerender({ position: [1, 2, 3] })

    expect(group.visible).toBe(true)
    expect(group.position.toArray()).toStrictEqual([1, 2, 3])
  })

  it('updates a prop initially set to undefined', async () => {
    const group = new Group()
    const { rerender } = render(T, {
      props: { is: group, name: undefined, castShadow: undefined }
    })

    expect(group.name).toBe(undefined)
    expect(group.castShadow).toBe(undefined)
    await rerender({ name: 'group', castShadow: true })
    expect(group.name).toBe('group')
    expect(group.castShadow).toBe(true)
  })

  /**
   * @todo(mp) Strange behavior: why do we call updateProjectionMatrix only for non-manual
   * cameras in `useProps.ts`? Manual cameras need updates, non-manual cameras are already updated
   * in `useCamera.ts`.
   */
  it('does not update the projection matrix for a manual camera', async () => {
    const reference = new PerspectiveCamera()
    const { rerender, scene } = render(T.PerspectiveCamera, {
      props: { aspect: 1, manual: true }
    })

    const camera = scene.getObjectByProperty('type', 'PerspectiveCamera') as PerspectiveCamera
    expect(camera.projectionMatrix.toArray()).toStrictEqual(reference.projectionMatrix.toArray())

    await rerender({ aspect: 2 })
    expect(camera.aspect).toBe(2)

    reference.aspect = 2
    reference.updateProjectionMatrix()

    expect(camera.projectionMatrix.toArray()).not.toStrictEqual(
      reference.projectionMatrix.toArray()
    )

    camera.updateProjectionMatrix()

    expect(camera.projectionMatrix.toArray()).toStrictEqual(reference.projectionMatrix.toArray())
  })
})

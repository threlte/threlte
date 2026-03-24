import { Group, Mesh, MeshBasicMaterial } from 'three'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T.js'
import Scene from './__fixtures__/Scene.svelte'
import Attach from './__fixtures__/Attach.svelte'

describe('<T> attach', () => {
  it('attaches and detaches to an object that is passed to "attach"', () => {
    const parent = new Group()
    const group = new Group()

    const { unmount } = render(T, { props: { is: group, attach: parent } })

    expect(group.parent).toBe(parent)

    unmount()
    expect(group.parent).toBeFalsy()
  })

  it('does not attach if "attach"=false', () => {
    const group = new Group()

    const { scene } = render(T, { props: { is: group, attach: false } })

    expect(scene.getObjectByProperty('type', group.type)).toBeFalsy()
    expect(group.parent).toBeFalsy()
  })

  it('accepts a custom attach function with a cleanup method', () => {
    const group = new Group()
    const attach = vi.fn()

    const { scene } = render(T, { props: { is: group, attach } })

    expect(attach).toHaveBeenCalledOnce()
    expect(attach).toHaveBeenCalledWith({
      ref: group,
      parent: scene,
      parentObject3D: scene
    })

    const detach = vi.fn()
    const { unmount } = render(T.Group, { props: { attach: () => detach } })

    unmount()
    expect(detach).toHaveBeenCalledOnce()
  })

  it('auto-attaches and detaches a child Object3D', async () => {
    {
      const { scene, rerender } = render(Scene)

      const parent = scene.getObjectByName('parent')
      const child = scene.getObjectByName('child')
      expect(child?.parent).toBe(parent)

      await rerender({ attached: false })

      expect(child?.parent).toBeFalsy()
    }

    {
      const { scene, unmount } = render(Scene)

      const child = scene.getObjectByName('child')
      unmount()
      expect(child?.parent).toBeFalsy()
    }
  })

  it('auto-attaches and detaches a child Geometry and Material', () => {
    const { scene, unmount } = render(Scene)

    const mesh = scene.getObjectByName('child') as Mesh
    expect(mesh.geometry.name).toBe('geometry')
    expect((mesh.material as MeshBasicMaterial).name).toBe('material')

    unmount()
    expect(mesh.geometry.name).not.toBe('geometry')
    expect((mesh.material as MeshBasicMaterial).name).not.toBe('material')
  })

  it('attaches and detaches an object to a property if attach="property"', () => {
    const { scene, unmount } = render(Scene)

    const mesh = scene.getObjectByName('child') as Mesh
    const material = mesh.material as MeshBasicMaterial
    expect(material.map?.name).toBe('texture')

    unmount()
    expect(material.map).toBeFalsy()
  })

  it('attaches and detaches a conditionally rendered component', async () => {
    const { scene, rerender } = render(Attach, { props: { attach: false } })

    const parent = scene.getObjectByName('parent')
    expect(scene.getObjectByName('child')).toBeFalsy()
    expect(scene.getObjectByName('child2')).toBeTruthy()
    expect(parent?.children.length).toBe(1)

    await rerender({ attach: true })

    const child = scene.getObjectByName('child')
    expect(child?.parent).toBe(parent)
    expect(scene.getObjectByName('child2')).toBeFalsy()
    expect(parent?.children.length).toBe(2)

    await rerender({ attach: false })

    expect(child?.parent).toBeFalsy()
    expect(scene.getObjectByName('child')).toBeFalsy()
    expect(scene.getObjectByName('child2')).toBeTruthy()
    expect(parent?.children.length).toBe(1)
  })
})

import { BufferGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T'
import Scene from './Scene.svelte'
import { tick } from 'svelte'

/**
 * T Component
 */
describe('<T>', () => {
  it('creates a Three.js class instance from a class "is" argument', () => {
    const { scene } = render(T, { props: { is: Group } })

    expect(scene.getObjectByProperty('type', 'Group')).not.toBeFalsy()
  })

  it('creates a Three.js class when a property is invoked', () => {
    const { scene } = render(T.Group)

    expect(scene.getObjectByProperty('type', 'Group')).not.toBeFalsy()
  })

  it('reuses a Three.js class instance passed to an "is" argument', () => {
    const group = new Group()
    const { scene } = render(T, { props: { is: group } })

    expect(scene.getObjectByProperty('type', group.type)).toBe(group)
  })

  it('passes "args" to a class constructor', () => {
    const geometry = new BufferGeometry()
    const material = new MeshBasicMaterial()
    const { scene } = render(T.Mesh, { props: { args: [geometry, material] } })

    const mesh = scene.getObjectByProperty('type', 'Mesh') as Mesh
    expect(mesh.geometry).toBe(geometry)
    expect(mesh.material).toBe(material)
  })
})

/**
 * Events
 */
describe('<T> events', () => {
  it('fires an oncreate event', () => {
    const group = new Group()
    const oncreate = vi.fn()
    render(T, { props: { is: group, oncreate } })

    expect(oncreate).toHaveBeenCalledOnce()
    expect(oncreate).toHaveBeenCalledWith(group)
  })

  it('fires a cleanup event passed to oncreate', () => {
    const cleanup = vi.fn()
    const { unmount } = render(T.Group, {
      props: { oncreate: () => cleanup }
    })

    unmount()
    expect(cleanup).toHaveBeenCalledOnce()
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
    const handler = vi.fn()
    const controls = new OrbitControls(new PerspectiveCamera())

    render(T, { is: controls, onchange: handler })
    controls.dispatchEvent({ type: 'change' })
    expect(handler).toHaveBeenCalledOnce()
  })
})

/**
 * Attach
 */
describe('<T> attach', () => {
  it('attaches and detaches to an object that is passed to "attach"', () => {
    const parent = new Group()
    const group = new Group()

    const { unmount } = render(T, { props: { is: group, attach: parent } })

    expect(group.parent).toBe(parent)

    unmount()
    expect(group.parent).toBeFalsy()
  })

  it('is not added if "attach"=false', () => {
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
    const { scene, rerender } = render(Scene)

    const parent = scene.getObjectByName('parent')
    const child = scene.getObjectByName('child')
    expect(child?.parent).toBe(parent)

    await rerender({ attached: false })

    expect(child?.parent).toBeFalsy()
  })

  it('auto-attaches a child Geometry and Material', () => {
    const { scene } = render(Scene)

    const mesh = scene.getObjectByName('child') as Mesh
    expect(mesh.geometry.name).toBe('geometry')
    expect((mesh.material as MeshBasicMaterial).name).toBe('material')
  })

  it('attaches and detatches an object to a property if attach="property"', () => {
    const { scene, unmount } = render(Scene)

    const mesh = scene.getObjectByName('child') as Mesh
    const material = mesh.material as MeshBasicMaterial
    expect(material.map?.name).toBe('texture')

    unmount()
    expect(material.map).toBeFalsy()
  })
})

describe('<T> dispose', () => {
  it('disposes any object with a dispose method on unmount', async () => {
    const { scene, unmount } = render(Scene)

    const onDisposeGeometry = vi.fn()
    const onDisposeMaterial = vi.fn()
    const onDisposeTexture = vi.fn()
    const mesh = scene.getObjectByName('child') as Mesh
    const material = mesh.material as MeshBasicMaterial
    mesh.geometry.addEventListener('dispose', onDisposeGeometry)
    material.addEventListener('dispose', onDisposeMaterial)
    material.map?.addEventListener('dispose', onDisposeTexture)

    unmount()
    await tick()
    expect(onDisposeGeometry).toHaveBeenCalledOnce()
    expect(onDisposeMaterial).toHaveBeenCalledOnce()
    expect(onDisposeTexture).toHaveBeenCalledOnce()
  })

  it('does not dispose an object with "dispose"=false', async () => {
    const onDispose = vi.fn()
    const material = new MeshBasicMaterial()
    const { unmount } = render(T, { props: { is: material, dispose: false } })

    material.addEventListener('dispose', onDispose)
    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(0)
  })

  it('disposes all objects passed to "is" on unmount', async () => {
    const onDispose = vi.fn()
    const material1 = new MeshBasicMaterial()
    material1.addEventListener('dispose', onDispose)

    const { rerender, unmount } = render(T, { is: material1 })

    const material2 = new MeshBasicMaterial()
    material2.addEventListener('dispose', onDispose)

    await rerender({ is: material2 })
    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(2)
  })
})

/**
 * Camera
 */
describe('<T> camera', () => {
  it('is set as the default camera if "makeDefault"=true', () => {
    const { scene, context } = render(T.PerspectiveCamera, { props: { makeDefault: true } })

    const camera = scene.getObjectByProperty('type', 'PerspectiveCamera')
    expect(context.camera.current).toBe(camera)
  })

  it('does not change the default camera if a camera is added', () => {
    const { scene, context } = render(T.PerspectiveCamera)

    const camera = scene.getObjectByProperty('type', 'PerspectiveCamera')
    expect(context.camera.current).not.toBe(camera)
  })
})

/**
 * Props
 */
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

/**
 * Plugins
 */
describe('<T> plugins', () => {
  it('calls a plugin callback for every T instance', () => {
    const fn = vi.fn()
    render(Scene, { props: { plugin: { fn } } })

    expect(fn).toHaveBeenCalledTimes(5)
  })

  it('passes a reference and props to a plugin callback', () => {
    const fn = vi.fn()
    const { scene } = render(Scene, { props: { plugin: { fn, props: ['lookat'] } } })

    const ref = scene.getObjectByName('child') as Mesh
    expect(fn).toHaveBeenNthCalledWith(2, {
      ref,
      args: undefined,
      attach: undefined,
      dispose: undefined,
      props: {
        lookat: [0, 0, 0],
        name: 'child'
      },

      /** @todo(mp) Should these two only exist on cameras components? */
      makeDefault: false,
      manual: false
    })

    /**
     * @todo(mp) This is strange, should this be called for
     * every component even though this is just for "lookat" props?
     *
     * I would expect it to be called once.
     * */
    expect(fn).toHaveBeenCalledTimes(5)
  })
})

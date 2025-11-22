import { Mesh, MeshBasicMaterial } from 'three'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T.js'
import Scene from './__fixtures__/Scene.svelte'
import { tick } from 'svelte'
import Dispose from './__fixtures__/Dispose.svelte'
import DisposeMany from './__fixtures__/DisposeMany.svelte'
import DisposeN from './__fixtures__/DisposeN.svelte'

describe('<T> dispose', () => {
  it('does not dispose an object with "dispose"=false', async () => {
    const onDispose = vi.fn()
    const material = new MeshBasicMaterial()
    const { unmount } = render(T, { props: { is: material, dispose: false } })

    material.addEventListener('dispose', onDispose)
    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(0)
  })

  it('does not dispose any child objects if "dispose"=false is set on the parent', async () => {
    const onDispose = vi.fn()
    const { unmount, scene } = render(Scene, { dispose: false })

    const mesh = scene.getObjectByName('child') as Mesh
    mesh.geometry.addEventListener('dispose', onDispose)
    const material = mesh.material as MeshBasicMaterial
    material.addEventListener('dispose', onDispose)
    material.map?.addEventListener('dispose', onDispose)

    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(0)
  })

  it('does not dispose if "dispose" is set to false later in the component lifecycle', async () => {
    const onDispose = vi.fn()
    const { unmount, advance, rerender, scene } = render(Scene, { dispose: true })

    const mesh = scene.getObjectByName('child') as Mesh
    mesh.geometry.addEventListener('dispose', onDispose)
    const material = mesh.material as MeshBasicMaterial
    material.addEventListener('dispose', onDispose)
    material.map?.addEventListener('dispose', onDispose)

    await rerender({ dispose: false })
    advance()

    expect(onDispose).toHaveBeenCalledTimes(0)

    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(0)
  })

  it('disposes objects automatically if they have no "dispose" property', async () => {
    const { scene, unmount } = render(DisposeMany)

    const onDispose = vi.fn()
    const box = scene.getObjectByName('box') as Mesh
    const plane = scene.getObjectByName('plane') as Mesh

    box.geometry.addEventListener('dispose', onDispose)
    {
      const material = box.material as MeshBasicMaterial
      material.addEventListener('dispose', onDispose)
      material.map?.addEventListener('dispose', onDispose)
    }

    plane.geometry.addEventListener('dispose', onDispose)
    {
      const material = plane.material as MeshBasicMaterial
      material.addEventListener('dispose', onDispose)
    }

    unmount()
    await tick()

    expect(onDispose).toHaveBeenCalledTimes(5)
  })

  it('disposes all objects passed to "is" on unmount', async () => {
    const onDispose = vi.fn()
    const material1 = new MeshBasicMaterial()
    material1.addEventListener('dispose', onDispose)

    const { rerender, advance, unmount } = render(T, { is: material1 })

    const material2 = new MeshBasicMaterial()
    material2.addEventListener('dispose', onDispose)

    await rerender({ is: material2 })
    advance()

    expect(onDispose).toHaveBeenCalledTimes(0)

    unmount()
    await tick()

    expect(onDispose).toHaveBeenCalledTimes(2)
  })

  it('disposes properly if "is" switches between disposable and non-disposable objects', async () => {
    const mesh = new Mesh()

    const { rerender, unmount, advance } = render(Dispose, { is: mesh })

    const onDispose = vi.fn()
    const material = new MeshBasicMaterial()
    material.addEventListener('dispose', onDispose)

    await rerender({ is: material })
    advance()

    expect(onDispose).toHaveBeenCalledTimes(0)

    unmount()
    await tick()

    expect(onDispose).toHaveBeenCalledOnce()
  })

  it('does not dispose until the mount count becomes zero', async () => {
    const { scene, rerender, unmount, advance } = render(DisposeN, { props: { count: 4 } })

    const onDispose = vi.fn()
    const meshes = scene.getObjectsByProperty('type', 'Mesh') as Mesh[]
    for (const mesh of meshes) {
      mesh.geometry.addEventListener('dispose', onDispose)
    }

    await rerender()
    advance()
    expect(onDispose).toHaveBeenCalledTimes(0)

    await rerender({ count: 3 })
    advance()
    expect(onDispose).toHaveBeenCalledTimes(1)

    await rerender({ count: 2 })
    advance()
    expect(onDispose).toHaveBeenCalledTimes(2)

    unmount()
    await tick()
    expect(onDispose).toHaveBeenCalledTimes(4)
  })
})

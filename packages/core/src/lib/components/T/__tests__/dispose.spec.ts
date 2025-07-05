import { Mesh, MeshBasicMaterial } from 'three'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T'
import Scene from './Scene.svelte'
import { tick } from 'svelte'

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

  it('does not dipose any child objects if "dispose"=false', async () => {
    const onDispose = vi.fn()
    const { unmount, scene } = render(Scene, { dispose: false })

    const mesh = scene.getObjectByName('child') as Mesh
    mesh.geometry.addEventListener('dispose', onDispose)
    const material = mesh.material as MeshBasicMaterial
    material.addEventListener('dispose', onDispose)
    material.map?.addEventListener('dispose', onDispose)

    unmount()
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

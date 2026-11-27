import { BoxGeometry, type Mesh, MeshStandardMaterial } from 'three'
import { describe, expect, it, vi } from 'vitest'

import { render } from '../../lib'
import Subject from '../Scene.svelte'

describe('Scene', () => {
  it('creates an ambient and directional light', () => {
    const { scene } = render(Subject)

    expect(scene.getObjectByProperty('isAmbientLight', true)).toBeDefined()
    expect(scene.getObjectByProperty('isDirectionalLight', true)).toBeDefined()
  })

  it('creates a box mesh with a boxGeometry and meshStandardMaterial', () => {
    const { scene } = render(Subject)

    const mesh = scene.getObjectByProperty('isMesh', true) as Mesh
    expect(mesh).toBeDefined()
    expect(mesh.material).toBeInstanceOf(MeshStandardMaterial)
    expect(mesh.geometry).toBeInstanceOf(BoxGeometry)
  })

  it('updates position', async () => {
    const { scene, rerender } = render(Subject, { props: { x: 1 } })

    const mesh = scene.getObjectByProperty('isMesh', true) as Mesh
    expect(mesh.position.x).toBe(1)

    await rerender({ x: 2 })

    expect(mesh.position.x).toBe(2)
  })

  it('creates a default perspective camera at position [1, 1, 1]', () => {
    const { camera } = render(Subject)

    expect(camera.current.position.toArray()).toStrictEqual([1, 1, 1])
  })

  it('rotates the box mesh on the x and y axis by the frame delta on each frame', () => {
    const { scene, advance } = render(Subject)

    const mesh = scene.getObjectByProperty('isMesh', true) as Mesh
    expect(mesh.rotation.x).toBe(0)
    expect(mesh.rotation.y).toBe(0)

    advance()

    expect(mesh.rotation.x).toBe(0.016)
    expect(mesh.rotation.y).toBe(0.016)
  })

  it('calls the onclick callback when the box mesh is clicked', async () => {
    const onclick = vi.fn()
    const { scene, fireEvent } = render(Subject, { props: { onclick } })

    const mesh = scene.getObjectByProperty('isMesh', true) as Mesh
    await fireEvent(mesh, 'click')
    expect(onclick).toHaveBeenCalledOnce()
  })
})

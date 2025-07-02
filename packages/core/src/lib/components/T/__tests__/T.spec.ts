import { BufferGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import { extend, T } from '../T'

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

  it('extends the Three.js catalogue', () => {
    extend({ OrbitControls })

    const oncreate = vi.fn()
    render(T.OrbitControls, {
      props: { oncreate, args: [new PerspectiveCamera(), document.createElement('div')] }
    })

    expect(oncreate).toHaveBeenCalledOnce()
  })
})

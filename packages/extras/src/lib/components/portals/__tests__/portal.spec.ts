import { render } from '@threlte/test'
import { tick } from 'svelte'
import type { Object3D } from 'three'
import { describe, expect, it } from 'vitest'
import PortalOrder from './__fixtures__/PortalOrder.svelte'

describe('<Portal>', () => {
  it('renders portal children in insertion order', async () => {
    const { scene } = render(PortalOrder)

    await tick()

    expect(scene.children.map((child: Object3D) => child.name).filter(Boolean)).toEqual([
      'first',
      'second'
    ])
  })
})

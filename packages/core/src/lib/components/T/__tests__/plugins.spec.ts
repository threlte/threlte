import { Mesh } from 'three'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@threlte/test'
import Scene from './__fixtures__/Scene.svelte'

describe('<T> plugins', () => {
  it('calls a plugin callback for every T instance', () => {
    const fn = vi.fn()
    render(Scene, { props: { plugin: { fn } } })

    expect(fn).toHaveBeenCalledTimes(6)
  })

  it('passes a reference and props to a plugin callback', () => {
    const fn = vi.fn()
    const { scene } = render(Scene, { props: { plugin: { fn, props: ['lookat'] } } })

    const ref = scene.getObjectByName('child') as Mesh
    expect(fn).toHaveBeenNthCalledWith(3, {
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
    expect(fn).toHaveBeenCalledTimes(6)
  })
})

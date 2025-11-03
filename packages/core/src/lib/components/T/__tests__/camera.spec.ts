import { OrthographicCamera, PerspectiveCamera } from 'three'
import { describe, it, expect } from 'vitest'
import { render } from '@threlte/test'
import { T } from '../T.js'
import Camera from './__fixtures__/Camera.svelte'

describe('<T> camera', () => {
  it('does not change the default camera if a camera is added', () => {
    {
      const { scene, context } = render(T.PerspectiveCamera)

      const camera = scene.getObjectByProperty('type', 'PerspectiveCamera')
      expect(context.camera.current).not.toBe(camera)
    }

    {
      const { scene, context } = render(T.OrthographicCamera)

      const camera = scene.getObjectByProperty('type', 'OrthographicCamera')
      expect(context.camera.current).not.toBe(camera)
    }
  })

  it('returns to the default camera if no cameras have "makeDefault"=true', async () => {
    const { context, rerender } = render(T.PerspectiveCamera, {
      props: { makeDefault: false }
    })
    const defaultCamera = context.camera.current

    await rerender({ makeDefault: true })
    await rerender({ makeDefault: false })

    expect(context.camera.current).toBe(defaultCamera)
  })

  it('changes the default camera based on the "makeDefault" prop', async () => {
    {
      const { scene, context, rerender } = render(T.PerspectiveCamera, {
        props: { makeDefault: false }
      })

      const camera = scene.getObjectByProperty('type', 'PerspectiveCamera') as PerspectiveCamera
      expect(context.camera.current).not.toBe(camera)

      await rerender({ makeDefault: true })

      expect(context.camera.current).toBe(camera)
    }

    {
      const { scene, context, rerender } = render(T.OrthographicCamera, {
        props: { makeDefault: false }
      })

      const defaultCamera = context.camera.current
      const camera = scene.getObjectByProperty('type', 'OrthographicCamera') as OrthographicCamera
      expect(context.camera.current).toBe(defaultCamera)

      await rerender({ makeDefault: true })

      expect(context.camera.current).toBe(camera)
    }
  })

  it('swaps between two cameras rendered conditionally with makeDefault="true"', async () => {
    const { scene, camera, rerender } = render(Camera, { props: { perspective: true } })

    const perspective = scene.getObjectByProperty('type', 'PerspectiveCamera')
    expect(camera.current).toBe(perspective)

    await rerender({ perspective: false })

    const orthographic = scene.getObjectByProperty('type', 'OrthographicCamera')
    expect(camera.current).toBe(orthographic)
  })

  it('does not update camera props if "manual"=true', () => {
    {
      const reference = new PerspectiveCamera()
      const { scene } = render(T.PerspectiveCamera, { props: { manual: true } })

      const camera = scene.getObjectByProperty('type', 'PerspectiveCamera') as PerspectiveCamera
      expect(camera.projectionMatrix.toArray()).toStrictEqual(reference.projectionMatrix.toArray())
    }

    {
      const reference = new OrthographicCamera()
      const { scene } = render(T.OrthographicCamera, { props: { manual: true } })

      const camera = scene.getObjectByProperty('type', 'OrthographicCamera') as OrthographicCamera
      expect(camera.projectionMatrix.toArray()).toStrictEqual(reference.projectionMatrix.toArray())
    }
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from '../../../index.js'
import { ViewportGizmo } from '../viewportGizmo/ViewportGizmo.js'
import { orthographicExtent, spherePointDistance, turnRate } from '../viewportGizmo/constants.js'

// The supported Three r172–r178 releases do not export Timer. Keep that
// constraint even when running the suite with the workspace's newer Three.
vi.mock('three', async (importOriginal) => {
  const three = await importOriginal<typeof import('three')>()
  return Object.fromEntries(Object.entries(three).filter(([name]) => name !== 'Timer'))
})

const cleanups: (() => void)[] = []

afterEach(() => {
  for (const cleanup of cleanups.splice(0).reverse()) cleanup()
  vi.restoreAllMocks()
})

const setup = (speed = 1, animated = true) => {
  const container = document.createElement('div')
  Object.assign(container.style, { position: 'relative', width: '400px', height: '400px' })
  document.body.appendChild(container)
  cleanups.push(() => container.remove())

  const renderer = new WebGLRenderer()
  renderer.setSize(400, 400)
  container.appendChild(renderer.domElement)
  cleanups.push(() => {
    renderer.dispose()
    renderer.forceContextLoss()
  })

  const camera = new PerspectiveCamera()
  camera.position.set(0, 0, 5)
  const gizmo = new ViewportGizmo(camera, renderer, { container, speed, animated })
  cleanups.push(() => gizmo.dispose())
  gizmo.render()

  // The camera initially faces -Z, so the +X sphere is to the right of center.
  const clickXAxis = () => {
    const rect = gizmo.domElement.getBoundingClientRect()
    const event = {
      bubbles: true,
      clientX: rect.left + (rect.width / 2) * (1 + spherePointDistance / orthographicExtent),
      clientY: rect.top + rect.height / 2
    }
    gizmo.domElement.dispatchEvent(new PointerEvent('pointerdown', event))
    document.dispatchEvent(new PointerEvent('pointerup', event))
  }

  return { camera, gizmo, clickXAxis }
}

describe('ViewportGizmo timing without THREE.Timer', () => {
  it('keeps the extras root import usable without Timer', () => {
    expect(OrbitControls).toBeDefined()
    const { gizmo } = setup()
    expect(gizmo.animating).toBe(false)
  })

  it.each([0.5, 1, 2])('starts each animation from the click time at speed %s', (speed) => {
    let now = 1000
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    const { camera, gizmo, clickXAxis } = setup(speed)
    const end = vi.fn()
    gizmo.addEventListener('end', end)

    for (let cycle = 0; cycle < 2; cycle++) {
      camera.position.set(0, 0, 5)
      camera.lookAt(new Vector3())
      gizmo.cameraUpdate().render()
      const start = camera.quaternion.clone()

      // Time spent idle must not be included in either animation's first step.
      now += 60_000
      clickXAxis()
      expect(gizmo.animating).toBe(true)
      gizmo.render()
      expect(camera.quaternion.angleTo(start)).toBeCloseTo(0)

      now += 16
      gizmo.render()
      expect(camera.quaternion.angleTo(start)).toBeCloseTo(0.016 * turnRate * speed)
      expect(camera.position.length()).toBeCloseTo(5)
      expect(gizmo.animating).toBe(true)

      now += 1000 / speed
      gizmo.render()
      expect(gizmo.animating).toBe(false)
      expect(camera.position.x).toBeCloseTo(5)
      expect(camera.position.y).toBeCloseTo(0)
      expect(camera.position.z).toBeCloseTo(0)
      expect(end).toHaveBeenCalledTimes(cycle + 1)
    }
  })

  it('still applies non-animated orientation changes immediately', () => {
    const { camera, gizmo, clickXAxis } = setup(1, false)
    clickXAxis()
    gizmo.render()
    expect(gizmo.animating).toBe(false)
    expect(camera.position.x).toBeCloseTo(5)
    expect(camera.position.z).toBeCloseTo(0)
  })
})

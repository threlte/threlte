import { afterEach, describe, expect, it, vi } from 'vitest'
import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from '../../../index.js'
import { ViewportGizmo } from '../viewportGizmo/ViewportGizmo.js'
import {
  maxDelta,
  orthographicExtent,
  spherePointDistance,
  turnRate
} from '../viewportGizmo/constants.js'

// The supported Three r172–r178 releases do not export Timer. Keep that
// constraint even when running the suite with the workspace's newer Three.
vi.mock('three', async (importOriginal) => {
  const three = await importOriginal<typeof import('three')>()
  return Object.fromEntries(Object.entries(three).filter(([name]) => name !== 'Timer'))
})

const cleanups: (() => void)[] = []

afterEach(() => {
  for (const cleanup of cleanups.splice(0).reverse()) {
    try {
      cleanup()
    } catch {
      // Releasing the remaining resources matters more than one failed teardown.
    }
  }

  vi.restoreAllMocks()
})

const nextFrame = () => new Promise(requestAnimationFrame)

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

  const clickAt = (clientX: number, clientY: number) => {
    const event = { bubbles: true, clientX, clientY }
    gizmo.domElement.dispatchEvent(new PointerEvent('pointerdown', event))
    document.dispatchEvent(new PointerEvent('pointerup', event))
  }

  // The camera initially faces -Z, so the +X sphere is to the right of center.
  const clickXAxis = () => {
    const rect = gizmo.domElement.getBoundingClientRect()
    clickAt(
      rect.left + (rect.width / 2) * (1 + spherePointDistance / orthographicExtent),
      rect.top + rect.height / 2
    )
  }

  return { camera, gizmo, clickAt, clickXAxis }
}

describe('ViewportGizmo timing without THREE.Timer', () => {
  it('keeps the extras root import usable without Timer', () => {
    expect(OrbitControls).toBeDefined()
  })

  it.each([0.5, 1, 2])('starts each animation from the click time at speed %s', async (speed) => {
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

      // A quarter turn at turnRate takes 0.25s, one measured frame at a time.
      let frames = 0
      while (gizmo.animating && frames < 200) {
        now += 16
        gizmo.render()
        frames += 1
      }

      expect(frames * 0.016).toBeCloseTo(0.25 / speed - 0.016, 1)
      expect(camera.position.x).toBeCloseTo(5)
      expect(camera.position.y).toBeCloseTo(0)
      expect(camera.position.z).toBeCloseTo(0)

      await nextFrame()
      expect(end).toHaveBeenCalledTimes(cycle + 1)
    }
  })

  it('advances by the delta the render task passes in', () => {
    const { camera, gizmo, clickXAxis } = setup()
    camera.lookAt(new Vector3())
    gizmo.cameraUpdate().render()
    const start = camera.quaternion.clone()

    clickXAxis()
    gizmo.render(0.02)

    expect(gizmo.animating).toBe(true)
    expect(camera.quaternion.angleTo(start)).toBeCloseTo(0.02 * turnRate)
  })

  it('clamps a long gap between frames instead of snapping to the target', () => {
    let now = 1000
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    const { camera, gizmo, clickXAxis } = setup()
    camera.lookAt(new Vector3())
    gizmo.cameraUpdate().render()
    const start = camera.quaternion.clone()

    clickXAxis()
    gizmo.render()

    // A backgrounded tab stops rendering while the clock keeps running.
    now += 10_000
    gizmo.render()

    expect(gizmo.animating).toBe(true)
    expect(camera.quaternion.angleTo(start)).toBeCloseTo(maxDelta * turnRate)
  })

  it('dispatches the final change before end', async () => {
    let now = 1000
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    const { gizmo, clickXAxis } = setup()
    const events: string[] = []
    gizmo.addEventListener('change', () => events.push('change'))
    gizmo.addEventListener('end', () => events.push('end'))

    clickXAxis()

    let frames = 0
    while (gizmo.animating && frames < 200) {
      now += 100
      gizmo.render()
      frames += 1
    }

    await nextFrame()

    expect(events.at(-2)).toBe('change')
    expect(events.at(-1)).toBe('end')
  })

  it('ends the interaction when a click misses every indicator', () => {
    const { gizmo, clickAt } = setup()
    const start = vi.fn()
    const end = vi.fn()
    gizmo.addEventListener('start', start)
    gizmo.addEventListener('end', end)

    // The widget is a square element, so no indicator ever reaches its corner.
    const rect = gizmo.domElement.getBoundingClientRect()
    clickAt(rect.left + 1, rect.top + 1)

    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
    expect(gizmo.animating).toBe(false)
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

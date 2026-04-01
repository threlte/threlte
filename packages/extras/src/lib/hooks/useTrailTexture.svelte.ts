import { useTask, useThrelte } from '@threlte/core'
import { CanvasTexture } from 'three'

type Point = {
  x: number
  y: number
  age: number
  force: number
}

export type TrailTextureConfig = {
  /** Texture resolution (default: 256) */
  size?: number
  /** Max age (ms) of trail points (default: 750) */
  maxAge?: number
  /** Trail radius (default: 0.3) */
  radius?: number
  /** Canvas trail opacity (default: 0.2) */
  intensity?: number
  /** Add interpolated points between sparse pointer events (default: 0) */
  interpolate?: number
  /** Moving average smoothing factor for pointer force (default: 0) */
  smoothing?: number
  /** Minimum pointer force (default: 0.3) */
  minForce?: number
  /** Canvas blend mode (default: 'screen') */
  blend?: CanvasRenderingContext2D['globalCompositeOperation']
  /** Easing function for intensity falloff (default: easeCircOut) */
  ease?: (t: number) => number
}

function smoothAverage(current: number, measurement: number, smoothing: number = 0.9) {
  return measurement * smoothing + current * (1.0 - smoothing)
}

const easeCircleOut = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2))

class TrailTexture {
  trail: Point[] = []
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  texture: CanvasTexture
  force = 0

  size: number
  maxAge: number
  radius: number
  intensity: number
  ease: (t: number) => number
  minForce: number
  interpolate: number
  smoothing: number
  blend: CanvasRenderingContext2D['globalCompositeOperation']

  constructor({
    size = 256,
    maxAge = 750,
    radius = 0.3,
    intensity = 0.2,
    interpolate = 0,
    smoothing = 0,
    minForce = 0.3,
    blend = 'screen',
    ease = easeCircleOut
  }: TrailTextureConfig = {}) {
    this.size = size
    this.maxAge = maxAge
    this.radius = radius
    this.intensity = intensity
    this.ease = ease
    this.interpolate = interpolate
    this.smoothing = smoothing
    this.minForce = minForce
    this.blend = blend

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = this.size

    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2D canvas context')

    this.ctx = ctx
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.size, this.size)

    this.texture = new CanvasTexture(this.canvas)
  }

  update(delta: number) {
    this.clear()

    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i]!.age += delta * 1000
      if (this.trail[i]!.age > this.maxAge) {
        this.trail.splice(i, 1)
      }
    }

    if (!this.trail.length) this.force = 0

    for (const point of this.trail) {
      this.drawTouch(point)
    }

    this.texture.needsUpdate = true
  }

  clear() {
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.size, this.size)
  }

  addTouch(x: number, y: number) {
    const last = this.trail[this.trail.length - 1]

    if (last) {
      const dx = last.x - x
      const dy = last.y - y
      const dd = dx * dx + dy * dy

      const force = Math.max(this.minForce, Math.min(dd * 10000, 1))
      this.force = smoothAverage(force, this.force, this.smoothing)

      if (this.interpolate) {
        const lines = Math.ceil(dd / Math.pow((this.radius * 0.5) / this.interpolate, 2))
        if (lines > 1) {
          for (let i = 1; i < lines; i++) {
            this.trail.push({
              x: last.x - (dx / lines) * i,
              y: last.y - (dy / lines) * i,
              age: 0,
              force
            })
          }
        }
      }
    }

    this.trail.push({ x, y, age: 0, force: this.force })
  }

  drawTouch(point: Point) {
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size
    }

    let intensity = 1
    if (point.age < this.maxAge * 0.3) {
      intensity = this.ease(point.age / (this.maxAge * 0.3))
    } else {
      intensity = this.ease(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7))
    }

    intensity *= point.force

    this.ctx.globalCompositeOperation = this.blend

    const radius = this.size * this.radius * intensity
    const grd = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      Math.max(0, radius * 0.25),
      pos.x,
      pos.y,
      Math.max(0, radius)
    )
    grd.addColorStop(0, `rgba(255, 255, 255, ${this.intensity})`)
    grd.addColorStop(1, `rgba(0, 0, 0, 0.0)`)

    this.ctx.beginPath()
    this.ctx.fillStyle = grd
    this.ctx.arc(pos.x, pos.y, Math.max(0, radius), 0, Math.PI * 2)
    this.ctx.fill()
  }
}

export function useTrailTexture(config?: () => TrailTextureConfig | undefined) {
  const { invalidate } = useThrelte()
  const trail = new TrailTexture(config?.() ?? {})

  $effect(() => {
    const c = config?.() ?? {}
    trail.maxAge = c.maxAge ?? 750
    trail.radius = c.radius ?? 0.3
    trail.intensity = c.intensity ?? 0.2
    trail.interpolate = c.interpolate ?? 0
    trail.smoothing = c.smoothing ?? 0
    trail.minForce = c.minForce ?? 0.3
    trail.blend = c.blend ?? 'screen'
    trail.ease = c.ease ?? easeCircleOut
  })

  useTask(
    (delta) => {
      trail.update(delta)
      if (trail.trail.length > 0) {
        invalidate()
      }
    },
    { autoInvalidate: false }
  )

  const setTrail = (x: number, y: number) => {
    trail.addTouch(x, y)
  }

  const onPointerMove = (event: { uv?: { x: number; y: number } }) => {
    if (event.uv) {
      setTrail(event.uv.x, event.uv.y)
    }
  }

  return {
    texture: trail.texture,
    onPointerMove,
    setTrail
  }
}

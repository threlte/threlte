import { Vector2, PlaneGeometry } from 'three'

export class BentPlaneGeometry extends PlaneGeometry {
  constructor(radius: number, ...args: ConstructorParameters<typeof PlaneGeometry>) {
    super(...args)

    const p = this.parameters
    const hw = p.width * 0.5
    const a = new Vector2(-hw, 0)
    const b = new Vector2(0, radius)
    const c = new Vector2(hw, 0)
    const ab = new Vector2().subVectors(a, b)
    const bc = new Vector2().subVectors(b, c)
    const ac = new Vector2().subVectors(a, c)
    const r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)))
    const center = new Vector2(0, radius - r)
    const baseV = new Vector2().subVectors(a, center)
    const baseAngle = baseV.angle() - Math.PI * 0.5
    const arc = baseAngle * 2
    const uv = this.getAttribute('uv')
    const pos = this.getAttribute('position')
    const mainV = new Vector2()

    for (let i = 0; i < uv.count; i += 1) {
      const uvRatio = 1 - uv.getX(i)
      const y = pos.getY(i)
      mainV.copy(c).rotateAround(center, arc * uvRatio)
      pos.setXYZ(i, mainV.x, y, -mainV.y)
    }

    pos.needsUpdate = true
  }
}

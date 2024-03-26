<script lang="ts">
  import { Vector2, PlaneGeometry } from 'three'
  import { T } from '@threlte/core'
  import type { BufferAttribute } from 'three'

  export let args: any[]

  class BentPlaneGeometry extends PlaneGeometry {
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
      const uv = this.attributes.uv as BufferAttribute
      const pos = this.attributes.position as BufferAttribute
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
</script>

<T
  is={BentPlaneGeometry}
  {args}
>
  <slot />
</T>

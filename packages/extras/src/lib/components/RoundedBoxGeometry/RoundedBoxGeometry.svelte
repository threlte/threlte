<script lang='ts'>

import { Shape } from 'three'
import { T } from '@threlte/core'
import { toCreasedNormals } from './toCreasedNormals'

export let args: [width?: number, height?: number, depth?: number] | [] = []
export let radius = 0.05
export let smoothness = 4
export let steps = 1
export let creaseAngle = 0.4

const eps = 0.00001

const createShape = (width: number, height: number, radius0: number) => {
  const shape = new Shape()
  const radius = radius0 - eps
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true)
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)
  return shape
}

let width = 0
let height = 0
let depth = 0

$: [width = 1, height = 1, depth = 1] = args
$: shape = createShape(width, height, radius)

$: params = {
  depth: depth - radius * 2,
  bevelEnabled: true,
  bevelSegments: smoothness * 2,
  steps,
  bevelSize: radius - eps,
  bevelThickness: radius,
  curveSegments: smoothness,
}

</script>

<T.ExtrudeGeometry
  args={[shape, params]}
  on:create={({ ref }) => {
    ref.center()
    toCreasedNormals(ref, creaseAngle)
  }}
/>

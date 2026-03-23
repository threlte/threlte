<script lang="ts">
  import { ExtrudeGeometry, Shape } from 'three'
  import { T } from '@threlte/core'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import type { RoundedBoxGeometryProps } from './types.js'

  let {
    args = [],
    radius = 0.05,
    smoothness = 4,
    creaseAngle = 0.4,
    steps = 1,
    ref = $bindable(),
    children,
    ...props
  }: RoundedBoxGeometryProps = $props()

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

  let width = $derived(args[0] ?? 1)
  let height = $derived(args[1] ?? 1)
  let depth = $derived(args[2] ?? 1)
  let shape = $derived(createShape(width, height, radius))
  let params = $derived({
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps,
    bevelSize: radius - eps,
    bevelThickness: radius,
    curveSegments: smoothness
  })

  let geometry = $derived(new ExtrudeGeometry(shape, params))
  $effect.pre(() => {
    geometry.center()
    toCreasedNormals(geometry, creaseAngle)
  })
</script>

<T
  is={geometry}
  bind:ref
  {...props}
>
  {@render children?.({ ref: geometry })}
</T>

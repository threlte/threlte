<script lang="ts">
  import { type ExtrudeGeometry, Shape } from 'three'
  import { T } from '@threlte/core'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

  interface Props {
    args?: [width?: number, height?: number, depth?: number] | []
    radius?: number
    smoothness?: number
    creaseAngle?: number
    steps?: number
  }

  let {
    args = [],
    radius = 0.05,
    smoothness = 4,
    creaseAngle = 0.4,
    steps = 1,
    ref = $bindable(),
    ...props
  }: Props & { ref: ExtrudeGeometry } = $props()

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
</script>

<T.ExtrudeGeometry
  bind:ref
  args={[shape, params]}
  on:create={({ ref, cleanup }) => {
    ref.center()
    toCreasedNormals(ref, creaseAngle)
    props.$$events?.create?.({ ref, cleanup })
  }}
  {...props}
>
  <slot {ref} />
</T.ExtrudeGeometry>

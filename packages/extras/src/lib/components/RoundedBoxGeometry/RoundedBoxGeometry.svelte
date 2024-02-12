<script lang="ts">
  import { Shape } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils'

  const component = forwardEventHandlers()

  export let args: [width?: number, height?: number, depth?: number] | [] = []
  export let radius = 0.05
  export let smoothness = 4
  export let creaseAngle = 0.4
  export let steps = 1

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

  $: width = args[0] ?? 1
  $: height = args[1] ?? 1
  $: depth = args[2] ?? 1
  $: shape = createShape(width, height, radius)
  $: params = {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps,
    bevelSize: radius - eps,
    bevelThickness: radius,
    curveSegments: smoothness
  }
</script>

<T.ExtrudeGeometry
  let:ref
  bind:this={$component}
  args={[shape, params]}
  on:create={({ ref }) => {
    ref.center()
    toCreasedNormals(ref, creaseAngle)
  }}
>
  <slot {ref} />
</T.ExtrudeGeometry>

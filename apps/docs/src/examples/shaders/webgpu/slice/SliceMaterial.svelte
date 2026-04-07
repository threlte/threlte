<script
  lang="ts"
  module
>
  const defaultStartAngle = 0
  const defaultArcAngle = 0.5 * Math.PI
  const defaultColor = 'black'
</script>

<script lang="ts">
  import type { SliceMaterialProps } from './types'
  import { T } from '@threlte/core'
  import { atan, Fn, frontFacing, If, output, PI2, positionLocal, uniform, vec4 } from 'three/tsl'
  import { Color } from 'three/webgpu'

  let {
    arcAngle = defaultArcAngle,
    sliceColor = defaultColor,
    startAngle = defaultStartAngle,
    ref = $bindable(),
    ...props
  }: SliceMaterialProps = $props()

  const uArcAngle = uniform(defaultArcAngle)
  const uColor = uniform(new Color(defaultColor))
  const uStartAngle = uniform(defaultStartAngle)

  const angle = atan(positionLocal.y, positionLocal.x).sub(uStartAngle).mod(PI2)
  const inAngle = angle.greaterThan(0).and(angle.lessThan(uArcAngle))

  const outputNodeFn = Fn(() => {
    inAngle.discard()
    If(frontFacing.not(), () => {
      output.assign(vec4(uColor, 1.0))
    })
    return output
  })

  const shadow = vec4(0.0, 0.0, 0.0, 1.0)
  const castShadowNodeFn = Fn(() => {
    inAngle.discard()
    return shadow
  })

  $effect(() => {
    uArcAngle.value = arcAngle
    uColor.value.set(sliceColor)
    uStartAngle.value = startAngle
  })
</script>

<T.MeshPhysicalNodeMaterial
  outputNode={outputNodeFn()}
  castShadowNode={castShadowNodeFn()}
  bind:ref
  {...props}
/>

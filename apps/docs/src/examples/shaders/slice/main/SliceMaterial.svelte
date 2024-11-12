<script lang="ts">
  import type { SliceMaterialProps } from './types'
  import { color, uniform } from 'three/webgpu'
  import { T } from '@threlte/core'
  import { outputNodeFn, shadowNodeFn } from './tsl'

  const defaultStartAngle = 0
  const defaultArcAngle = 0.5 * Math.PI
  const defaultColor = 'black'

  let {
    arcAngle = defaultArcAngle,
    sliceColor = defaultColor,
    startAngle = defaultStartAngle,
    ref = $bindable(),
    children,
    ...props
  }: SliceMaterialProps = $props()

  const uArcAngle = uniform(defaultArcAngle)
  const uColor = uniform(color(defaultColor))
  const uStartAngle = uniform(defaultStartAngle)

  $effect.pre(() => {
    uArcAngle.value = arcAngle
    uColor.value.set(sliceColor)
    uStartAngle.value = startAngle
  })
</script>

<T.MeshPhysicalNodeMaterial
  outputNode={outputNodeFn({ startAngle: uStartAngle, arcAngle: uArcAngle, color: uColor })}
  shadowNode={shadowNodeFn({ startAngle: uStartAngle, arcAngle: uArcAngle })}
  bind:ref
  {...props}
>
  {@render children?.({ ref })}
</T.MeshPhysicalNodeMaterial>

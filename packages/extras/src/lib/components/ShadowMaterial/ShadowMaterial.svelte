<script
  module
  lang="ts"
>
  const width = 128
  const height = width

  const outerRadius = 0.5 * width

  const end: ColorStop = {
    color: 'rgba(0,0,0,0)',
    offset: 1
  }
</script>

<script lang="ts">
  import type { ColorStop } from '../GradientTexture/types.js'
  import type { ShadowProps } from './types.js'
  import { DoubleSide, MeshBasicMaterial } from 'three'
  import RadialGradientTexture from '../GradientTexture/radial/RadialGradientTexture.svelte'
  import { T } from '@threlte/core'

  let {
    children,
    color = 'black',
    ref = $bindable(),
    transparent = true,
    opacity = 0.5,
    depthWrite = false,
    side = DoubleSide,
    fog = false,
    ...restProps
  }: ShadowProps = $props()

  const start = $derived<ColorStop>({ color, offset: 0 })

  const stops = $derived<ColorStop[]>([start, end])

  const material = new MeshBasicMaterial()
</script>

<T
  is={material}
  bind:ref
  {transparent}
  {side}
  {depthWrite}
  {fog}
  {opacity}
  {...restProps}
>
  <RadialGradientTexture
    {width}
    {height}
    {outerRadius}
    {stops}
  />
  {@render children?.({ ref: material })}
</T>

<script lang="ts">
  import type { RadialGradientTextureProps } from './RadialGradientTexture'
  import { CanvasTexture } from 'three'
  import { T, observe, useThrelte } from '@threlte/core'
  import { applyGradient, addStops } from '../common'

  const { colorSpace, invalidate } = useThrelte()

  const defaultSize = 1024

  const canvas = new OffscreenCanvas(0, 0)

  let {
    innerRadius = 0,
    outerRadius = 'auto',
    stops = [
      { offset: 0, color: 'black' },
      { offset: 1, color: 'white' }
    ],
    width = defaultSize,
    height = defaultSize,
    children,
    ref = $bindable(new CanvasTexture(canvas)),
    ...props
  }: RadialGradientTextureProps = $props()

  $effect.pre(() => {
    canvas.width = width
  })

  $effect.pre(() => {
    canvas.height = height
  })

  observe(
    () => [props.wrapS, props.wrapT],
    () => {
      ref.needsUpdate = true
      invalidate()
    }
  )

  let canvasCenterX = $derived(0.5 * width)
  let canvasCenterY = $derived(0.5 * height)

  const context = canvas.getContext('2d')

  const gradient = $derived.by(() => {
    const gradient = context?.createRadialGradient(
      canvasCenterX,
      canvasCenterY,
      innerRadius,
      canvasCenterX,
      canvasCenterY,

      outerRadius === 'auto' ? Math.hypot(canvasCenterX, canvasCenterY) : outerRadius
    )
    if (gradient !== undefined) {
      addStops(gradient, stops)
    }
    return gradient
  })

  $effect(() => {
    if (gradient !== undefined && context !== null) {
      applyGradient(context, gradient)
      ref.needsUpdate = true
      invalidate()
    }
  })
</script>

<T
  is={ref}
  attach="map"
  colorSpace={$colorSpace}
  {...props}
>
  {@render children?.({ ref })}
</T>

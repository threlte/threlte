<script lang="ts">
  import type { RadialGradientTextureProps } from './types'
  import { CanvasTexture } from 'three'
  import { T, observe, useThrelte } from '@threlte/core'
  import { applyGradient, addStops } from '../common'

  let {
    width = 1024,
    height = 1024,
    innerRadius = 0,
    outerRadius = 'auto',
    stops = [
      { offset: 0, color: 'black' },
      { offset: 1, color: 'white' }
    ],
    attach = 'map',
    children,
    ref = $bindable(),
    ...props
  }: RadialGradientTextureProps = $props()

  const canvas = new OffscreenCanvas(0, 0)
  const context = canvas.getContext('2d')
  const texture = new CanvasTexture(canvas)

  $effect.pre(() => {
    canvas.width = width
  })

  $effect.pre(() => {
    canvas.height = height
  })

  observe(
    () => [props.wrapS, props.wrapT],
    () => {
      texture.needsUpdate = true
      invalidate()
    }
  )

  let canvasCenterX = $derived(0.5 * width)
  let canvasCenterY = $derived(0.5 * height)

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

  const { invalidate } = useThrelte()
  $effect(() => {
    if (gradient !== undefined && context !== null) {
      applyGradient(context, gradient)
      texture.needsUpdate = true
      invalidate()
    }
  })
</script>

<T
  is={texture}
  {...props}
  {attach}
  bind:ref
>
  {@render children?.({ ref: texture })}
</T>

<script lang="ts">
  import type { RadialGradientTextureProps } from './types.js'
  import { CanvasTexture } from 'three'
  import { T, observe, useThrelte } from '@threlte/core'
  import { addStops } from '../common.js'

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

  if (context === null) {
    throw new Error('radial gradient texture context is null')
  }

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

  const halfWidth = $derived(0.5 * width)

  const halfHeight = $derived(0.5 * height)

  const _outerRadius = $derived(
    outerRadius === 'auto' ? Math.hypot(halfWidth, halfHeight) : outerRadius
  )

  const gradient = $derived.by(() => {
    const gradient = context.createRadialGradient(
      halfWidth,
      halfHeight,
      innerRadius,
      halfWidth,
      halfHeight,
      _outerRadius
    )
    addStops(gradient, stops)
    return gradient
  })

  const { invalidate } = useThrelte()

  $effect(() => {
    context.fillStyle = gradient
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    texture.needsUpdate = true
    invalidate()

    return () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }
  })
</script>

<T
  is={texture}
  bind:ref
  {...props}
  {attach}
>
  {@render children?.({ ref: texture })}
</T>

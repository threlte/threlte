<script lang="ts">
  import type { RadialGradientTextureProps } from './types.js'
  import { CanvasTexture, ClampToEdgeWrapping } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { addStops } from '../common.js'
  import { untrack } from 'svelte'

  let {
    width = 1024,
    height = 1024,
    innerRadius = 0,
    outerRadius = 'auto',
    stops = [
      { offset: 0, color: 'black' },
      { offset: 1, color: 'white' }
    ],
    wrapS = ClampToEdgeWrapping,
    wrapT = ClampToEdgeWrapping,
    attach = 'map',
    children,
    ref = $bindable(),
    ...props
  }: RadialGradientTextureProps = $props()

  const canvas = new OffscreenCanvas(
    untrack(() => width),
    untrack(() => height)
  )
  const context = canvas.getContext('2d')

  if (context === null) {
    throw new Error('radial gradient texture context is null')
  }

  const texture = new CanvasTexture(canvas)

  $effect(() => {
    canvas.width = width
    canvas.height = height
    invalidate()
  })

  $effect(() => {
    texture.wrapS = wrapS
    texture.wrapT = wrapT ?? texture.wrapT
    texture.needsUpdate = true
    invalidate()
  })

  const gradient = $derived.by(() => {
    const halfWidth = 0.5 * width
    const halfHeight = 0.5 * height
    const gradient = context.createRadialGradient(
      halfWidth,
      halfHeight,
      innerRadius,
      halfWidth,
      halfHeight,
      outerRadius === 'auto' ? Math.hypot(halfWidth, halfHeight) : outerRadius
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

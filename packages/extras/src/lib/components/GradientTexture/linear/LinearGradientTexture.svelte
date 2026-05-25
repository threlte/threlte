<script lang="ts">
  import type { LinearGradientTextureProps } from './types.js'
  import { CanvasTexture, ClampToEdgeWrapping } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { addStops } from '../common.js'
  import { untrack } from 'svelte'

  let {
    width = 1024,
    height = 1024,
    startX = 0,
    startY = 0,
    endX = 0,
    endY = height,
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
  }: LinearGradientTextureProps = $props()

  const canvas = new OffscreenCanvas(
    untrack(() => width),
    untrack(() => height)
  )
  const context = canvas.getContext('2d')

  if (context === null) {
    throw new Error('canvas texture context is null')
  }

  const texture = new CanvasTexture(canvas)

  $effect(() => {
    canvas.width = width
    canvas.height = height
    invalidate()
  })

  $effect(() => {
    texture.wrapS = wrapS
    texture.wrapT = wrapT
    texture.needsUpdate = true
    invalidate()
  })

  const gradient = $derived.by(() => {
    const gradient = context.createLinearGradient(startX, startY, endX, endY)
    addStops(gradient, stops)
    return gradient
  })

  const { invalidate } = useThrelte()

  $effect(() => {
    context.save()
    context.fillStyle = gradient
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.restore()

    texture.needsUpdate = true
    invalidate()
  })
</script>

<T
  is={texture}
  bind:ref
  {attach}
  {...props}
>
  {@render children?.({ ref: texture })}
</T>

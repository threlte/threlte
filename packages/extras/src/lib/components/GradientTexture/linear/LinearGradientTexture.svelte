<script lang="ts">
  import type { LinearGradientTextureProps } from './types'
  import { CanvasTexture } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { applyGradient, addStops } from '../common'

  const { colorSpace, invalidate } = useThrelte()

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
    children,
    ref = $bindable(),
    ...props
  }: LinearGradientTextureProps = $props()

  const canvas = new OffscreenCanvas(0, 0)
  const context = canvas.getContext('2d')
  const texture = new CanvasTexture(canvas)

  $effect.pre(() => {
    canvas.width = width
  })

  $effect.pre(() => {
    canvas.height = height
  })

  $effect(() => {
    props.wrapS
    props.wrapT
    texture.needsUpdate = true
    invalidate()
  })

  const gradient = $derived.by(() => {
    const gradient = context?.createLinearGradient(startX, startY, endX, endY)
    if (gradient !== undefined) {
      addStops(gradient, stops)
    }
    return gradient
  })

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
  bind:ref
  attach="map"
  colorSpace={$colorSpace}
  {...props}
>
  {@render children?.({ ref: texture })}
</T>

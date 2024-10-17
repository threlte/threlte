<script lang="ts">
  import type { LinearGradientTextureProps } from './LinearGradientTexture.svelte'
  import { Color, CanvasTexture } from 'three'
  import { T, useThrelte } from '@threlte/core'

  const { colorSpace, invalidate } = useThrelte()

  const defaultSize = 1024

  let {
    width = defaultSize,
    height = defaultSize,
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

  $effect(() => {
    props.wrapS
    props.wrapT
    texture.needsUpdate = true
    invalidate()
  })

  $effect.pre(() => {
    canvas.width = width
  })

  $effect.pre(() => {
    canvas.height = height
  })

  const color = new Color()
  const gradient = $derived.by(() => {
    const gradient = context?.createLinearGradient(startX, startY, endX, endY)
    if (gradient !== undefined) {
      for (const stop of stops) {
        gradient.addColorStop(stop.offset, color.set(stop.color).getStyle())
      }
    }
    return gradient
  })

  $effect(() => {
    if (gradient !== undefined && context !== null) {
      context.save()
      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.restore()
      texture.needsUpdate = true
      invalidate()
    }
  })
</script>

<T
  is={texture}
  attach="map"
  colorSpace={$colorSpace}
  {...props}
>
  {@render children?.({ ref: texture })}
</T>

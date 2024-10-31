<script lang="ts">
  import type { LinearGradientTextureProps } from './LinearGradientTexture'
  import { CanvasTexture } from 'three'
  import { applyGradient, addStops } from '../common'
  import { observe, T, useThrelte } from '@threlte/core'

  const { colorSpace, invalidate } = useThrelte()

  const defaultSize = 1024

  const canvas = new OffscreenCanvas(0, 0)

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
    ref = $bindable(new CanvasTexture(canvas)),
    ...props
  }: LinearGradientTextureProps = $props()

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

  const context = canvas.getContext('2d')

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

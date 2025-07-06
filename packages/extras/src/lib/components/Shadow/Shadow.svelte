<script
  lang="ts"
  module
>
  const width = 128
  const height = width

  const createGradient = (
    context: OffscreenCanvasRenderingContext2D,
    colorStop: number,
    color: string
  ) => {
    const halfWidth = 0.5 * context.canvas.width
    const halfHeight = 0.5 * context.canvas.height
    const gradient = context.createRadialGradient(
      halfWidth,
      halfHeight,
      0,
      halfWidth,
      halfHeight,
      halfWidth
    )

    gradient.addColorStop(colorStop, color)
    gradient.addColorStop(1, 'rgba(0,0,0,0)') // to transparent
    return gradient
  }
</script>

<script lang="ts">
  import type { ShadowProps } from './types'
  import { Color, DoubleSide, Mesh, MeshBasicMaterial } from 'three'
  import { T } from '@threlte/core'

  let {
    children,
    color = 'black',
    colorStop = 0,
    depthWrite = false,
    fog = false,
    opacity = 0.5,
    ref = $bindable(),
    ...restProps
  }: ShadowProps = $props()

  const canvas = new OffscreenCanvas(width, height)

  const context = canvas.getContext('2d')

  if (context === null) {
    throw new Error('Shadow canvas context is null')
  }

  const colorString = $derived(new Color(color).getStyle())

  const material = new MeshBasicMaterial()

  const gradient = $derived(createGradient(context, colorStop, colorString))

  $effect(() => {
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)

    // send the updated canvas to the gpu
    material.needsUpdate = true
  })

  const mesh = new Mesh()
</script>

<T
  is={mesh}
  bind:ref
  {...restProps}
>
  <T.PlaneGeometry />
  <T
    is={material}
    side={DoubleSide}
    {depthWrite}
    transparent
    {opacity}
    {fog}
  >
    <T.CanvasTexture
      args={[canvas]}
      attach="map"
    />
  </T>
  {@render children?.({ ref: mesh })}
</T>

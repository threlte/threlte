<script lang="ts">
  import { T } from '@threlte/core'
  import { ImageMaterial, type IntersectionEvent } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import BentPlaneGeometry from './BentPlaneGeometry.svelte'
  import { DoubleSide } from 'three'
  import {
    brightness,
    contrast,
    negative,
    hue,
    saturation,
    lightness,
    monochromeColor,
    monochromeStrength,
    colorProcessingTexture,
    alphaThreshold,
    alphaSmoothing
  } from './props'

  export let url: string

  let hovered = false

  const scale = spring(1)
  const radius = spring(0.1)
  const zoom = spring(1)

  $: scale.set(hovered ? 1.3 : 1)
  $: radius.set(hovered ? 0.25 : 0.1)
  $: zoom.set(hovered ? 1.25 : 1)

  const stopPropagation =
    (fn: () => void) => (event: IntersectionEvent<'pointerover' | 'pointerleave'>) => {
      event.stopPropagation()
      fn()
    }
</script>

<T.Mesh
  scale={$scale}
  {...$$restProps}
  onpointerover={stopPropagation(() => (hovered = true))}
  onpointerleave={stopPropagation(() => (hovered = false))}
>
  <BentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
  <ImageMaterial
    transparent
    side={DoubleSide}
    {url}
    radius={$radius}
    zoom={$zoom}
    alphaThreshold={$alphaThreshold}
    alphaSmoothing={$alphaSmoothing}
    brightness={$brightness}
    contrast={$contrast}
    negative={$negative}
    hue={$hue}
    saturation={$saturation}
    lightness={$lightness}
    monochromeColor={$monochromeColor}
    monochromeStrength={$monochromeStrength}
    colorProcessingTexture={$colorProcessingTexture}
  />
</T.Mesh>

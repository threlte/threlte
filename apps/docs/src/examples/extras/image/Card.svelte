<script lang="ts">
  import { Image } from '@threlte/extras'
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
    alphaProgress,
    alphaSmoothing
  } from './App.svelte'

  export let url: string

  let hovered = false

  const scale = spring(1)
  const radius = spring(0.1)
  const zoom = spring(1)

  $: scale.set(hovered ? 1.3 : 1)
  $: radius.set(hovered ? 0.25 : 0.1)
  $: zoom.set(hovered ? 1.25 : 1)

  const stopPropagation = (fn) => (event) => {
    event.stopPropagation()
    fn()
  }
</script>

<Image
  transparent
  side={DoubleSide}
  {url}
  scale={$scale}
  radius={$radius}
  zoom={$zoom}
  on:pointerover={stopPropagation(() => (hovered = true))}
  on:pointerleave={stopPropagation(() => (hovered = false))}
  alphaProgress={$alphaProgress}
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
  {...$$restProps}
>
  <BentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
</Image>

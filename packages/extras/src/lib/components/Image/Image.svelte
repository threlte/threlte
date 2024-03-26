<script lang="ts">
  import { Color, Vector2, Mesh, type Texture, Vector3 } from 'three'
  import { T, asyncWritable, forwardEventHandlers, useThrelte } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import type { ImageProps, ImageEvents, ImageSlots } from './Image'
  import { useSuspense } from '../../suspense/useSuspense'
  import { vertexShader, fragmentShader } from './shaders'

  type $$Props = ImageProps
  type $$Events = ImageEvents
  type $$Slots = ImageSlots

  type Props = Required<ImageProps>

  export let color: Props['color'] = 'white'
  export let segments: Props['segments'] = 1
  export let scale: Props['scale'] = 1
  export let zoom: Props['zoom'] = 1
  export let radius: Props['radius'] = 0
  export let alphaProgress: Props['alphaProgress'] = 0
  export let alphaSmoothing: Props['alphaSmoothing'] = 0.1
  export let brightness: Props['brightness'] = 0
  export let contrast: Props['contrast'] = 0
  export let hue: Props['hue'] = 0
  export let saturation: Props['saturation'] = 0
  export let lightness: Props['lightness'] = 0
  export let monochromeColor: Props['monochromeColor'] = '#535970'
  export let monochromeStrength: ImageProps['monochromeStrength'] = undefined
  export let negative: Props['negative'] = false
  export let colorProcessingTexture: ImageProps['colorProcessingTexture'] = undefined
  export let opacity: Props['opacity'] = 1
  export let texture: ImageProps['texture'] = undefined
  export let toneMapped: Props['toneMapped'] = true
  export let transparent: Props['transparent'] = false
  export let side: ImageProps['side'] = undefined
  export let url: ImageProps['url'] = undefined

  export let ref = new Mesh()

  const suspend = useSuspense()
  $: textureStore = url ? suspend(useTexture(url)) : asyncWritable(Promise.resolve(texture))

  let { size } = useThrelte()

  const uniforms = {
    color: { value: new Color(color) },
    scale: {
      value: typeof scale === 'number' ? new Vector2(scale, scale) : new Vector2(scale[0], scale[1])
    },
    imageBounds: { value: new Vector2(1, 1) },
    resolution: { value: 1024 },
    map: { value: null as Texture | null },
    zoom: { value: zoom },
    radius: { value: radius },
    alphaProgress: { value: alphaProgress },
    alphaSmoothing: { value: alphaSmoothing },
    brightness: { value: brightness },
    contrast: { value: contrast },
    monochromeColor: { value: new Color(monochromeColor) },
    monochromeStrength: { value: monochromeStrength ?? 0 },
    negative: { value: negative ? 1 : 0 },
    opacity: { value: opacity },
    hsl: { value: new Vector3(0, 0, 0) },
    colorProccessingTexture: { value: null as Texture | null },
    colorProcessingTextureOverride: { value: 0 },
    colorProcessingEnabled: { value: 1 }
  }

  $: uniforms.color.value.set(color)

  $: if (typeof scale === 'number') {
    uniforms.scale.value.set(scale, scale)
  } else {
    uniforms.scale.value.set(scale[0], scale[1])
  }

  $: uniforms.imageBounds.value.set(
    $textureStore?.image.width ?? 0,
    $textureStore?.image.height ?? 0
  )
  $: uniforms.resolution.value = Math.max($size.width, $size.height)
  $: uniforms.zoom.value = zoom
  $: uniforms.radius.value = radius
  $: uniforms.opacity.value = opacity
  $: uniforms.alphaProgress.value = alphaProgress
  $: uniforms.alphaSmoothing.value = alphaSmoothing
  $: uniforms.brightness.value = brightness
  $: uniforms.contrast.value = contrast
  $: uniforms.hsl.value.x = hue
  $: uniforms.hsl.value.y = saturation
  $: uniforms.hsl.value.z = lightness
  $: uniforms.monochromeColor.value.set(monochromeColor)
  $: uniforms.negative.value = negative ? 1 : 0
  $: uniforms.map.value = $textureStore ?? null
  $: uniforms.colorProccessingTexture.value = colorProcessingTexture ?? null
  $: uniforms.colorProcessingTextureOverride.value = colorProcessingTexture ? 1 : 0

  $: {
    if (monochromeColor && monochromeStrength === undefined) {
      uniforms.monochromeStrength.value = 1
    }
    if (monochromeColor && typeof monochromeStrength === 'number') {
      uniforms.monochromeStrength.value = monochromeStrength
    }
    if (typeof monochromeColor === undefined) {
      uniforms.monochromeStrength.value = 0
    }
  }

  $: {
    let colorProcessingEnabled = 0
    const monochromeCheck =
      (monochromeColor ? 1 : 0) * (typeof monochromeStrength === undefined ? 1 : monochromeStrength)

    for (const value of [
      brightness,
      contrast,
      hue,
      saturation,
      lightness,
      monochromeCheck,
      colorProcessingTexture ? 1 : 0
    ]) {
      if (value !== 0) {
        colorProcessingEnabled = 1
        break
      }
    }

    uniforms.colorProcessingEnabled.value = colorProcessingEnabled
  }

  // Support arbitrary plane geometries (for instance with rounded corners)
  $: if ('parameters' in ref.geometry) {
    const { width, height } = ref.geometry.parameters as { width: number; height: number }
    uniforms.scale.value.set(uniforms.scale.value.x * width, uniforms.scale.value.y * height)
  }

  const component = forwardEventHandlers()
</script>

{#if $textureStore}
  <T
    is={ref}
    scale={typeof scale === 'number' ? [scale, scale, 1] : [scale[0], scale[1], 1]}
    {...$$restProps}
    bind:this={$component}
  >
    <T.PlaneGeometry args={[1, 1, segments, segments]} />
    <T.ShaderMaterial
      {uniforms}
      {toneMapped}
      {transparent}
      {side}
      {vertexShader}
      {fragmentShader}
    />
    <slot {ref} />
  </T>
{/if}

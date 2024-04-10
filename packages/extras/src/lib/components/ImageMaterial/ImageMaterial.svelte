<script lang="ts">
  import { Color, Vector2, type Texture, type Mesh, Vector3, ShaderMaterial } from 'three'
  import { T, asyncWritable, useParent, useTask, useThrelte } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import type { ImageMaterialProps, ImageMaterialEvents, ImageMaterialSlots } from './ImageMaterial'
  import { useSuspense } from '../../suspense/useSuspense'
  import { vertexShader, fragmentShader } from './shaders'

  type $$Props = ImageMaterialProps
  type $$Events = ImageMaterialEvents
  type $$Slots = ImageMaterialSlots

  let {
    color = 'white',
    zoom = 1,
    radius = 0,
    alphaThreshold = 0,
    alphaSmoothing = 0.1,
    brightness = 0,
    contrast = 0,
    hue = 0,
    saturation = 0,
    lightness = 0,
    negative = false,
    opacity = 1,
    toneMapped = true,
    transparent = false,
    texture,
    monochromeColor,
    monochromeStrength,
    colorProcessingTexture,
    side,
    url,
    ref = $bindable(),
    ...props
  }: ImageMaterialProps & { ref: ShaderMaterial } = $props()

  ref = new ShaderMaterial()

  const suspend = useSuspense()

  let textureStore = asyncWritable<Texture | undefined>(Promise.resolve(undefined))
  $effect.pre(() => {
    textureStore = suspend(url ? useTexture(url) : asyncWritable(Promise.resolve(texture)))
  })

  let { size } = useThrelte()
  const parent = useParent()

  const uniforms = {
    color: { value: new Color(color) },
    scale: { value: new Vector2() },
    imageBounds: { value: new Vector2(1, 1) },
    resolution: { value: 1024 },
    map: { value: null as Texture | null },
    zoom: { value: zoom },
    radius: { value: radius },
    alphaThreshold: { value: alphaThreshold },
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

  $effect.pre(() => {
    uniforms.color.value.set(color)
  })
  $effect.pre(() => {
    uniforms.imageBounds.value.set(
      $textureStore?.image.width ?? 0,
      $textureStore?.image.height ?? 0
    )
  })
  $effect.pre(() => {
    uniforms.resolution.value = Math.max($size.width, $size.height)
  })
  $effect.pre(() => {
    uniforms.zoom.value = zoom
  })
  $effect.pre(() => {
    uniforms.radius.value = radius
  })
  $effect.pre(() => {
    uniforms.opacity.value = opacity
  })
  $effect.pre(() => {
    uniforms.alphaThreshold.value = alphaThreshold
  })
  $effect.pre(() => {
    uniforms.alphaSmoothing.value = alphaSmoothing
  })
  $effect.pre(() => {
    uniforms.brightness.value = brightness
  })
  $effect.pre(() => {
    uniforms.contrast.value = contrast
  })
  $effect.pre(() => {
    uniforms.hsl.value.x = hue
  })
  $effect.pre(() => {
    uniforms.hsl.value.z = lightness
  })
  $effect.pre(() => {
    uniforms.negative.value = negative ? 1 : 0
  })
  $effect.pre(() => {
    uniforms.map.value = $textureStore ?? null
  })
  $effect.pre(() => {
    uniforms.colorProccessingTexture.value = colorProcessingTexture ?? null
  })
  $effect.pre(() => {
    uniforms.colorProcessingTextureOverride.value = colorProcessingTexture ? 1 : 0
  })
  $effect.pre(() => {
    if (monochromeColor !== undefined) {
      uniforms.monochromeColor.value.set(monochromeColor)
      uniforms.monochromeStrength.value = monochromeStrength ?? 1
    } else {
      uniforms.monochromeStrength.value = 0
    }
  })
  $effect.pre(() => {
    let colorProcessingEnabled = 0

    const monochromeCheck =
      (monochromeColor ? 1 : 0) * (monochromeStrength === undefined ? 1 : monochromeStrength)

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
  })

  useTask(() => {
    const mesh = $parent

    if (mesh === undefined) {
      return
    }

    uniforms.scale.value.set(mesh.scale.x, mesh.scale.y)

    const geometry = (mesh as Mesh).geometry

    // Support arbitrary plane geometries (for instance with rounded corners)
    if (geometry !== undefined && 'parameters' in geometry) {
      const { width, height } = geometry.parameters as { width: number; height: number }
      uniforms.scale.value.set(uniforms.scale.value.x * width, uniforms.scale.value.y * height)
    }
  })
</script>

<T
  is={ref}
  {uniforms}
  {toneMapped}
  {transparent}
  {side}
  {vertexShader}
  {fragmentShader}
  {...props}
>
  <slot {ref} />
</T>
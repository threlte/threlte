<script lang="ts">
  import { T, asyncWritable, isInstanceOf, useParent, useTask, useThrelte } from '@threlte/core'
  import { Color, ShaderMaterial, Uniform, Vector2, Vector3, type Mesh, type Texture } from 'three'
  import { useTexture } from '../../hooks/useTexture.js'
  import { useSuspense } from '../../suspense/useSuspense.js'
  import { fragmentShader, vertexShader } from './shaders.js'
  import type { ImageMaterialProps } from './types.js'

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
    children,
    ...props
  }: ImageMaterialProps = $props()

  const { invalidate, size } = useThrelte()

  const suspend = useSuspense()

  const textureStore = suspend(url ? useTexture(url) : asyncWritable(Promise.resolve(texture)))

  const parent = useParent()

  const uniforms = {
    color: new Uniform(new Color()),
    scale: new Uniform(new Vector2()),
    imageBounds: new Uniform(new Vector2(1, 1)),
    resolution: new Uniform(1024),
    map: new Uniform<Texture | null>(null),
    zoom: new Uniform(1),
    radius: new Uniform(0),
    alphaThreshold: new Uniform(0),
    alphaSmoothing: new Uniform(0.1),
    brightness: new Uniform(0),
    contrast: new Uniform(0),
    monochromeColor: new Uniform(new Color()),
    monochromeStrength: new Uniform(0),
    negative: new Uniform(0),
    opacity: new Uniform(1),
    hsl: new Uniform(new Vector3()),
    colorProccessingTexture: new Uniform<Texture | null>(null),
    colorProcessingTextureOverride: new Uniform(0),
    colorProcessingEnabled: new Uniform(1)
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  $effect.pre(() => {
    if (side) {
      material.side = side
      invalidate()
    }
  })
  $effect.pre(() => {
    uniforms.color.value.set(color)
    invalidate()
  })
  $effect.pre(() => {
    uniforms.imageBounds.value.set(
      $textureStore?.image.width ?? 0,
      $textureStore?.image.height ?? 0
    )
    invalidate()
  })
  $effect.pre(() => {
    uniforms.resolution.value = Math.max($size.width, $size.height)
    invalidate()
  })
  $effect.pre(() => {
    uniforms.zoom.value = zoom
    invalidate()
  })
  $effect.pre(() => {
    uniforms.radius.value = radius
    invalidate()
  })
  $effect.pre(() => {
    uniforms.opacity.value = opacity
    invalidate()
  })
  $effect.pre(() => {
    uniforms.alphaThreshold.value = alphaThreshold
    invalidate()
  })
  $effect.pre(() => {
    uniforms.alphaSmoothing.value = alphaSmoothing
    invalidate()
  })
  $effect.pre(() => {
    uniforms.brightness.value = brightness
    invalidate()
  })
  $effect.pre(() => {
    uniforms.contrast.value = contrast
    invalidate()
  })
  $effect.pre(() => {
    uniforms.hsl.value.x = hue
    invalidate()
  })
  $effect.pre(() => {
    uniforms.hsl.value.z = lightness
    invalidate()
  })
  $effect.pre(() => {
    uniforms.negative.value = negative ? 1 : 0
    invalidate()
  })
  $effect.pre(() => {
    uniforms.map.value = $textureStore ?? null
    invalidate()
  })
  $effect.pre(() => {
    uniforms.colorProccessingTexture.value = colorProcessingTexture ?? null
    invalidate()
  })
  $effect.pre(() => {
    uniforms.colorProcessingTextureOverride.value = colorProcessingTexture ? 1 : 0
    invalidate()
  })
  $effect.pre(() => {
    if (monochromeColor !== undefined) {
      uniforms.monochromeColor.value.set(monochromeColor)
      uniforms.monochromeStrength.value = monochromeStrength ?? 1
    } else {
      uniforms.monochromeStrength.value = 0
    }
    invalidate()
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
    invalidate()
  })

  useTask(
    () => {
      const mesh = parent.current

      if (!isInstanceOf(mesh, 'Mesh')) return

      uniforms.scale.value.set(mesh.scale.x, mesh.scale.y)

      const geometry = (mesh as Mesh).geometry

      // Support arbitrary plane geometries (for instance with rounded corners)
      if (geometry !== undefined && 'parameters' in geometry) {
        const { width, height } = geometry.parameters as { width: number; height: number }
        uniforms.scale.value.set(uniforms.scale.value.x * width, uniforms.scale.value.y * height)
      }
    },
    { autoInvalidate: false }
  )
</script>

<T
  is={material}
  bind:ref
  {toneMapped}
  {transparent}
  {...props}
>
  {@render children?.({ ref: material })}
</T>

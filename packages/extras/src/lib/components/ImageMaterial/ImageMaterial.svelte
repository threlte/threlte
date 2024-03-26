<script lang="ts">
  import { Color, Vector2, type Texture, type Mesh, Vector3, ShaderMaterial } from 'three'
  import {
    T,
    asyncWritable,
    forwardEventHandlers,
    useParent,
    useTask,
    useThrelte
  } from '@threlte/core'
  import { useTexture } from '../../hooks/useTexture'
  import type { ImageMaterialProps, ImageMaterialEvents, ImageMaterialSlots } from './ImageMaterial'
  import { useSuspense } from '../../suspense/useSuspense'
  import { vertexShader, fragmentShader } from './shaders'

  type $$Props = ImageMaterialProps
  type $$Events = ImageMaterialEvents
  type $$Slots = ImageMaterialSlots

  type Props = Required<ImageMaterialProps>

  export let color: Props['color'] = 'white'
  export let scale: ImageMaterialProps['scale'] = undefined
  export let zoom: Props['zoom'] = 1
  export let radius: Props['radius'] = 0
  export let alphaProgress: Props['alphaProgress'] = 0
  export let alphaSmoothing: Props['alphaSmoothing'] = 0.1
  export let brightness: Props['brightness'] = 0
  export let contrast: Props['contrast'] = 0
  export let hue: Props['hue'] = 0
  export let saturation: Props['saturation'] = 0
  export let lightness: Props['lightness'] = 0
  export let monochromeColor: ImageMaterialProps['monochromeColor'] = undefined
  export let monochromeStrength: ImageMaterialProps['monochromeStrength'] = undefined
  export let negative: Props['negative'] = false
  export let colorProcessingTexture: ImageMaterialProps['colorProcessingTexture'] = undefined
  export let opacity: Props['opacity'] = 1
  export let texture: ImageMaterialProps['texture'] = undefined
  export let toneMapped: Props['toneMapped'] = true
  export let transparent: Props['transparent'] = false
  export let side: ImageMaterialProps['side'] = undefined
  export let url: ImageMaterialProps['url'] = undefined

  export let ref = new ShaderMaterial()

  const suspend = useSuspense()
  $: textureStore = suspend(url ? useTexture(url) : asyncWritable(Promise.resolve(texture)))

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

  $: uniforms.negative.value = negative ? 1 : 0
  $: uniforms.map.value = $textureStore ?? null
  $: uniforms.colorProccessingTexture.value = colorProcessingTexture ?? null
  $: uniforms.colorProcessingTextureOverride.value = colorProcessingTexture ? 1 : 0

  $: if (monochromeColor !== undefined) {
    uniforms.monochromeColor.value.set(monochromeColor)
    uniforms.monochromeStrength.value = monochromeStrength ?? 1
  } else {
    uniforms.monochromeStrength.value = 0
  }

  $: {
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
  }

  $: if (typeof scale === 'number') {
    uniforms.scale.value.set(scale, scale)
  } else if (Array.isArray(scale)) {
    uniforms.scale.value.set(scale[0], scale[1])
  }

  const { start, stop } = useTask(
    () => {
      const mesh = $parent

      if (mesh === undefined || !('isMesh' in mesh)) {
        return
      }

      uniforms.scale.value.set(mesh.scale.x, mesh.scale.y)

      const geometry = (mesh as Mesh).geometry

      // Support arbitrary plane geometries (for instance with rounded corners)
      if ('parameters' in geometry) {
        const { width, height } = geometry.parameters as { width: number; height: number }
        uniforms.scale.value.set(uniforms.scale.value.x * width, uniforms.scale.value.y * height)
      }
    },
    { autoStart: false }
  )

  $: if (scale === undefined) {
    start()
  } else {
    stop()
  }

  const component = forwardEventHandlers()
</script>

<T
  is={ref}
  {uniforms}
  {toneMapped}
  {transparent}
  {side}
  {vertexShader}
  {fragmentShader}
  {...$$restProps}
  bind:this={$component}
>
  <slot {ref} />
</T>

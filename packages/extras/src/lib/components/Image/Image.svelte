<script lang="ts">
  import { Color, Vector2, Mesh, type Texture } from 'three'
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
  export let grayscale: Props['grayscale'] = 0
  export let opacity: Props['opacity'] = 1
  export let texture: Props['texture'] = undefined
  export let toneMapped: Props['toneMapped'] = true
  export let transparent: Props['transparent'] = false
  export let side: Props['side'] = undefined
  export let url: Props['url'] = undefined

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
    grayscale: { value: grayscale },
    opacity: { value: opacity }
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
  $: uniforms.grayscale.value = grayscale
  $: uniforms.opacity.value = opacity
  $: uniforms.map.value = $textureStore ?? null

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

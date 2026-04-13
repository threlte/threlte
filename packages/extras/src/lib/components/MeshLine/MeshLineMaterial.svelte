<script lang="ts">
  import type { MeshLineMaterialProps } from './types.js'
  import { T, useThrelte } from '@threlte/core'
  import { ShaderMaterial, Color, Vector2, Uniform, Texture } from 'three'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'

  let {
    opacity = 1,
    color = '#ffffff',
    dashOffset = 0,
    dashArray = 0,
    dashRatio = 0,
    attenuate = true,
    width = 1,
    scaleDown = 0,
    alphaMap,
    ref = $bindable(),
    children,
    ...props
  }: MeshLineMaterialProps = $props()

  let { invalidate, size } = useThrelte()

  const uniforms = {
    lineWidth: new Uniform(1),
    color: new Uniform(new Color('#ffffff')),
    opacity: new Uniform(1),
    resolution: new Uniform(new Vector2(1, 1)),
    sizeAttenuation: new Uniform(1),
    dashArray: new Uniform(0),
    useDash: new Uniform(0),
    dashOffset: new Uniform(0),
    dashRatio: new Uniform(0),
    scaleDown: new Uniform(0),
    alphaMap: new Uniform<Texture | undefined>(undefined),
    useAlphaMap: new Uniform(0)
  }

  export const material = new ShaderMaterial({ uniforms })

  $effect.pre(() => {
    uniforms.lineWidth.value = width
    invalidate()
  })

  $effect.pre(() => {
    uniforms.opacity.value = opacity
    invalidate()
  })

  $effect.pre(() => {
    uniforms.resolution.value.set($size.width, $size.height)
    invalidate()
  })

  $effect.pre(() => {
    uniforms.sizeAttenuation.value = attenuate ? 1 : 0
    invalidate()
  })

  $effect.pre(() => {
    uniforms.dashArray.value = dashArray
    uniforms.useDash.value = dashArray > 0 ? 1 : 0
    invalidate()
  })

  $effect.pre(() => {
    uniforms.dashOffset.value = dashOffset
    invalidate()
  })

  $effect.pre(() => {
    uniforms.dashRatio.value = dashRatio
    invalidate()
  })

  $effect.pre(() => {
    uniforms.scaleDown.value = scaleDown / 10
    invalidate()
  })

  $effect.pre(() => {
    uniforms.alphaMap.value = alphaMap
    uniforms.useAlphaMap.value = alphaMap ? 1 : 0
    invalidate()
  })

  $effect.pre(() => {
    uniforms.color.value.set(color)
    invalidate()
  })
</script>

<T
  is={material}
  bind:ref
  {fragmentShader}
  {vertexShader}
  {...props}
>
  {@render children?.({ ref: material })}
</T>

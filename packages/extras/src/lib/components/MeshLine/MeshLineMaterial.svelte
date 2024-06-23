<script lang="ts">
  import type { MeshLineMaterialProps } from './MeshLineMaterial.svelte'
  import { T, useThrelte } from '@threlte/core'
  import { ShaderMaterial, Color, Vector2 } from 'three'
  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

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
    lineWidth: { value: width },
    color: { value: new Color(color) },
    opacity: { value: opacity },
    resolution: { value: new Vector2(1, 1) },
    sizeAttenuation: { value: attenuate ? 1 : 0 },
    dashArray: { value: dashArray },
    dashOffset: { value: dashOffset },
    dashRatio: { value: dashRatio },
    useDash: { value: dashArray > 0 ? 1 : 0 },
    scaleDown: { value: scaleDown / 10 },
    alphaTest: { value: 0 },
    alphaMap: { value: alphaMap },
    useAlphaMap: { value: alphaMap ? 1 : 0 }
  }

  const material = new ShaderMaterial({ uniforms })

  $effect.pre(() => {
    uniforms.resolution.value.set($size.width, $size.height)
    invalidate()
  })

  $effect.pre(() => {
    uniforms.dashRatio.value = dashRatio
    uniforms.dashArray.value = dashArray
    uniforms.dashOffset.value = dashOffset
    uniforms.lineWidth.value = width
    uniforms.opacity.value = opacity
    uniforms.color.value.set(color)
    invalidate()
  })
</script>

<T
  is={material}
  bind:ref
  {...props}
  {fragmentShader}
  {vertexShader}
>
  {@render children?.({ ref: material })}
</T>

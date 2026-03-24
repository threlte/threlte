<!--
@component DissolveMaterial based on [this tutorial by Wawa
Sensei](https://www.youtube.com/watch?v=ma9t7HAOZRg) which in turn is based on
[this shader by
Faraz](https://twitter.com/cantBeFaraz/status/1678007542817882112). The material
is based on the `THREE.MeshStandardMaterial` and supports all its props.
-->

<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Color, MeshStandardMaterial } from 'three'
  import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
  import { fragmentShader, vertexShader } from './shaders'
  import type { DissolveMaterialProps } from './types'
  import type CustomShaderMaterialType from 'three-custom-shader-material/vanilla'

  const CSM = CustomShaderMaterial as unknown as typeof CustomShaderMaterialType

  const material = new CSM({
    baseMaterial: MeshStandardMaterial,
    vertexShader,
    fragmentShader,
    uniforms: {
      uThickness: { value: 0.1 },
      uColor: { value: new Color('#ffffff') },
      uProgress: { value: 0 },
      uSeed: { value: Math.random() },
      uScale: { value: 1 }
    },
    transparent: true,
    toneMapped: false
  })

  let { progress, scale, ref = $bindable(), children, ...props }: DissolveMaterialProps = $props()

  ref = material

  $effect.pre(() => {
    if (material.uniforms.uProgress) material.uniforms.uProgress.value = progress
  })

  $effect.pre(() => {
    if (material.uniforms.uScale) material.uniforms.uScale.value = scale
  })

  useTask((delta) => {
    if (material.uniforms.uSeed) material.uniforms.uSeed.value += delta * 0.001
  })
</script>

<T
  is={material}
  {...props}
>
  {@render children?.({ ref: material })}
</T>

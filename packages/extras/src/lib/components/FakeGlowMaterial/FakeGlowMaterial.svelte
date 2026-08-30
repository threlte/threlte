<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Color, AdditiveBlending, ShaderMaterial, Uniform } from 'three'
  import type { FakeGlowMaterialProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'

  let {
    falloff = 0.1,
    glowInternalRadius = 6,
    glowColor = 'green',
    glowSharpness = 1,
    ref = $bindable(),
    children,
    ...props
  }: FakeGlowMaterialProps = $props()

  const uniforms = {
    falloff: new Uniform(0.1),
    glowInternalRadius: new Uniform(6),
    glowColor: new Uniform(new Color('white')),
    glowSharpness: new Uniform(1)
  }

  const material = new ShaderMaterial({
    uniforms,
    fragmentShader,
    vertexShader,
    transparent: true,
    blending: AdditiveBlending,
    depthTest: false
  })

  const { invalidate } = useThrelte()

  $effect(() => {
    material.uniforms.falloff.value = falloff
    invalidate()
  })
  $effect(() => {
    material.uniforms.glowInternalRadius.value = glowInternalRadius
    invalidate()
  })
  $effect(() => {
    material.uniforms.glowColor.value.set(glowColor)
    invalidate()
  })
  $effect(() => {
    material.uniforms.glowSharpness.value = glowSharpness
    invalidate()
  })
</script>

<T
  is={material}
  bind:ref
  {...props}
>
  {@render children?.({ ref: material })}
</T>

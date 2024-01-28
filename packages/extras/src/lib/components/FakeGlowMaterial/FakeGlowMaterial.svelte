<script lang="ts">
  import { T, useThrelte, forwardEventHandlers } from '@threlte/core'
  import { Color, AdditiveBlending, ShaderMaterial } from 'three'
  import type {
    FakeGlowMaterialEvents,
    FakeGlowMaterialProps,
    FakeGlowMaterialSlots
  } from './FakeGlowMaterial.svelte'

  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

  type $$Props = Required<FakeGlowMaterialProps>
  type $$Events = FakeGlowMaterialEvents
  type $$Slots = FakeGlowMaterialSlots

  export let falloff: $$Props['falloff'] = 0.1
  export let glowInternalRadius: $$Props['glowInternalRadius'] = 6.0
  export let glowColor: $$Props['glowColor'] = 'green'
  export let glowSharpness: $$Props['glowSharpness'] = 1.0

  let material = new ShaderMaterial({
    uniforms: {
      falloff: { value: falloff },
      glowInternalRadius: { value: glowInternalRadius },
      glowColor: { value: new Color(glowColor) },
      glowSharpness: { value: glowSharpness }
    }
  })

  let { invalidate } = useThrelte()

  $: {
    material.uniforms.falloff.value = falloff
    material.uniforms.glowInternalRadius.value = glowInternalRadius
    material.uniforms.glowColor.value = new Color(glowColor)
    material.uniforms.glowSharpness.value = glowSharpness

    invalidate()
  }

  const component = forwardEventHandlers()
</script>

<T
  is={material}
  bind:this={$component}
  {fragmentShader}
  {vertexShader}
  transparent={true}
  blending={AdditiveBlending}
  depthTest={false}
  {...$$restProps}
>
	<slot ref={material} />
</T>

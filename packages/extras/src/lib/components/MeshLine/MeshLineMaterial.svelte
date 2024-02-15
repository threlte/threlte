<script lang="ts">
  import type {
    MeshLineMaterialEvents,
    MeshLineMaterialProps,
    MeshLineMaterialSlots
  } from './MeshLineMaterial.svelte'
  import { T, useThrelte, forwardEventHandlers } from '@threlte/core'
  import { ShaderMaterial, Color, Vector2 } from 'three'
  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

  type $$Props = Required<MeshLineMaterialProps>
  type $$Events = MeshLineMaterialEvents
  type $$Slots = MeshLineMaterialSlots

  export let opacity: $$Props['opacity'] = 1
  export let color: $$Props['color'] = '#ffffff'
  export let dashOffset: $$Props['color'] = 0
  export let dashArray: $$Props['dashArray'] = 0
  export let dashRatio: $$Props['dashRatio'] = 0
  export let attenuate: $$Props['attenuate'] = true
  export let width: $$Props['width'] = 1
  export let scaleDown: $$Props['scaleDown'] = 0
  export let alphaMap: $$Props['texture'] = undefined

  let { invalidate, size } = useThrelte()

  const material = new ShaderMaterial({
    uniforms: {
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
  })

  $: {
    material.uniforms.resolution.value = new Vector2($size.width, $size.height)
    invalidate()
  }

  $: {
    material.uniforms.dashRatio.value = dashRatio
    material.uniforms.dashArray.value = dashArray
    material.uniforms.dashOffset.value = dashOffset
    material.uniforms.lineWidth.value = width
    material.uniforms.opacity.value = opacity
    material.uniforms.color.value = new Color(color)
    invalidate()
  }

  const component = forwardEventHandlers()
</script>

<T
  is={material}
  bind:this={$component}
  {...$$restProps}
  {fragmentShader}
  {vertexShader}
>
  <slot ref={material} />
</T>

<script
  module
  lang="ts"
>
  import { isInstanceOf, T, useParentObject3D, useTask } from '@threlte/core'
  import {
    MeshBasicMaterial,
    MeshDepthMaterial,
    MeshDistanceMaterial,
    RGBADepthPacking,
    Uniform,
    type Texture
  } from 'three'
  import type { ShadowAlphaProps } from './types.js'
  import { fromStore } from 'svelte/store'

  const bayerDither = `
    float bayerDither2x2(vec2 v) {
      return mod(3.0 * v.y + 2.0 * v.x, 4.0);
    }
    float bayerDither4x4(vec2 v) {
      vec2 P1 = mod(v, 2.0);
      vec2 P2 = mod(floor(0.5 * v), 2.0);
      return 4.0 * bayerDither2x2(P1) + bayerDither2x2(P2);
    }
  `

  const patchShader = (
    material: MeshDepthMaterial | MeshDistanceMaterial,
    uniforms: Record<string, Uniform>
  ) => {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uShadowOpacity = uniforms.uShadowOpacity
      shader.uniforms.uAlphaMap = uniforms.uAlphaMap
      shader.uniforms.uHasAlphaMap = uniforms.uHasAlphaMap

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
          uniform float uShadowOpacity;
          uniform sampler2D uAlphaMap;
          uniform bool uHasAlphaMap;
          ${bayerDither}
          void main() {
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <clipping_planes_fragment>',
        `
          #include <clipping_planes_fragment>
          float shadowAlpha = uShadowOpacity;
          #ifdef USE_UV
            if (uHasAlphaMap) shadowAlpha *= texture(uAlphaMap, vUv).x;
          #endif
          if ((bayerDither4x4(floor(mod(gl_FragCoord.xy, 4.0)))) / 16.0 >= shadowAlpha) discard;
        `
      )
    }
  }
</script>

<!--
  Port of drei's ShadowAlpha component.
  Uses Bayer dithering in custom depth/distance materials to make shadows
  respect material opacity and alpha maps.

  Technique: https://gkjohnson.github.io/threejs-sandbox/screendoor-transparency/

  TODO: Deprecate in favor of native Three.js support when resolved:
  https://github.com/mrdoob/three.js/issues/10600
-->
<script lang="ts">
  let { ...props }: ShadowAlphaProps = $props()

  const uniforms = {
    uShadowOpacity: new Uniform(1),
    uAlphaMap: new Uniform<Texture | null>(null),
    uHasAlphaMap: new Uniform(false)
  }

  const depthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking })
  const distanceMaterial = new MeshDistanceMaterial()

  patchShader(depthMaterial, uniforms)
  patchShader(distanceMaterial, uniforms)

  const parent = fromStore(useParentObject3D())

  useTask(() => {
    const currentParent = parent.current

    if (!isInstanceOf(currentParent, 'Mesh')) return

    const material = currentParent.material as MeshBasicMaterial

    if (!material) return

    const opacity = props.opacity ?? material.opacity ?? 1
    const alphaMap = props.alphaMap === false ? null : (props.alphaMap ?? material.alphaMap ?? null)

    uniforms.uShadowOpacity.value = opacity
    uniforms.uAlphaMap.value = alphaMap
    uniforms.uHasAlphaMap.value = alphaMap !== null
  })
</script>

<T
  is={depthMaterial}
  attach="customDepthMaterial"
/>

<T
  is={distanceMaterial}
  attach="customDistanceMaterial"
/>

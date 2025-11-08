<script
  lang="ts"
  module
>
  import {
    PointsMaterial as ThreePointsMaterial,
    type WebGLProgramParametersWithUniforms,
    type WebGLRenderer
  } from 'three'
  import { T } from '@threlte/core'
  import type { PointsMaterialProps } from './types.js'

  const fragment = `
    #include <opaque_fragment>
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    float delta = fwidth(r);     
    float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    gl_FragColor.a = mask * gl_FragColor.a;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  `

  class PointsMaterial extends ThreePointsMaterial {
    override alphaToCoverage = true

    override onBeforeCompile(
      parameters: WebGLProgramParametersWithUniforms,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _renderer: WebGLRenderer
    ) {
      parameters.fragmentShader = parameters.fragmentShader.replace(
        `#include <opaque_fragment>`,
        fragment
      )
    }
  }
</script>

<script lang="ts">
  let { children, ref = $bindable(), ...rest }: PointsMaterialProps = $props()
</script>

<T
  is={PointsMaterial}
  bind:ref
  {...rest}
>
  {@render children?.()}
</T>

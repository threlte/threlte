<script
  module
  lang="ts"
>
  const vertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
		}
	`

  const fragmentShader = `
		varying vec2 vUv;
		void main() {
			gl_FragColor = vec4(vUv, 0.0, 1.0);
		}
	`
</script>

<script lang="ts">
  import { ShaderMaterial } from 'three'
  import { T } from '@threlte/core'
  import type { UvMaterialProps } from './types.js'

  let { children, ref = $bindable(), ...restProps }: UvMaterialProps = $props()

  const material = new ShaderMaterial({
    fragmentShader,
    vertexShader
  })
</script>

<T
  is={material}
  bind:ref
  {...restProps}
>
  {@render children?.({
    ref: material
  })}
</T>

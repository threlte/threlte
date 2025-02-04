<script
  lang="ts"
  module
>
  // (-1, 3)
  //    |\
  //    | \
  //    |  \
  //    |   \
  //    |    \
  //    |     \
  //    |      \
  //    |       \
  //    |________\
  // (-1, -1)   (3, -1)
  const vertices = new Float32Array([-1, -1, 3, -1, -1, 3])

  export const vertexShader = `
		precision highp float;

		attribute vec2 position;

		varying vec2 vUv;

		void main() {
			vUv = 0.5 * (position + 1.0);
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`

  const center = new Vector3()
</script>

<script lang="ts">
  import type { Props } from '@threlte/core'
  import { BufferAttribute, BufferGeometry, Sphere, Vector3 } from 'three'
  import { T } from '@threlte/core'

  let {
    ref = $bindable(new BufferGeometry()),
    children,
    ...restProps
  }: Props<BufferGeometry> = $props()

  ref.setAttribute('position', new BufferAttribute(vertices, 2))
  ref.boundingSphere = new Sphere().set(center, Infinity)
</script>

<T
  is={ref}
  {...restProps}
>
  {@render children?.({
    ref
  })}
</T>

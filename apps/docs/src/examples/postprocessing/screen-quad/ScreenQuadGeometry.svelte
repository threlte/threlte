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

		void main() {
			gl_Position = vec4(position, 1.0, 1.0);
		}
	`

  const center = new Vector3()
</script>

<script lang="ts">
  import type { Props } from '@threlte/core'
  import { BufferAttribute, BufferGeometry, Sphere, Vector3 } from 'three'
  import { T } from '@threlte/core'

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(vertices, 2))
  geometry.boundingSphere = new Sphere().set(center, Infinity)

  let { children }: Props<typeof BufferGeometry> = $props()
</script>

<T is={geometry}>
  {@render children?.({ ref: geometry })}
</T>

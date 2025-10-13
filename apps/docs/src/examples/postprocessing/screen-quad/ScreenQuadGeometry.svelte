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

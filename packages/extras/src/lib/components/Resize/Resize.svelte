<script
  lang="ts"
  context="module"
>
  import { Box3 } from 'three'

  // reuse box for all instances
  const _box = new Box3()
</script>

<script lang="ts">
  import type { ResizeProps } from './Resize.svelte'
  import { Group } from 'three'
  import { T } from '@threlte/core'

  let {
    axis,
    box = _box,
    precise = true,
    ref = $bindable(),
    children,
    ...props
  }: ResizeProps = $props()

  const group = new Group()
  const inner = new Group()
  const outer = new Group()

  $effect(() => {
    outer.matrixWorld.identity()
    const { max, min } = box.setFromObject(inner, precise)
    const width = max.x - min.x
    const height = max.y - min.y
    const depth = max.z - min.z

    const denominator =
      axis === 'x'
        ? width
        : axis === 'y'
          ? height
          : axis === 'z'
            ? depth
            : Math.max(width, height, depth)

    outer.scale.setScalar(1 / denominator)
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={outer}>
    <T is={inner}>
      {@render children?.({ ref: group })}
    </T>
  </T>
</T>

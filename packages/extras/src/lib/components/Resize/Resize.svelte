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
    dimension,
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
    const w = max.x - min.x
    const h = max.y - min.y
    const d = max.z - min.z

    const denominator =
      dimension === 'width'
        ? w
        : dimension === 'height'
          ? h
          : dimension === 'depth'
            ? d
            : Math.max(w, h, d)

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

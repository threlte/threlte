<script
  lang="ts"
  context="module"
>
  import { Box3, Group } from 'three'
  import type { ResizeProps } from './Resize.svelte'

  // reuse box for all instances
  const _box = new Box3()

  const createResize =
    (
      outer: Group,
      inner: Group,
      box: Box3,
      precise: boolean,
      axis: ResizeProps['axis'],
      onresize: ResizeProps['onresize']
    ) =>
    () => {
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
      onresize?.()
    }
</script>

<script lang="ts">
  import { T } from '@threlte/core'

  let {
    axis,
    box = _box,
    precise = true,
    onresize,
    ref = $bindable(),
    children,
    ...props
  }: ResizeProps = $props()

  const group = new Group()
  const inner = new Group()
  const outer = new Group()

  const resize = $derived(createResize(outer, inner, _box, precise, axis, onresize))

  $effect(() => {
    resize()
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={outer}>
    <T is={inner}>
      {@render children?.({ ref: group, resize })}
    </T>
  </T>
</T>

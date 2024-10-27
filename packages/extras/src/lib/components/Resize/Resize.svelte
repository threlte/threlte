<script
  lang="ts"
  context="module"
>
  import { Box3 } from 'three'

  // reuse box for all instances
  const _box = new Box3()
</script>

<script lang="ts">
  import { Group } from 'three'
  import type { ResizeProps } from './Resize'
  import { injectPlugin, isInstanceOf, T, useStage, useTask, useThrelte } from '@threlte/core'
  import { onMount, tick } from 'svelte'

  let {
    axis,
    auto,
    box = _box,
    precise = true,
    onresize,
    ref = $bindable(new Group()),
    children,
    ...props
  }: ResizeProps = $props()

  const inner = new Group()
  const outer = new Group()

  const { renderStage } = useThrelte()

  const beforeRenderStage = useStage(Symbol('before-render-resize'), {
    before: renderStage
  })

  const resize = () => {
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

  const { start: scheduleResizing, stop } = useTask(
    () => {
      resize()
      stop()
    },
    { autoStart: false, stage: beforeRenderStage }
  )

  onMount(scheduleResizing)

  injectPlugin('resize', ({ ref }) => {
    if (!isInstanceOf(ref, 'Object3D')) return

    onMount(() => {
      if (auto) {
        scheduleResizing()
        return scheduleResizing
      }
    })

    return {
      onRefChange() {
        if (auto) {
          tick().then(scheduleResizing)
        }
      }
    }
  })
</script>

<T
  is={ref}
  {...props}
>
  <T is={outer}>
    <T is={inner}>
      {@render children?.({ ref, resize })}
    </T>
  </T>
</T>

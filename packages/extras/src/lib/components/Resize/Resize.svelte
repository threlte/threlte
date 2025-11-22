<script
  lang="ts"
  module
>
  // reuse box for all instances
  const _box = new Box3()
</script>

<script lang="ts">
  import {
    isInstanceOf,
    observe,
    T,
    useStage,
    useTask,
    useThrelte,
    type Plugin
  } from '@threlte/core'
  import { Box3, Group } from 'three'
  import InjectPlugin from '../InjectPlugin/InjectPlugin.svelte'
  import type { ResizeProps } from './types.js'

  const { renderStage } = useThrelte()

  let {
    axis,
    auto = false,
    box = _box,
    precise,
    onresize,
    stage = useStage('<Resize>', { before: renderStage }),
    ref = $bindable(),
    children,
    ...props
  }: ResizeProps = $props()

  const group = new Group()
  const inner = new Group()
  const outer = new Group()

  const doResize = () => {
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
      doResize()
      stop()
    },
    { autoStart: false, stage }
  )

  /** Manually trigger resizing */
  export const resize = scheduleResizing

  observe(() => [axis, precise], scheduleResizing)

  const plugin: Plugin = (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return
    observe.pre(
      () => [args.ref],
      () => {
        if (auto) scheduleResizing()
        return () => {
          if (auto) scheduleResizing()
        }
      }
    )
  }
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={outer}>
    <T is={inner}>
      <InjectPlugin
        name="resize"
        {plugin}
      >
        {@render children?.({ ref: group, resize: scheduleResizing })}
      </InjectPlugin>
    </T>
  </T>
</T>

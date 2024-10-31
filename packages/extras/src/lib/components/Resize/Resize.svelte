<script
  lang="ts"
  module
>
  import { Box3 } from 'three'

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
    type Plugin,
    type Props,
    type Stage
  } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Group } from 'three'
  import InjectPlugin from '../InjectPlugin/InjectPlugin.svelte'

  const { renderStage } = useThrelte()

  type ResizeProps = Omit<Props<Group>, 'children'> & {
    /**
     * when true, resizes the group when objects are added or removed
     *
     * @default false
     */
    auto?: boolean
    /**
     * axis to constrain by. if not provided, the max of all 3 axes is used.
     */
    axis?: 'x' | 'y' | 'z'
    /**
     * optional Box3 to use in bounding box calculation
     */
    box?: Box3
    /**
     * whether to use precise bounding box calculation
     * https://threejs.org/docs/index.html#api/en/math/Box3.setFromObject
     *
     * @default true
     */
    precise?: boolean
    /**
     * called after the group has been scaled
     */
    onresize?: () => void
    resize?: () => void
    /**
     * The stage used to resize
     */
    stage?: Stage
    children?: Snippet<[{ ref: Group; resize(): void }]>
  }

  let {
    axis,
    auto = false,
    box = _box,
    precise = true,
    onresize,
    stage = useStage('<Resize>', { before: renderStage }),
    ref = $bindable(new Group()),
    children,
    ...props
  }: ResizeProps = $props()

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
  is={ref}
  {...props}
>
  <T is={outer}>
    <T is={inner}>
      <InjectPlugin
        name="resize"
        {plugin}
      >
        {@render children?.({ ref, resize: scheduleResizing })}
      </InjectPlugin>
    </T>
  </T>
</T>

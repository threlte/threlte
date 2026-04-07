<script
  lang="ts"
  module
>
  const _box = new Box3()
  const _diff = new Vector3()
</script>

<script lang="ts">
  import { isInstanceOf, observe, T, useStage, useTask, useThrelte } from '@threlte/core'
  import { type Plugin } from '@threlte/core'
  import { Box3, Group, Vector3 } from 'three'
  import InjectPlugin from '../InjectPlugin/InjectPlugin.svelte'
  import type { ResizeProps } from './types'

  const { renderStage } = useThrelte()

  let {
    axis = 'max',
    auto = false,
    box = _box,
    precise = false,
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
    _diff.subVectors(max, min)
    const scale =
      1 / (axis === 'max' ? Math.max(..._diff) : axis === 'min' ? Math.min(..._diff) : _diff[axis])
    outer.scale.setScalar(scale)
    onresize?.()
  }

  const { start, stop } = useTask(
    () => {
      doResize()
      stop()
    },
    { autoStart: false, stage, autoInvalidate: false }
  )

  /** Manually trigger resizing */
  export const resize = start

  observe(() => [axis, precise], resize)

  const plugin: Plugin = (args) => {
    $effect(() => {
      if (!isInstanceOf(args.ref, 'Object3D')) return
      resize()
      return () => {
        resize()
      }
    })
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
        {@render children?.({ ref, resize })}
      </InjectPlugin>
    </T>
  </T>
</T>

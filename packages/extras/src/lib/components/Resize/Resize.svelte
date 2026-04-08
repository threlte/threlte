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
  import type { ResizeProps } from './types.js'

  const { renderStage } = useThrelte()

  let {
    axis = 'max',
    auto = true,
    box = _box,
    precise = false,
    onresize,
    ref = $bindable(new Group()),
    children,
    stage = useStage('<Resize>', { before: renderStage }),
    ...props
  }: ResizeProps = $props()

  const inner = new Group()

  const outer = new Group()

  let running = $state(false)

  const doResize = () => {
    outer.matrixWorld.identity()
    const { max, min } = box.setFromObject(inner, precise)
    _diff.subVectors(max, min)
    const scale =
      1 / (axis === 'max' ? Math.max(..._diff) : axis === 'min' ? Math.min(..._diff) : _diff[axis])
    outer.scale.setScalar(scale)
    onresize?.()
    running = false
  }

  /** Manually trigger resizing */
  export const resize = () => {
    running = true
  }

  useTask(doResize, { stage, running: () => running })

  observe(() => [axis, precise], resize)

  const plugin: Plugin = (args) => {
    $effect(() => {
      if (!isInstanceOf(args.ref, 'Object3D')) return
      if (auto) resize()
      return () => {
        if (auto) resize()
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

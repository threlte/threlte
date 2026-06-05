<script
  lang="ts"
  module
>
  const _box = new Box3()
  const _size = new Vector3()
</script>

<script lang="ts">
  import { isInstanceOf, observe, T, useStage, useTask, useThrelte } from '@threlte/core'
  import { Box3, Group, Vector3 } from 'three'
  import { injectPlugin } from '@threlte/core'
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
    box.setFromObject(inner, precise).getSize(_size)
    const scale =
      1 / (axis === 'max' ? Math.max(..._size) : axis === 'min' ? Math.min(..._size) : _size[axis])
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

  injectPlugin('resize', (args) => {
    $effect(() => {
      if (!isInstanceOf(args.ref, 'Object3D') || !auto) return
      resize()
      return () => {
        resize()
      }
    })
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

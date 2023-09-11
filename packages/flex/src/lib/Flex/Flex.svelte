<script lang="ts">
  import { createFlexContext } from '$lib/context/createFlexContext'
  import { T, currentWritable, useFrame } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import { Direction, type Yoga } from 'yoga-layout'
  import { createRootContext } from '../context/createRootContext'
  import { useRoot } from '../hooks/useRoot'
  import { useYoga } from '../hooks/useYoga'
  import { applyNodeProps } from '../lib/applyNodeProps'
  import { getDepthAxis } from '../lib/getDepthAxis'
  import type { NodeProps } from '../types/props'
  import type { Axis, FlexPlane } from '../types/types'
  import { logTable } from '../lib/logTable'

  type $$Props = NodeProps & {
    root?: {
      size: {
        width: number
        height: number
      }
      plane: FlexPlane
      direction?: Direction
      scaleFactor?: number
    }
  }

  const { yoga } = useYoga()

  export let root: $$Props['root'] = undefined

  let initialized = false

  const rootContext = root
    ? createRootContext({
        scaleFactor: currentWritable(root.scaleFactor ?? 1000),
        mainAxis: currentWritable(root.plane[0] as Axis),
        crossAxis: currentWritable(root.plane[1] as Axis),
        depthAxis: currentWritable(getDepthAxis(root.plane)),
        direction: currentWritable(root.direction ?? Direction.LTR),
        rootWidth: currentWritable(root.size.width),
        rootHeight: currentWritable(root.size.height)
      })
    : useRoot()

  const { scaleFactor, direction, rootWidth, rootHeight } = rootContext

  const group = new Group()

  const { start: reflow, stop } = useFrame(
    () => {
      context.emit('reflow:before')

      context.node.calculateLayout(
        $rootWidth * $scaleFactor,
        $rootHeight * $scaleFactor,
        $direction
      )

      // apply the layout to children
      context.emit('reflow:after')

      stop()
    },
    { autostart: false }
  )

  const context = createFlexContext({
    node: undefined as any,
    yoga: undefined as any,
    group,
    order: [],
    addChild(child) {
      // order is [0, 1, 2, 3, 5, 6, 7, 9, 10, …]
      // find the first available spot in order or insert at end
      let index = context.order.reduce((target, current, index) => {
        if (target === index) {
          return target + 1
        }
        return target
      }, 0)
      context.order[index] = index
      context.node.insertChild(child, index)
      reflow()
    },
    removeChild(child) {
      context.node.removeChild(child)
      reflow()
    },
    reflow
  })

  const initNode = (yoga: Yoga) => {
    context.yoga = yoga
    context.node = yoga.Node.create()
    context.node.setWidth($rootWidth * $scaleFactor)
    context.node.setHeight($rootHeight * $scaleFactor)

    initialized = true
  }

  $: $yoga && initNode($yoga)

  $: initialized && (applyNodeProps(context.node, $$restProps, $scaleFactor), reflow())

  onDestroy(() => {
    context.node?.freeRecursive()
  })
</script>

<T is={group}>
  {#if context.yoga}
    <slot {reflow} />
  {/if}
</T>

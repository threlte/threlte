<script lang="ts">
  import { createNodeContext } from '$lib/Node/createNodeContext'
  import { T, currentWritable, useFrame } from '@threlte/core'
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Group } from 'three'
  import { Direction, type Yoga } from 'yoga-layout'
  import { createRootContext } from '../context/createRootContext'
  import { getDepthAxis } from '../lib/getDepthAxis'
  import type { Axis, FlexPlane } from '../types/types'
  import { applyNodeProps, type NodeProps } from '../lib/props'

  type $$Props = NodeProps & {
    yoga: Yoga
    width?: number
    height?: number
    plane?: FlexPlane
    direction?: keyof typeof Direction
    scaleFactor?: number
  }

  export let yoga: Required<$$Props>['yoga']
  export let width: Required<$$Props>['width'] = 1
  export let height: Required<$$Props>['height'] = 1
  export let plane: Required<$$Props>['plane'] = 'xy'
  export let direction: Required<$$Props>['direction'] = 'LTR'
  export let scaleFactor: Required<$$Props>['scaleFactor'] = 1000

  const dispatch = createEventDispatcher<{
    reflow: void
  }>()

  const rootGroup = new Group()

  /**
   * Reflowing inside useFrame automatically batches reflows to 1 per frame.
   */
  const { start: reflow, stop } = useFrame(
    () => {
      rootContext.emit('reflow:before')
      rootNode.calculateLayout(width * scaleFactor, height * scaleFactor, Direction[direction])
      rootContext.emit('reflow:after')

      dispatch('reflow')
      stop()
    },
    { autostart: false }
  )

  const rootContext = createRootContext({
    yoga,
    rootWidth: currentWritable(width),
    rootHeight: currentWritable(height),
    scaleFactor: currentWritable(scaleFactor ?? 1000),
    mainAxis: currentWritable(plane[0] as Axis),
    crossAxis: currentWritable(plane[1] as Axis),
    depthAxis: currentWritable(getDepthAxis(plane)),
    rootGroup: rootGroup,
    reflow
  })

  const { node: rootNode } = createNodeContext()
  $: applyNodeProps(rootNode, $$restProps as NodeProps, scaleFactor), reflow()

  $: rootContext.rootWidth.set(width)
  $: rootContext.rootHeight.set(height)
  $: rootContext.mainAxis.set(plane[0] as Axis)
  $: rootContext.crossAxis.set(plane[1] as Axis)
  $: rootContext.depthAxis.set(getDepthAxis(plane))
  $: rootContext.scaleFactor.set(scaleFactor)

  onDestroy(() => {
    rootNode.free()
  })
</script>

<T is={rootGroup}>
  <slot {reflow} />
</T>

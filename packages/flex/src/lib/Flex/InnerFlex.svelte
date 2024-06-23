<script lang="ts">
  import { T, currentWritable, useTask } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Box3, Group, Vector3 } from 'three'
  import { Direction } from 'yoga-layout'
  import { createUseDimensionsContext } from '../hooks/useDimensions'
  import { getDepthAxis } from '../lib/getDepthAxis'
  import { getOrientedBoundingBoxSize } from '../lib/getOrientedBoundingBoxSize'
  import { getRootShift } from '../lib/getRootShift'
  import { applyNodeProps, type Axis, type NodeProps } from '../lib/props'
  import { propsChanged } from '../lib/propsChanged'
  import { createNodeContext } from '../nodes/context'
  import type { InnerFlexProps } from './InnerFlex.svelte'
  import { createFlexContext } from './context'

  let {
    yoga,
    width = 1,
    height = 1,
    plane = 'xy',
    direction = 'LTR',
    scaleFactor = 1000,
    classParser,
    class: _class = '',
    reflowStage,
    ref = $bindable(),
    onreflow,
    children,
    ...props
  }: InnerFlexProps = $props()

  $inspect(yoga)

  ref = new Group()
  ref.userData.isNode = true

  const boundingBox = new Box3()
  const vec3 = new Vector3()

  /**
   * Create the context for `useDimensions`
   */
  const { width: computedWidth, height: computedHeight } = createUseDimensionsContext()

  /**
   * Reflowing inside useTask automatically batches reflows to 1 per frame.
   */
  const { start: reflow, stop } = useTask(
    Symbol('threlte-flex-reflow'),
    () => {
      flexContext.emit('reflow:before')

      for (const { node, group, props } of flexContext.nodes.values()) {
        const scaledWidth =
          typeof props.width === 'number' ? props.width * scaleFactor : props.width
        const scaledHeight =
          typeof props.height === 'number' ? props.height * scaleFactor : props.height

        if (scaledWidth !== undefined && scaledHeight !== undefined) {
          // Forced size, no need to calculate bounding box
          node.setWidth(scaledWidth)
          node.setHeight(scaledHeight)
        } else if (node.getChildCount() === 0) {
          // No size specified, calculate size
          if (ref) {
            getOrientedBoundingBoxSize(group, ref, boundingBox, vec3)
          } else {
            // ref is missing for some reason, let's just use usual bounding box
            boundingBox.setFromObject(group).getSize(vec3)
          }

          node.setWidth(scaledWidth || vec3[$mainAxis] * scaleFactor)
          node.setHeight(scaledHeight || vec3[$crossAxis] * scaleFactor)
        }
      }

      rootNode.calculateLayout(width * scaleFactor, height * scaleFactor, Direction[direction])

      const rootWidth = rootNode.getComputedWidth()
      const rootHeight = rootNode.getComputedHeight()

      let minX = 0
      let maxX = 0
      let minY = 0
      let maxY = 0

      // Reposition after recalculation
      for (const { node, group } of flexContext.nodes.values()) {
        const { left, top, width, height } = node.getComputedLayout()
        const [mainAxisShift, crossAxisShift] = getRootShift(rootWidth, rootHeight, node)

        group.position[$mainAxis] = (mainAxisShift + left) / scaleFactor
        group.position[$crossAxis] = -(crossAxisShift + top) / scaleFactor
        group.position[$depthAxis] = 0

        minX = Math.min(minX, left)
        minY = Math.min(minY, top)
        maxX = Math.max(maxX, left + width)
        maxY = Math.max(maxY, top + height)
      }

      flexContext.emit('reflow:after')

      computedWidth.set((maxX - minX) / scaleFactor)
      computedHeight.set((maxY - minY) / scaleFactor)

      onreflow?.({
        width: computedWidth.current,
        height: computedHeight.current
      })

      stop()
    },
    {
      stage: reflowStage,
      autoStart: false
    }
  )

  const flexContext = createFlexContext({
    yoga,
    nodes: new Map(),
    addNode(node, group, props) {
      flexContext.nodes.set(node, { node, group, props })
      reflow()
    },
    updateNodeProps(node, props, force = false) {
      const nodeData = flexContext.nodes.get(node)

      // Updating the props can be forced and is done so on the initial call.
      if (force || propsChanged(node, props)) {
        applyNodeProps(node, props, scaleFactor)
        reflow()
        if (nodeData) nodeData.props = props
      }
    },
    removeNode(node) {
      flexContext.nodes.delete(node)
      reflow()
    },
    rootWidth: currentWritable(width),
    rootHeight: currentWritable(height),
    scaleFactor: currentWritable(scaleFactor ?? 1000),
    mainAxis: currentWritable(plane[0] as Axis),
    crossAxis: currentWritable(plane[1] as Axis),
    depthAxis: currentWritable(getDepthAxis(plane)),
    rootGroup: ref,
    reflow,
    classParser
  })

  const rootNode = yoga.Node.create()
  createNodeContext(rootNode)

  const { mainAxis, crossAxis, depthAxis } = flexContext

  $effect.pre(() => {
    rootNode.setWidth(width * scaleFactor), rootNode.setHeight(height * scaleFactor)
  })

  flexContext.updateNodeProps(
    rootNode,
    { ...classParser?.(_class, {}), ...props } as NodeProps,
    true
  )

  $effect.pre(() => {
    flexContext.updateNodeProps(rootNode, {
      ...classParser?.(_class, {}),
      ...props
    } as NodeProps)
  })
  $effect.pre(() => {
    flexContext.rootWidth.set(width)
    flexContext.reflow()
  })
  $effect.pre(() => {
    flexContext.rootHeight.set(height)
    flexContext.reflow()
  })
  $effect.pre(() => {
    flexContext.mainAxis.set(plane[0] as Axis)
    flexContext.reflow()
  })
  $effect.pre(() => {
    flexContext.crossAxis.set(plane[1] as Axis)
    flexContext.reflow()
  })
  $effect.pre(() => {
    flexContext.depthAxis.set(getDepthAxis(plane))
    flexContext.reflow()
  })
  $effect.pre(() => {
    flexContext.scaleFactor.set(scaleFactor)
    flexContext.reflow()
  })

  onDestroy(() => {
    rootNode.free()
  })
</script>

<T is={ref}>
  {@render children?.({
    reflow,
    width: $computedWidth,
    height: $computedHeight
  })}
</T>

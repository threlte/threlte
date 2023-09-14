<script lang="ts">
  import { T, createRawEventDispatcher, currentWritable, useFrame } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Box3, Group, Vector3 } from 'three'
  import { Direction, type Yoga } from 'yoga-layout'
  import { getDepthAxis } from '../lib/getDepthAxis'
  import { getOrientedBoundingBoxSize } from '../lib/getOrientedBoundingBoxSize'
  import { getRootShift } from '../lib/getRootShift'
  import { applyNodeProps, type Axis, type FlexPlane, type NodeProps } from '../lib/props'
  import { createFlexContext } from './context'
  import { createNodeContext } from '../nodes/context'

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

  type $$Events = {
    reflow: {
      width: number
      height: number
    }
  }

  const dispatch = createRawEventDispatcher<$$Events>()

  const rootGroup = new Group()
  rootGroup.userData.isNode = true

  const boundingBox = new Box3()
  const vec3 = new Vector3()

  /**
   * Reflowing inside useFrame automatically batches reflows to 1 per frame.
   */
  const { start: reflow, stop } = useFrame(
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
          if (rootGroup) {
            getOrientedBoundingBoxSize(group, rootGroup, boundingBox, vec3)
          } else {
            // rootGroup ref is missing for some reason, let's just use usual bounding box
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

      dispatch('reflow', {
        width: (maxX - minX) / scaleFactor,
        height: (maxY - minY) / scaleFactor
      })

      stop()
    },
    { autostart: false }
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
      if (!nodeData) return

      // Updating the props can be forced and is done so on the initial call.
      if (!force) {
        // Because all NodeProps are primitive types, we can make a simple
        // comparison and only request a reflow when necessary. We do that by
        // checking the length of the props object and then checking if all keys
        // are the same and all values are the same.
        const previousKeys = Object.keys(nodeData.props) as (keyof NodeProps)[]
        const currentKeys = Object.keys(props) as (keyof NodeProps)[]
        if (
          previousKeys.length === currentKeys.length &&
          currentKeys.every((key) => previousKeys.includes(key)) &&
          previousKeys.every((key) => nodeData.props[key] === props[key])
        ) {
          return
        }
      }

      applyNodeProps(node, props, scaleFactor)
      nodeData.props = props
      reflow()
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
    rootGroup: rootGroup,
    reflow
  })

  const { mainAxis, crossAxis, depthAxis } = flexContext

  const { node: rootNode } = createNodeContext()
  $: rootNode.setWidth(width * scaleFactor), rootNode.setHeight(height * scaleFactor)
  $: applyNodeProps(rootNode, $$restProps, scaleFactor), reflow()

  $: flexContext.rootWidth.set(width), flexContext.reflow('Updated root width')
  $: flexContext.rootHeight.set(height), flexContext.reflow('Updated root height')
  $: flexContext.mainAxis.set(plane[0] as Axis), flexContext.reflow('Updated main axis')
  $: flexContext.crossAxis.set(plane[1] as Axis), flexContext.reflow('Updated cross axis')
  $: flexContext.depthAxis.set(getDepthAxis(plane)), flexContext.reflow('Updated depth axis')
  $: flexContext.scaleFactor.set(scaleFactor), flexContext.reflow('Updated scale factor')

  onDestroy(() => {
    rootNode.free()
  })
</script>

<T is={rootGroup}>
  <slot {reflow} />
</T>

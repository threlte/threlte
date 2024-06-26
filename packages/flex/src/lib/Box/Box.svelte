<script lang="ts">
  import { HierarchicalObject, T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import { useFlex } from '../Flex/context'
  import { createUseDimensionsContext } from '../hooks/useDimensions'
  import type { NodeProps } from '../lib/props'
  import { createNodeContext } from '../nodes/context'
  import type { BoxProps } from './Box.svelte'

  let { order, class: _class = '', onreflow, children, ...props }: BoxProps = $props()

  /**
   * Create the context for `useDimensions`
   */
  const dimensionsContext = createUseDimensionsContext()

  const {
    scaleFactor,
    onEvent,
    addNode,
    removeNode,
    updateNodeProps,
    mainAxis,
    crossAxis,
    depthAxis,
    classParser,
    reflow,
  } = useFlex()

  const group = new Group()
  group.userData.isNode = true
  const contentGroup = new Group()

  const { yoga } = useFlex()

  const node = yoga.Node.create()

  const parentNodeContext = createNodeContext(node)
  parentNodeContext?.insertNode(node, order)
  onDestroy(() => {
    parentNodeContext?.removeNode(node)
  })

  // update the order of the node
  $effect.pre(() => parentNodeContext?.updateNodeOrder(node, order))

  addNode(node, group, props as NodeProps)
  updateNodeProps(node, { ...classParser?.(_class, {}), ...props } as NodeProps, true)

  $effect.pre(() => updateNodeProps(node, { ...classParser?.(_class, {}), ...props } as NodeProps))

  onDestroy(() => {
    removeNode(node)
  })

  let computedWidth = $state(1)
  let computedHeight = $state(1)

  // after the parent has been reflowed, we can use the calculated layout to set the properties of the box
  onEvent('reflow:after', () => {
    computedWidth =
      typeof props.width === 'number' ? props.width : node.getComputedWidth() / $scaleFactor

    computedHeight =
      typeof props.height === 'number' ? props.height : node.getComputedHeight() / $scaleFactor

    contentGroup.position[$mainAxis] = computedWidth / 2
    contentGroup.position[$crossAxis] = -computedHeight / 2
    contentGroup.position[$depthAxis] = 0

    dimensionsContext.width.set(computedWidth)
    dimensionsContext.height.set(computedHeight)

    onreflow?.({
      width: computedWidth,
      height: computedHeight
    })
  })
</script>

<T is={group}>
  <T is={contentGroup} />
</T>

<HierarchicalObject
  onChildMount={(child) => {
    if (child.userData.isNode) {
      group.add(child)
    } else {
      contentGroup.add(child)
    }
  }}
  onChildDestroy={(child) => {
    if (child.userData.isNode) {
      group.remove(child)
    } else {
      contentGroup.remove(child)
    }
  }}
>
  {@render children?.({ reflow, width: computedWidth, height: computedHeight })}
</HierarchicalObject>

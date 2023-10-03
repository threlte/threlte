<script lang="ts">
  import { HierarchicalObject, T, createRawEventDispatcher } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import { useFlex } from '../Flex/context'
  import { createUseDimensionsContext } from '../hooks/useDimensions'
  import type { NodeProps } from '../lib/props'
  import { createNodeContext } from '../nodes/context'
  import type { BoxEvents, BoxProps, BoxSlots } from './Box.svelte'

  type $$Props = BoxProps
  type $$Events = BoxEvents
  type $$Slots = BoxSlots

  export let order: $$Props['order'] = undefined
  let _class: Required<$$Props>['class'] = ''
  export { _class as class }

  const dispatch = createRawEventDispatcher<$$Events>()

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
    reflow
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
  $: parentNodeContext?.updateNodeOrder(node, order)

  addNode(node, group, $$restProps as NodeProps)
  updateNodeProps(node, { ...classParser?.(_class, {}), ...$$restProps } as NodeProps, true)
  $: updateNodeProps(node, { ...classParser?.(_class, {}), ...$$restProps } as NodeProps)
  onDestroy(() => {
    removeNode(node)
  })

  let computedWidth = 1
  let computedHeight = 1

  /**
   * Untrack contentGroup
   */
  const getContentGroup = () => {
    return contentGroup
  }

  // after the parent has been reflowed, we can use the calculated layout to set the properties of the box
  onEvent('reflow:after', () => {
    computedWidth =
      typeof $$restProps.width === 'number'
        ? $$restProps.width
        : node.getComputedWidth() / $scaleFactor

    computedHeight =
      typeof $$restProps.height === 'number'
        ? $$restProps.height
        : node.getComputedHeight() / $scaleFactor

    getContentGroup().position[$mainAxis] = computedWidth / 2
    getContentGroup().position[$crossAxis] = -computedHeight / 2
    getContentGroup().position[$depthAxis] = 0

    dimensionsContext.width.set(computedWidth)
    dimensionsContext.height.set(computedHeight)

    dispatch('reflow', {
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
  <slot
    {reflow}
    width={computedWidth}
    height={computedHeight}
  />
</HierarchicalObject>

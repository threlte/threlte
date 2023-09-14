<script lang="ts">
  import { HierarchicalObject, T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Group } from 'three'
  import type { NodeProps } from '../lib/props'
  import { useFlex } from '../Flex/context'
  import { createNodeContext } from '../nodes/context'

  type $$Props = NodeProps & {
    order?: number
  }

  export let order: $$Props['order'] = undefined

  const {
    scaleFactor,
    onEvent,
    addNode,
    removeNode,
    updateNodeProps,
    mainAxis,
    crossAxis,
    depthAxis
  } = useFlex()

  export const group = new Group()
  export const contentGroup = new Group()

  group.userData.isNode = true

  export const { node } = createNodeContext(order)

  addNode(node, group, $$restProps as NodeProps)
  updateNodeProps(node, $$restProps as NodeProps, true)
  $: updateNodeProps(node, $$restProps as NodeProps)
  onDestroy(() => {
    removeNode(node)
  })

  let computedWidth = 1
  let computedHeight = 1

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

    contentGroup.position[$mainAxis] = computedWidth / 2
    contentGroup.position[$crossAxis] = -computedHeight / 2
    contentGroup.position[$depthAxis] = 0
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
    width={computedWidth}
    height={computedHeight}
  />
</HierarchicalObject>

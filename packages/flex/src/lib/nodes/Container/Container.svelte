<script lang="ts">
  import { HierarchicalObject, T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Group, Object3D } from 'three'
  import { createNodeContext } from '../createNodeContext'
  import { useRoot } from '../../Root/useRoot'
  import type { NodeProps } from '../../lib/props'

  type $$Props = NodeProps & {
    order?: number
  }

  export let order: $$Props['order'] = undefined

  const { scaleFactor, onEvent, addNode, removeNode, updateNodeProps, mainAxis, crossAxis } =
    useRoot()

  export const group = new Group()

  const contentGroup = new Group()

  export const { node } = createNodeContext(order)

  addNode(node, group, $$restProps as NodeProps, 'container')
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

    contentGroup.position.copy(group.position)
    contentGroup.position[$mainAxis] += computedWidth / 2
    contentGroup.position[$crossAxis] += -computedHeight / 2
  })
</script>

<T is={group} />
<T is={contentGroup} />

<HierarchicalObject
  onChildMount={(child) => {
    if (child.userData.isItem) {
      group.add(child)
    } else {
      contentGroup.add(child)
    }
  }}
  onChildDestroy={(child) => {
    if (child.userData.isItem) {
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

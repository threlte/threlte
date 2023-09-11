<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy, onMount } from 'svelte'
  import { Box3, Group, Vector3 } from 'three'
  import { useFlex } from '../hooks/useFlex'
  import { useRoot } from '../hooks/useRoot'
  import { applyNodeProps } from '../lib/applyNodeProps'
  import { getOBBSize } from '../lib/getOrientedBoundingBoxSize'
  import { getRootShift } from '../lib/getRootShift'
  import { logTable } from '../lib/logTable'
  import type { NodeProps } from '../types/props'

  type $$Props = NodeProps & {
    centerAnchor?: boolean
  }

  export let centerAnchor: $$Props['centerAnchor'] = undefined

  const {
    addChild,
    yoga,
    removeChild,
    onEvent,
    group: rootGroup,
    reflow,
    node: rootNode
  } = useFlex()
  const { scaleFactor, mainAxis, crossAxis, depthAxis, rootWidth, rootHeight } = useRoot()

  const boxNode = yoga.Node.create()

  $: applyNodeProps(boxNode, $$restProps, $scaleFactor), reflow()

  const group = new Group()

  const boundingBox = new Box3()
  const vec = new Vector3()

  let destroyed = false

  // before the parent is reflowed, we need to set the correct size of the box
  onEvent('reflow:before', (type) => {
    if (destroyed) return

    // const scaledWidth =
    //   typeof flexProps.width === 'number' ? flexProps.width * $scaleFactor : flexProps.width
    // const scaledHeight =
    //   typeof flexProps.height === 'number' ? flexProps.height * $scaleFactor : flexProps.height

    // if (scaledWidth !== undefined && scaledHeight !== undefined) {
    //   // Forced size, no need to calculate bounding box
    //   node.setWidth(scaledWidth)
    //   node.setHeight(scaledHeight)
    // } else if (node.getChildCount() === 0) {
    // No size specified, calculate size
    if (rootGroup) {
      getOBBSize(group, rootGroup, boundingBox, vec)
    } else {
      // rootGroup ref is missing for some reason, let's just use usual bounding box
      boundingBox.setFromObject(group).getSize(vec)
    }

    boxNode.setWidth(vec[$mainAxis] * $scaleFactor)
    boxNode.setHeight(vec[$crossAxis] * $scaleFactor)
  })

  // after the parent has been reflowed, we can use the calculated layout to set the properties of the box
  onEvent('reflow:after', () => {
    const layout = boxNode.getComputedLayout()

    const { left, top, width, height } = layout
    const [mainAxisShift, crossAxisShift] = getRootShift(
      centerAnchor,
      $rootWidth,
      $rootHeight,
      boxNode
    )

    const position = new Vector3()
    position[$mainAxis] = (mainAxisShift + left + (centerAnchor ? width / 2 : 0)) / $scaleFactor
    position[$crossAxis] = -(crossAxisShift + top + (centerAnchor ? height / 2 : 0)) / $scaleFactor
    position[$depthAxis] = 0

    group.position.copy(position)
  })

  onMount(() => {
    addChild(boxNode)
  })

  onDestroy(() => {
    destroyed = true
    removeChild(boxNode)
    boxNode.freeRecursive()
  })
</script>

<T is={group}>
  <slot />
</T>

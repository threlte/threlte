<script lang="ts">
  import { T } from '@threlte/core'
  import { Box3, Group, Vector3 } from 'three'
  import { useRoot } from '../hooks/useRoot'
  import { getOrientedBoundingBoxSize } from '../lib/getOrientedBoundingBoxSize'
  import { getRootShift } from '../lib/getRootShift'
  import { applyNodeProps, type NodeProps } from '../lib/props'
  import { createNodeContext } from './createNodeContext'

  type $$Props = NodeProps & {
    centerAnchor?: boolean
    order?: number
  }

  export let centerAnchor: $$Props['centerAnchor'] = undefined
  export let order: $$Props['order'] = undefined

  const {
    scaleFactor,
    onEvent,
    mainAxis,
    crossAxis,
    rootGroup,
    depthAxis,
    rootWidth,
    rootHeight,
    reflow
  } = useRoot()

  export const group = new Group()
  export const { node } = createNodeContext(order)

  $: applyNodeProps(node, $$restProps as NodeProps, $scaleFactor), reflow()

  const boundingBox = new Box3()
  const vec3 = new Vector3()

  let computedWidth = 1
  let computedHeight = 1

  // before the parent is reflowed, we need to set the correct size of the box
  onEvent('reflow:before', () => {
    const scaledWidth =
      typeof $$restProps.width === 'number' ? $$restProps.width * $scaleFactor : $$restProps.width
    const scaledHeight =
      typeof $$restProps.height === 'number'
        ? $$restProps.height * $scaleFactor
        : $$restProps.height

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

      node.setWidth(scaledWidth || vec3[$mainAxis] * $scaleFactor)
      node.setHeight(scaledHeight || vec3[$crossAxis] * $scaleFactor)
    }
  })

  // after the parent has been reflowed, we can use the calculated layout to set the properties of the box
  onEvent('reflow:after', () => {
    const layout = node.getComputedLayout()

    const { left, top, width, height } = layout
    const [mainAxisShift, crossAxisShift] = getRootShift(
      centerAnchor,
      $rootWidth,
      $rootHeight,
      node
    )

    const position = new Vector3()
    position[$mainAxis] = (mainAxisShift + left + (centerAnchor ? width / 2 : 0)) / $scaleFactor
    position[$crossAxis] = -(crossAxisShift + top + (centerAnchor ? height / 2 : 0)) / $scaleFactor
    position[$depthAxis] = 0

    group.position.copy(position)

    computedWidth =
      typeof $$restProps.width === 'number'
        ? $$restProps.width
        : node.getComputedWidth() / $scaleFactor

    computedHeight =
      typeof $$restProps.height === 'number'
        ? $$restProps.height
        : node.getComputedHeight() / $scaleFactor
  })
</script>

<T is={group}>
  <slot
    width={computedWidth}
    height={computedHeight}
  />
</T>

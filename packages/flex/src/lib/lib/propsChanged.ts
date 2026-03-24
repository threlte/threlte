import type { Node } from 'yoga-layout'
import type { NodeProps } from './props.js'

const nodePropsMap = new WeakMap<Node, NodeProps>()

/**
 * Because all NodeProps are primitive types, we can make a simple comparison
 * and only request a reflow when necessary. We do that by checking the length
 * of the props object and then checking if all keys are the same and all values
 * are the same.
 */
export const propsChanged = (node: Node, props: NodeProps) => {
  // get a reference to the props data for this node
  const propsData = nodePropsMap.get(node)

  // assume that the props have changed
  let changed = true

  if (propsData) {
    // compare the keys and values of the previous and current props
    const previousKeys = Object.keys(propsData) as (keyof NodeProps)[]
    const currentKeys = Object.keys(props) as (keyof NodeProps)[]
    if (
      previousKeys.length === currentKeys.length &&
      currentKeys.every((key) => previousKeys.includes(key)) &&
      previousKeys.every((key) => propsData[key] === props[key])
    ) {
      changed = false
    }
  }

  // update the props data for this node
  nodePropsMap.set(node, props)

  return changed
}

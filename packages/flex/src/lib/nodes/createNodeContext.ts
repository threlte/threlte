import { onDestroy, setContext, tick } from 'svelte'
import type { Group } from 'three'
import type { Node } from 'yoga-layout'
import { useRoot } from '../Root/useRoot'
import { useNode } from './useNode'

export type NodeContext = {
  node: Node
  insertChild: (child: Node, order?: number) => void
  removeChild: (child: Node) => void
}

export const nodeContextName = '__threlte-node'

export const createNodeContext = (order?: number): NodeContext => {
  const { yoga } = useRoot()

  const node = yoga.Node.create()

  const parentNodeContext = useNode()

  parentNodeContext?.insertChild(node, order)
  onDestroy(() => {
    parentNodeContext?.removeChild(node)
  })

  const data: NodeContext = {
    node,
    insertChild(child, order) {
      if (order !== undefined) {
        data.node.insertChild(child, order)
      } else {
        data.node.insertChild(child, data.node.getChildCount())
      }
    },
    removeChild(child) {
      data.node.removeChild(child)
    }
  }

  setContext<NodeContext>(nodeContextName, data)
  return data
}

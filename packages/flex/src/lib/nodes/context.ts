import { getContext, setContext } from 'svelte'
import type { Node } from 'yoga-layout'

export type NodeContext = {
  insertNode: (childNode: Node, order?: number) => void
  removeNode: (childNode: Node) => void
}

export const nodeContextName = '__threlte-node'

export const createNodeContext = (node: Node): NodeContext | undefined => {
  const childNodes = new Set<Node>()
  const childNodesOrderMap: Map<Node, { requestedOrder?: number }> = new Map()

  const parentNodeContext = getContext<NodeContext | undefined>(nodeContextName)

  setContext<NodeContext>(nodeContextName, {
    insertNode(childNode, order) {
      // we want to keep track of all child nodes
      childNodes.add(childNode)

      // Additionally, we need to keep track of child nodes that need to be inserted at a specific order
      if (order !== undefined) {
        childNodesOrderMap.set(childNode, {
          requestedOrder: order
        })
      }

      if (childNodesOrderMap.size) {
        // we need to sort the child nodes by their requested order. We leave the nodes that don't have a requested order untouched.
        const sorted = Array.from(childNodes)
          .map((node, index) => {
            return {
              order: childNodesOrderMap.get(node)?.requestedOrder ?? index,
              node
            }
          })
          .sort((a, b) => a.order - b.order)
          .map(({ node }) => node)

        // Then we need to remove all child nodes from the node and insert them in the correct order.
        sorted.forEach((childNode) => {
          node.removeChild(childNode)
        })
        sorted.forEach((childNode, index) => {
          node.insertChild(childNode, index)
        })
      } else {
        node.insertChild(childNode, node.getChildCount())
      }
    },
    removeNode(childNode) {
      node.removeChild(childNode)
      childNodes.delete(childNode)
      childNodesOrderMap.delete(childNode)
    }
  })

  return parentNodeContext
}

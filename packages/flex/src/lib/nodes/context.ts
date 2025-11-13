import { getContext, setContext } from 'svelte'
import type { Node } from 'yoga-layout'
import { useReflow } from '../hooks/useReflow.js'

export type NodeContext = {
  insertNode: (childNode: Node, order?: number) => void
  removeNode: (childNode: Node) => void
  updateNodeOrder: (childNode: Node, order?: number) => void
}

export const nodeContextName = '__threlte-node'

export const createNodeContext = (node: Node): NodeContext | undefined => {
  const reflow = useReflow()

  /** Set to keep track of all child nodes */
  const childNodes = new Set<Node>()

  /** Map to keep track of the requested order of nodes */
  const childNodesOrderMap: Map<Node, { requestedOrder?: number }> = new Map()

  const parentNodeContext = getContext<NodeContext | undefined>(nodeContextName)

  const removeAllChildNodes = () => {
    childNodes.forEach((childNode) => {
      node.removeChild(childNode)
    })
  }

  setContext<NodeContext>(nodeContextName, {
    insertNode(childNode, order) {
      // we want to keep track of all child nodes
      childNodes.add(childNode)

      // Additionally, we need to keep track of child nodes that need to be
      // inserted at a specific order
      if (order !== undefined) {
        childNodesOrderMap.set(childNode, {
          requestedOrder: order
        })
      }

      if (childNodesOrderMap.size) {
        // we need to sort the child nodes by their requested order. We leave
        // the nodes that don't have a requested order untouched.
        const sorted = Array.from(childNodes)
          .map((node, index) => {
            return {
              order: childNodesOrderMap.get(node)?.requestedOrder ?? index,
              node
            }
          })
          .sort((a, b) => a.order - b.order)
          .map(({ node }) => node)

        // Then we need to remove all child nodes from the node and insert them
        // in the correct order.
        removeAllChildNodes()

        sorted.forEach((childNode, index) => {
          node.insertChild(childNode, index)
        })
      } else {
        node.insertChild(childNode, node.getChildCount())
      }
      reflow()
    },
    removeNode(childNode) {
      node.removeChild(childNode)
      childNodes.delete(childNode)
      childNodesOrderMap.delete(childNode)
      reflow()
    },
    updateNodeOrder(childNode, order) {
      let update = false
      const oldOrder = childNodesOrderMap.get(childNode)?.requestedOrder
      if (order === undefined) {
        // if the order is undefined, we remove the node from the map
        if (oldOrder !== undefined) {
          childNodesOrderMap.delete(childNode)
          update = true
        }
      } else {
        // if the order is defined, we update the node in the map
        const oldOrder = childNodesOrderMap.get(childNode)?.requestedOrder
        if (oldOrder !== order) {
          childNodesOrderMap.set(childNode, {
            requestedOrder: order
          })
          update = true
        }
      }

      // if there's no update, return early
      if (!update) return

      // remove all child nodes from the node
      removeAllChildNodes()

      // we need to sort the child nodes by their requested order. We leave the
      // nodes that don't have a requested order untouched.
      const sorted = Array.from(childNodes)
        .map((node, index) => {
          return {
            order: childNodesOrderMap.get(node)?.requestedOrder ?? index,
            node
          }
        })
        .sort((a, b) => a.order - b.order)
        .map(({ node }) => node)

      // Then we need to remove all child nodes from the node and insert them in
      // the correct order.
      removeAllChildNodes()

      sorted.forEach((childNode, index) => {
        node.insertChild(childNode, index)
      })

      reflow()
    }
  })

  return parentNodeContext
}

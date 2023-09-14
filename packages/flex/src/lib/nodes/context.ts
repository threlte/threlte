import { getContext, onDestroy, setContext } from 'svelte'
import type { Node } from 'yoga-layout'
import { useFlex } from '../Flex/context'

export type NodeContext = {
  node: Node
  insertChild: (child: Node, order?: number) => void
  removeChild: (child: Node) => void
}

export const nodeContextName = '__threlte-node'

export const useNode = () => {
  return getContext<NodeContext>(nodeContextName)
}

export const createNodeContext = (order?: number): NodeContext => {
  const { yoga } = useFlex()

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

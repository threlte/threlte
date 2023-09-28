import type { Node } from 'yoga-layout'

export const isTopLevelChildNode = (node: Node) => !node.getParent()?.getParent()

import type { Node } from 'yoga-layout'
import { isTopLevelChildNode } from './isTopLevelChildNode.js'

/** @returns [mainAxisShift, crossAxisShift] */
export const getRootShift = (rootWidth: number, rootHeight: number, node: Node) => {
  if (!isTopLevelChildNode(node)) {
    return [0, 0]
  }
  const mainAxisShift = -rootWidth / 2
  const crossAxisShift = -rootHeight / 2
  return [mainAxisShift, crossAxisShift] as const
}

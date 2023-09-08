import { setContext } from 'svelte'
import type { Node, Yoga } from 'yoga-layout'

export type FlexContext = {
  node: Node
  yoga: Yoga
  order: number[]
  addChild: (child: Node) => void
  removeChild: (child: Node) => void
}

export const flexContextName = '__threlte-flex'

export const createFlexContext = (data: FlexContext) => {
  setContext<FlexContext>(flexContextName, data)
  return data
}

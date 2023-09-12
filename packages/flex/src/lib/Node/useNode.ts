import { getContext } from 'svelte'
import { nodeContextName, type NodeContext } from './createNodeContext'

export const useNode = () => {
  return getContext<NodeContext>(nodeContextName)
}

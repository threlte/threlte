import { getContext } from 'svelte'
import { rootContextName, type RootContext } from './createRootContext'

export const useRoot = () => {
  return getContext<RootContext>(rootContextName)
}

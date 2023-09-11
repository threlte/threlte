import { getContext } from 'svelte'
import { rootContextName, type RootContextData } from '../context/createRootContext'

export const useRoot = () => {
  return getContext<RootContextData>(rootContextName)
}

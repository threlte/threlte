import { getContext } from 'svelte'
import { rootContextName, type RootContext } from '../context/createRootContext'

export const useRoot = () => {
  return getContext<RootContext>(rootContextName)
}

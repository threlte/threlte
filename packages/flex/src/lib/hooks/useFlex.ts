import { getContext } from 'svelte'
import { flexContextName, type FlexContext } from '../context/createFlexContext'

export const useFlex = () => {
  return getContext<FlexContext>(flexContextName)
}

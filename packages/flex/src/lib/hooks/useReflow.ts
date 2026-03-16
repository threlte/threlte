import { getContext } from 'svelte'
import { flexContextName, type FlexContext } from '../Flex/context.js'

/**
 * The hook useReflow allows you to manually request a [layout
 * reflow](https://threlte.xyz/docs/reference/flex/flex#layout-reflow), for
 * instance when a [`<Text>`](https://threlte.xyz/docs/reference/extras/text)
 * component finished synchronizing or when a model has loaded into view and
 * there’s no easy access to the reflow slot prop of the components `<Flex>` or
 * `<Box>` because of component composition. Calls to`reflow` will be limited to
 * once per frame, so it’s safe to call it from multiple components at a time.
 */
export const useReflow = () => {
  const flexContext = getContext<FlexContext>(flexContextName)

  if (!flexContext) {
    throw new Error('useReflow must be used within a <Flex> component')
  }

  return flexContext.reflow
}

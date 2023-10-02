import { getContext, setContext } from 'svelte'
import { currentWritable, type CurrentWritable } from '@threlte/core'

type UseDimensionsContext = {
  width: CurrentWritable<number>
  height: CurrentWritable<number>
}

export const flexContextName = '__threlte-flex-dimensions'

/**
 * Creates a context for useDimensions.
 */
export const createUseDimensionsContext = () => {
  const context: UseDimensionsContext = {
    width: currentWritable(0),
    height: currentWritable(0)
  }
  setContext(flexContextName, context)
  return context
}

/**
 * The hook `useDimensions` can be used to retrieve the computed width and
 * height of a `<Flex>` or `<Box>` component as
 * [CurrentWritable](https://threlte.xyz/docs/reference/core/utilities#currentwritable)
 * stores.
 *
 * ## Usage
 *
 * ### In a `<Flex>` component
 *
 * Because there's no viewport to measure, the width and height of a `<Flex>`
 * component need to be set manually. Nevertheless, the dimensions of the
 * contents of the `<Flex>` component will be measured after a layout reflow and
 * can be retrieved using `useDimensions` in a direct child component to
 * `<Flex>`.
 *
 * ### In a `<Box>` component
 *
 * By default `@threlte/flex` controls elements position only. In some cases you
 * may want to control element sizing too. Since `@threlte/flex` has no
 * information about how the inner content size works, you need to set your
 * content size manually. You can do this by using `useDimensions` hook in a
 * direct child component to `<Box>`.
 *
 * @example
 * ```svelte
 * <script>
 *  import { useDimensions } from '@threlte/flex'
 *
 *  const { width, height } = useDimensions()
 * </script>
 *
 * <T.Mesh scale.x={$width} scale.y={$height}>
 *   <T.BoxGeometry />
 *   <T.MeshBasicMaterial color="red" />
 * </T.Mesh>
 * ```
 */
export const useDimensions = () => {
  const context = getContext<UseDimensionsContext>(flexContextName)
  if (!context) {
    throw new Error('useDimensions must be used within a <Flex> component')
  }
  return context
}

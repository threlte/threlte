import type { NodeProps } from './props'

/**
 * This function will align the flex props to the web-standard.
 *
 * yoga-layout uses `Column` as the default flex direction, but we
 * want to use `Row` as the default (web-standard). This function will return
 * the props with the default flex direction applied if it is not already set.
 */
export const alignFlexProps = (props: NodeProps): NodeProps => {
  return { flexDirection: 'Row', ...props }
}

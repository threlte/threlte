import type { NodeProps } from './props'

/**
 * By default yoga-layout uses `Column` as the default flex direction, but we
 * want to use `Row` as the default (web-standard). This function will return
 * the props with the default flex direction applied if it is not already set.
 */
export const alignFlexProps = (props: NodeProps): NodeProps => {
  if (props.dir || props.flexDir || props.flexDirection) return props
  return { dir: 'Row', ...props }
}

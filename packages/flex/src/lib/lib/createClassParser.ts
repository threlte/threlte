import type { NodeProps } from './props'

export const createClassParser = (callback: (className: string) => NodeProps) => {
  return callback
}

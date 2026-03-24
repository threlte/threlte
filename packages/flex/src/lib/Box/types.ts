import type { Snippet } from 'svelte'
import type { NodeProps } from '../lib/props.js'

export type BoxProps = NodeProps & {
  order?: number | undefined
  class?: string

  children?: Snippet<
    [
      {
        reflow: () => void
        width: number
        height: number
      }
    ]
  >

  onreflow?: (event: { width: number; height: number }) => void
}

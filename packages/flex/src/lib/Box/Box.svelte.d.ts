import { SvelteComponent } from 'svelte'
import type { NodeProps } from '../lib/props'

type BoxProps = NodeProps & {
  order?: number | undefined
  class?: string

  onreflow: (event: { width: number; height: number }) => void
}

type BoxSlots = {
  default: {
    reflow: () => void
    width: number
    height: number
  }
}

export default class Box extends SvelteComponent<BoxProps, {}, BoxSlots> {}

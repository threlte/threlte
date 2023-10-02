import { SvelteComponent } from 'svelte'
import type { NodeProps } from '../lib/props'

type BoxProps = NodeProps & {
  order?: number | undefined
  class?: string
}

type BoxEvents = {
  reflow: {
    width: number
    height: number
  }
}

type BoxSlots = {
  default: {
    reflow: () => void
    width: number
    height: number
  }
}

export default class Box extends SvelteComponent<BoxProps, BoxEvents, BoxSlots> {}

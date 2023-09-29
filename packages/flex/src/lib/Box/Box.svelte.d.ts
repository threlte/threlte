import { SvelteComponent } from 'svelte'
import type { NodeProps } from '../lib/props'

type BoxProps = NodeProps & {
  order?: number
  class?: string
}

type BoxEvents = {}

type BoxSlots = {
  default: {
    width: number
    height: number
  }
}

export default class Box extends SvelteComponent<BoxProps, BoxEvents, BoxSlots> {}

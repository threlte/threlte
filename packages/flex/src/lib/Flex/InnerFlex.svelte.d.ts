import { SvelteComponent } from 'svelte'
import type { Direction, Yoga } from 'yoga-layout'
import type { NodeProps } from '../lib/props'
import type { ClassParser, FlexPlane } from '../lib/props'

type InnerFlexProps = NodeProps & {
  yoga: Yoga
  width?: number
  height?: number
  plane?: FlexPlane
  direction?: keyof typeof Direction
  scaleFactor?: number
  class?: string
  classParser?: ClassParser
}

type InnerFlexEvents = {
  reflow: {
    width: number
    height: number
  }
}

type InnerFlexSlots = {
  default: {
    reflow: () => void
  }
}

export default class InnerFlex extends SvelteComponent<
  InnerFlexProps,
  InnerFlexEvents,
  InnerFlexSlots
> {}

import type { Stage } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Direction, Yoga } from 'yoga-layout'
import type { ClassParser, FlexPlane, NodeProps } from '../lib/props'

type InnerFlexProps = NodeProps & {
  yoga: Yoga
  width?: number
  height?: number
  plane?: FlexPlane
  direction?: keyof typeof Direction
  scaleFactor?: number
  class?: string
  classParser?: ClassParser
  reflowStage?: Stage

  onreflow: (event: { width: number; height: number }) => void
}

type InnerFlexSlots = {
  default: {
    reflow: () => void
    width: number
    height: number
  }
}

export default class InnerFlex extends SvelteComponent<InnerFlexProps, {}, InnerFlexSlots> {}

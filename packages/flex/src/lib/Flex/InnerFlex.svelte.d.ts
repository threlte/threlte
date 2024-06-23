import type { Stage } from '@threlte/core'
import { SvelteComponent, type Snippet } from 'svelte'
import type { Direction, Yoga } from 'yoga-layout'
import type { ClassParser, FlexPlane, NodeProps } from '../lib/props'
import type { Group } from 'three'

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
  ref?: Group

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

export default class InnerFlex extends SvelteComponent<InnerFlexProps> {}

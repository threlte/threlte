import type { Stage } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { Group } from 'three'
import type Yoga from 'yoga-layout'
import type { Direction } from 'yoga-layout'
import type { ClassParser, FlexPlane, NodeProps } from '../lib/props.js'

export type InnerFlexProps = NodeProps & {
  yoga: typeof Yoga
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

export type FlexProps = Omit<InnerFlexProps, 'yoga'>

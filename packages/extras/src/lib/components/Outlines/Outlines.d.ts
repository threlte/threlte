import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, Group } from 'three'

export type OutlinesProps = Props<Group> & {
  /** Outline color, default: black */
  color?: ColorRepresentation

  /** Line thickness is independent of zoom, default: false */
  screenspace?: boolean

  /** Outline opacity, default: 1 */
  opacity?: number

  /** Outline transparency, default: false */
  transparent?: boolean

  /** Outline thickness, default 0.05 */
  thickness?: number

  toneMapped?: boolean

  /** Geometry crease angle (0 === no crease), default: Math.PI */
  angle?: number

  polygonOffset?: boolean
  polygonOffsetFactor?: number
  renderOrder?: number
}

export type OutlinesEvents = Events<Group>

export type OutlinesSlots = Slots<Group>

export default class Outlines extends SvelteComponent<
  OutlinesProps,
  OutlinesEvents,
  OutlinesSlots
> {}

import type { Key, ThrelteUseTaskOptions } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation } from 'three'

type TaskOptions = Pick<ThrelteUseTaskOptions, 'after' | 'before' | 'stage'> & { key?: Key }

export type GizmoProps = {
  renderTask?: TaskOptions
  animationTask?: TaskOptions
  turnRate?: number
  center?: [number, number, number]
  verticalPlacement?: 'top' | 'bottom'
  horizontalPlacement?: 'left' | 'right'
  size?: number
  xColor?: ColorRepresentation
  yColor?: ColorRepresentation
  zColor?: ColorRepresentation
  toneMapped?: boolean
  paddingX?: number
  paddingY?: number
}

export type GizmoEvents = Record<string, never>

export type GizmoSlots = Record<string, never>

export default class Gizmo extends SvelteComponent<GizmoProps, GizmoEvents, GizmoSlots> {}

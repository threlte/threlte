import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type GizmoProps = {
  turnRate?: number
  center?: [number, number, number]
  verticalPlacement?: 'top' | 'bottom'
  horizontalPlacement?: 'left' | 'right'
  size?: number
  xColor?: number
  yColor?: number
  zColor?: number
}

export type GizmoEvents = {}

export type GizmoSlots = {}

export default class Gizmo extends SvelteComponent<GizmoProps, GizmoEvents, GizmoSlots> {}
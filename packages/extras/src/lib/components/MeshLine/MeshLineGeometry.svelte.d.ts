import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { BufferGeometry, Vector3 } from 'three'

export type MeshLineGeometryProps = Props<BufferGeometry> & {
  points: Vector3[]
  shape?: 'none' | 'taper' | 'custom'
  shapeFunction?: (p: number) => number
}

export type MeshLineGeometryEvents = Events<BufferGeometry>

export type MeshLineGeometrySlots = Slots<BufferGeometry>

export default class MeshLineGeometry extends SvelteComponent<
  MeshLineGeometryProps,
  MeshLineGeometryEvents,
  MeshLineGeometrySlots
> {}

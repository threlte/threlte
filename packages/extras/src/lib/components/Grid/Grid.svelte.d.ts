import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { ColorRepresentation, Mesh } from 'three'

export type GridProps = Props<Mesh> & {
  axes?: 'xzy' | 'xyz' | 'zyx'
  cellColor?: ColorRepresentation
  cellSize?: number
  cellThickness?: number
  sectionColor?: ColorRepresentation
  sectionSize?: number
  sectionThickness?: number
  gridSize?: number | [number, number]
  followCamera?: boolean
  infiniteGrid?: boolean
  fadeDistance?: number
  fadeStrength?: number
}

export type GridEvents = Events<Mesh>

export type GridSlots = Slots<Mesh>

export default class Grid extends SvelteComponentTyped<GridProps, GridEvents, GridSlots> {}

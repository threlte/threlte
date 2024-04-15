import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, Mesh, Side } from 'three'

export type GridProps = Props<Mesh> & {
  plane?: 'xz' | 'xy' | 'zy'
  cellColor?: ColorRepresentation
  cellSize?: number
  cellThickness?: number
  sectionColor?: ColorRepresentation
  sectionSize?: number
  sectionThickness?: number
  backgroundColor?: ColorRepresentation
  backgroundOpacity?: number
  gridSize?: number | [number, number]
  followCamera?: boolean
  infiniteGrid?: boolean
  fadeDistance?: number
  fadeStrength?: number
  side?: Side
} & (
    | {
        type?: 'grid'
      }
    | {
        type?: 'lines'
        axis: 'x' | 'y' | 'z'
      }
    | {
        type?: 'circular'
        maxRadius?: number
      }
    | {
        type?: 'polar'
        maxRadius?: number
        cellDividers?: number
        sectionDividers?: number
      }
  )

export type GridEvents = Events<Mesh>

export type GridSlots = Slots<Mesh>

export default class Grid extends SvelteComponent<GridProps, GridEvents, GridSlots> {}

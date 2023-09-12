import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { ColorRepresentation, Mesh, Shape } from 'three'

export type GridProps = Props<Mesh> & {
  axes?: 'xzy' | 'xyz' | 'zyx'
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
  type?: GridParams | TopologyParams | CircularParams | PolarParams
}

type GridParams = {
  type: 'grid'
}

type TopologyParams = {
  type: 'lines'
  axis: 'x' | 'y' | 'z'
}

type CircularParams = {
  type: 'circular'
  maxRadius?: number
}

type PolarParams = {
  type: 'polar'
  maxRadius?: number
  cellDividers?: number
  sectionDividers?: number
}

export type GridEvents = Events<Mesh>

export type GridSlots = Slots<Mesh>

export default class Grid extends SvelteComponentTyped<GridProps, GridEvents, GridSlots> {}

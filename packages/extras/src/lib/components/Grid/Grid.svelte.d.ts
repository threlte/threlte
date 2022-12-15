import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { ColorRepresentation, Mesh } from 'three'

export type GridProps = Omit<Props<Mesh>, 'material' | 'geometry'> & {
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

export default class Grid extends SvelteComponentTyped<GridProps, Events<Mesh>, Slots<Mesh>> {}

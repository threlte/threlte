import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, Points, Vector3 } from 'three'

export type SparklesProps = Props<Points> & {
  /** Number of particles (default: 100) */
  count: number
  /** Speed of particles (default: 1) */
  speed: number | Float32Array
  /** Opacity of particles (default: 1) */
  opacity: number | Float32Array
  /** Color of particles (default: 100) */
  color: ColorRepresentation | Float32Array
  /** Size of particles (default: randomized between 0 and 1) */
  size: number | Float32Array
  /** The space the particles occupy (default: 1) */
  scale: number | [number, number, number] | Vector3
  /** Movement factor (default: 1) */
  noise: number | [number, number, number] | Vector3 | Float32Array

  /** Experimental: try to exclude material and geometry */
  material: never
  geometry: never
}

export default class Sparkles extends SvelteComponent<
  SparklesProps,
  Events<Points>,
  Slots<Points>
> {}

import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Mesh } from 'three'
import type { Font } from 'three/examples/jsm/Addons.js'

export type Text3DProps = Props<Mesh> & {
  /**
   * The loaded font
   */
  font: Font | string
  /**
   * The text to display
   */
  text: string

  /**
   * The size of the text
   * @default 100
   */
  size?: number
  /**
   * The thickness of the text
   * @default 50
   */
  height?: number
  /**
   * The number of points on the curves
   * @default 12
   */
  curveSegments?: number
  /**
   * Turn on bevel
   * @default false
   */
  bevelEnabled?: boolean
  /**
   * How deep into text bevel goes
   * @default 10
   */
  bevelThickness?: number
  /**
   * How far from text outline is bevel
   * @default 8
   */
  bevelSize?: number
  /**
   * How far from text outline bevel starts
   * @default 0
   */
  bevelOffset?: number
  /**
   * Number of bevel segments
   * @default 3
   */
  bevelSegments?: number
}

export type Text3DEvents = Events<Mesh>
export type Text3DSlots = Slots<Mesh>

export default class Text3D extends SvelteComponent<Text3DProps, Text3DEvents, Text3DSlots> {}

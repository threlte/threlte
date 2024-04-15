import type { Events, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { BufferGeometry } from 'three'
import type {
  TextGeometry,
  TextGeometryParameters
} from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

export type Text3DProps = Omit<TextGeometryParameters, 'font'> & {
  /**
   * The text to display
   */
  text: string

  /**
   * The loaded font or path to font file
   * @default 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json'
   */
  font?: Font | string

  /**
   * Smooth shading
   * @default 0
   */
  smooth?: number
}

export type Text3DEvents = Events<BufferGeometry> & {
  rendered: (mesh: TextGeometry) => void
}

export type Text3DSlots = Slots<BufferGeometry>

export default class Text3D extends SvelteComponent<Text3DProps, Text3DEvents, Text3DSlots> {}

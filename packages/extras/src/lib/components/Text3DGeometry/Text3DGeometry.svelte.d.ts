import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

export type Text3DProps = Props<TextGeometry> & {
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

  onrendered?: (mesh: TextGeometry) => void
}

export default class Text3D extends SvelteComponent<Text3DProps> {}

import type { Props } from '@threlte/core'
import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import type { Vector3, Curve, UVGenerator } from 'three'

export type Text3DProps = Props<TextGeometry> & {
  /**
   * The text to display.
   */
  text: string

  /**
   * The loaded font or path to font file
   * @default 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json'
   */
  font?: Font | string
  /** @default 100 */
  size?: number
  /** @default 50 */
  depth?: number
  /** @default 12 */
  curveSegments?: number
  /** @default false */
  bevelEnabled?: boolean
  /** @default 10 */
  bevelThickness?: number
  /** @default 8 */
  bevelSize?: number
  /** @default 0 */
  bevelOffset?: number
  /** @default 3 */
  bevelSegments?: number
  /**
   * Smooth shading
   * @default 0
   */
  smooth?: number
  extrudePath?: Curve<Vector3>
  /** @default 1 */
  steps?: number
  UVGenerator?: UVGenerator

  onrendered?: (mesh: TextGeometry) => void
}

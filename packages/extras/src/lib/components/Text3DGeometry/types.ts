import type { Props } from '@threlte/core'
import type { Curve, UVGenerator, Vector3 } from 'three'
import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

export interface Text3DProps extends Props<TextGeometry> {
  /** The text to turn into geometry. */
  text: string

  /**
   * A loaded font, or the URL of a typeface.json font to load.
   * @default 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json'
   */
  font?: Font | string

  /**
   * The size of the text.
   * @default 100
   */
  size?: number

  /**
   * How far the text is extruded.
   * @default 50
   */
  depth?: number

  /**
   * The number of points on each curve of the glyphs.
   * @default 12
   */
  curveSegments?: number

  /**
   * Bevels the edges of the text.
   * @default false
   */
  bevelEnabled?: boolean

  /**
   * How deep the bevel goes into the text.
   * @default 10
   */
  bevelThickness?: number

  /**
   * How far the bevel extends from the text's outline.
   * @default 8
   */
  bevelSize?: number

  /**
   * How far from the text's outline the bevel starts.
   * @default 0
   */
  bevelOffset?: number

  /**
   * The number of bevel layers.
   * @default 3
   */
  bevelSegments?: number

  /**
   * A curve to extrude the text along instead of a straight line. Disables
   * the bevel.
   */
  extrudePath?: Curve<Vector3>

  /**
   * The number of segments along the extrusion.
   * @default 1
   */
  steps?: number

  /** Generates the UVs of the extruded geometry. */
  UVGenerator?: UVGenerator

  /**
   * Smooths the normals wherever faces meet at an angle below this, in
   * radians. `0` keeps every face flat.
   * @default Math.PI / 3
   */
  smooth?: number

  /** Called with the new geometry whenever the text geometry is rebuilt. */
  onrendered?: (geometry: TextGeometry) => void
}

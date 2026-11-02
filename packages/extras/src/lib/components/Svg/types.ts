import type { Props } from '@threlte/core'
import type { Group, Mesh, MeshBasicMaterial } from 'three'

export interface SvgProps extends Props<typeof Group> {
  /** The SVG to render, as a URL or as SVG markup starting with `<svg`. */
  src: string

  /**
   * Skips the shapes' fills and draws only their strokes.
   * @default false
   */
  skipFill?: boolean

  /**
   * Skips the shapes' strokes and draws only their fills.
   * @default false
   */
  skipStrokes?: boolean

  /** Props spread onto every fill material, a `MeshBasicMaterial`. */
  fillMaterialProps?: Props<typeof MeshBasicMaterial>

  /** Props spread onto every stroke material, a `MeshBasicMaterial`. */
  strokeMaterialProps?: Props<typeof MeshBasicMaterial>

  /** Props spread onto every fill mesh. */
  fillMeshProps?: Props<typeof Mesh>

  /** Props spread onto every stroke mesh. */
  strokeMeshProps?: Props<typeof Mesh>
}

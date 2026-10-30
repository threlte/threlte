import type { Props } from '@threlte/core'
import type { Group, Mesh, MeshBasicMaterial } from 'three'

export interface SvgProps extends Props<typeof Group> {
  /** Can be a URL or SVG data */
  src: string
  skipFill?: boolean
  skipStrokes?: boolean
  fillMaterialProps?: Props<typeof MeshBasicMaterial>
  strokeMaterialProps?: Props<typeof MeshBasicMaterial>
  fillMeshProps?: Props<typeof Mesh>
  strokeMeshProps?: Props<typeof Mesh>
}

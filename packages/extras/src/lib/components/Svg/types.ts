import type { Props as ThrelteProps } from '@threlte/core'
import type { Group, Mesh, MeshBasicMaterial } from 'three'

export interface SVGProps extends ThrelteProps<typeof Group> {
  /** Can be a URL or SVG data */
  src: string
  skipFill?: boolean
  skipStrokes?: boolean
  /** @default {} */
  fillMaterialProps?: ThrelteProps<typeof MeshBasicMaterial>
  /** @default {} */
  strokeMaterialProps?: ThrelteProps<typeof MeshBasicMaterial>
  /** @default {} */
  fillMeshProps?: ThrelteProps<typeof Mesh>
  /** @default {} */
  strokeMeshProps?: ThrelteProps<typeof Mesh>
}

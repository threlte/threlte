import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ShaderMaterial, ColorRepresentation, Texture } from 'three'

export type MeshLineMaterialProps = Props<ShaderMaterial> & {
  opacity?: number
  color?: ColorRepresentation
  dashOffset?: number
  dashArray?: number
  dashRatio?: number
  attenuate?: boolean
  width?: number
  scaleDown?: number
  alphaMap?: Texture | undefined
}

export default class MeshLineMaterial extends SvelteComponent<MeshLineMaterialProps> {}

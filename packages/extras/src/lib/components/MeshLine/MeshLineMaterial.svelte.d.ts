import type { Events, Props, Slots } from '@threlte/core'
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

export type MeshLineMaterialEvents = Events<ShaderMaterial>

export type MeshLineMaterialSlots = Slots<ShaderMaterial>

export default class MeshLineMaterial extends SvelteComponent<
  MeshLineMaterialProps,
  MeshLineMaterialEvents,
  MeshLineMaterialSlots
> {}

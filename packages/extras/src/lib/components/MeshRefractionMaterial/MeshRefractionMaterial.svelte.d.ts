import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, CubeTexture, ShaderMaterial, Texture } from 'three'

export type MeshRefractionMaterialProps = Props<ShaderMaterial> & {
  envMap?: CubeTexture | Texture
  /** Number of ray-cast bounces, it can be expensive to have too many, 2 */
  bounces?: number
  /** Refraction index, 2.4 */
  ior?: number
  /** Fresnel (strip light), 0 */
  fresnel?: number
  /** RGB shift intensity, can be expensive, 0 */
  aberrationStrength?: number
  /** Color, white */
  color?: ColorRepresentation
  /** If this is on it uses fewer ray casts for the RGB shift sacrificing physical accuracy, true */
  fastChroma?: boolean
}

export type MeshRefractionMaterialEvents = Events<ShaderMaterial>
export type MeshRefractionMaterialSlots = Slots<ShaderMaterial>

export default class MeshRefractionMaterial extends SvelteComponent<
  MeshRefractionMaterialProps,
  MeshRefractionMaterialEvents,
  MeshRefractionMaterialSlots
> {}

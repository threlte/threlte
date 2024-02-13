import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ColorRepresentation, CubeTexture, ShaderMaterial, Texture } from 'three'

/*
  To use this component you need to install the seperate library `three-mesh-bhv`
	please run `npm install three-mesh-bhv` before adding this component to your project.
*/

export type MeshRefractionMaterialProps = Props<ShaderMaterial> & {
  envMap?: CubeTexture | Texture
  /**
   * Number of ray-cast bounces, it can be expensive to have too many
   * @default 2
   */
  bounces?: number
  /**
   * Refraction index
   * @default 2.4
   */
  ior?: number
  /**
   * Fresnel (strip light)
   * @default 0
   */
  fresnel?: number
  /**
   * RGB shift intensity, can be expensive
   * @default 0
   */
  aberrationStrength?: number
  /**
   * Color
   * @default white
   */
  color?: ColorRepresentation
  /**
   * If this is on it uses fewer ray casts for the RGB shift sacrificing physical accuracy
   * @default true
   */
  fastChroma?: boolean
}

export type MeshRefractionMaterialEvents = Events<ShaderMaterial>
export type MeshRefractionMaterialSlots = Slots<ShaderMaterial>

export default class MeshRefractionMaterial extends SvelteComponent<
  MeshRefractionMaterialProps,
  MeshRefractionMaterialEvents,
  MeshRefractionMaterialSlots
> {}

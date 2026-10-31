import type { Props } from '@threlte/core'
import type { ColorRepresentation, CubeTexture, ShaderMaterial, Texture } from 'three'

/*
  To use this component you need to install the separate library `three-mesh-bvh`
	please run `npm install three-mesh-bvh` before adding this component to your project.
*/

export interface MeshRefractionMaterialProps extends Props<ShaderMaterial> {
  /**
   * The environment that is refracted, as a cube texture or an
   * equirectangular texture.
   */
  envMap?: CubeTexture | Texture

  /**
   * The number of times a ray bounces inside the mesh. More bounces look
   * more like a real gem but cost more.
   * @default 2
   */
  bounces?: number

  /**
   * The index of refraction. `2.4` is diamond, `1.5` glass.
   * @default 2.4
   */
  ior?: number

  /**
   * Adds a white fresnel highlight along the mesh's edges.
   * @default 0
   */
  fresnel?: number

  /**
   * Splits the refracted light into red, green and blue for a chromatic
   * aberration effect. Can be expensive.
   * @default 0
   */
  aberrationStrength?: number

  /**
   * Tints the refracted light.
   * @default 'white'
   */
  color?: ColorRepresentation

  /**
   * Uses fewer rays for `aberrationStrength`, trading physical accuracy for
   * speed.
   * @default true
   */
  fastChroma?: boolean
}

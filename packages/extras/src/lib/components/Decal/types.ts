import type { Props } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { EulerTuple, Mesh, Texture, Vector3Tuple } from 'three'

export interface DecalProps extends Props<Mesh> {
  /**
   * The image to project, as a URL to load or a texture. Becomes the decal
   * material's `map`. Leave it out and pass a material as a child instead to
   * fully control the decal's appearance.
   */
  src?: Texture | string

  /**
   * The mesh to project onto.
   * @default the parent mesh
   */
  mesh?: Mesh

  /**
   * The center of the projector, in the target mesh's local space.
   * @default [0, 0, 0]
   */
  position?: Vector3Tuple

  /**
   * The projector's orientation. A tuple sets it directly. Otherwise the
   * projector faces along the normal of the mesh vertex closest to
   * `position`, and a number spins it around that normal by that many
   * radians.
   */
  rotation?: EulerTuple | number

  /**
   * The size of the projector box. A number sets all three sides.
   * @default 1
   */
  scale?: Vector3Tuple | number

  /**
   * The material's polygon offset factor. Negative values pull the decal
   * toward the camera to prevent z-fighting with the target mesh.
   * @default -10
   */
  polygonOffsetFactor?: number

  /**
   * Whether the decal material tests against the depth buffer.
   * @default true
   */
  depthTest?: boolean

  /**
   * Shows a wireframe box and axes at the projector's position, rotation and
   * scale.
   * @default false
   */
  debug?: boolean

  /** The decal mesh. */
  ref?: Mesh

  /**
   * Rendered inside the decal mesh, for example to provide a custom
   * material.
   */
  children?: Snippet<[{ ref: Mesh }]>
}

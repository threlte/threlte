import type { SplitStrategy } from 'three-mesh-bvh'

export interface BVHOptions {
  /**
   * Adds a `MeshBVHHelper` to each mesh to visualize its bounds tree.
   *
   * @default false
   */
  helper?: boolean

  /**
   * Whether to enable or disable the plugin
   *
   * @default true
   */
  enabled?: boolean

  /**
   * Split strategy:
   * * SAH - slowest to construct, fastest runtime, least memory
   * * center - the fastest construction option and will yield a good, performant bounds
   * * average - splits each BVH node at the average point along the longest axis for all triangle centroids in the bounds
   *
   * @default 'SAH'
   */
  strategy?: SplitStrategy

  /**
   * Print out warnings encountered during tree construction
   *
   * @default false
   */
  verbose?: boolean

  /**
   * If true then the bounding box for the geometry is set once the BVH has been constructed
   *
   * @default true
   */
  setBoundingBox?: boolean

  /**
   * The maximum depth to allow the tree to build to
   *
   * @default 20
   */
  maxDepth?: number

  /**
   * The number of triangles to aim for in a leaf node
   *
   * @default 10
   */
  maxLeafTris?: number

  /**
   * If false then an index buffer is created if it does not exist and is rearranged
   * to hold the bvh structure. If true then a separate buffer is created to store the
   * structure and the index buffer (or lack thereof) is retained. This can be used
   * when the existing index layout is important or groups are being used so a
   * single BVH hierarchy can be created to improve performance.
   *
   * @default false
   *
   * @note This setting is experimental
   */
  indirect?: boolean
}

export interface BVHProps {
  /**
   * Per-object overrides for the options passed to the `bvh` plugin, for
   * example `{ enabled: false }` to skip building a bounds tree for this
   * mesh.
   */
  bvh?: BVHOptions
}

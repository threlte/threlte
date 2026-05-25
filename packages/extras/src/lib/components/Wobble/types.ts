import type { Material, Vector3Tuple } from 'three'

export interface WobbleProps {
  /**
   * How fast the wobble animates. Ignored when `time` is provided.
   * @default 1
   */
  speed?: number

  /**
   * How strongly vertices are displaced. Roughly the maximum rotation angle
   * (in radians) at full weight.
   * @default 1
   */
  factor?: number

  /**
   * How tight the per-vertex wobble pattern is. Increase for large geometry,
   * decrease for small. Default is tuned for ~1–3 unit meshes.
   * @default 1
   */
  frequency?: number

  /**
   * Per-vertex variation. 0 keeps every vertex in lockstep on a clean sine;
   * 1 has neighbours fall out of phase from a noise field.
   * @default 0
   */
  noise?: number

  /**
   * Amplitude pulsation. 0 keeps the wobble steady; 1 lets the whole mesh
   * swell and fade over time.
   * @default 0
   */
  pulse?: number

  /**
   * Bend-direction wander. 0 holds the bend direction steady; 1 lets it
   * sweep the full circle over time. Only used when `bendiness > 0` and
   * `forceDirection` is unset.
   * @default 0
   */
  drift?: number

  /**
   * Blends from an axial twist (0) to a directional bend pivoted at the
   * anchor (1). A twist spins each slice of the mesh around the axis; a
   * bend tilts the mesh in the direction of the force, like a plant leaning
   * in the wind.
   * @default 0
   */
  bendiness?: number

  /**
   * The "up" direction of the wobble, in local geometry space. Twist
   * happens around this axis; bend tilts perpendicular to it. Default is
   * `[0, 1, 0]` (Y-up) — change it for sideways objects (a vine, a flag
   * pole laid horizontally, a model exported Z-up).
   * @default [0, 1, 0]
   */
  axis?: Vector3Tuple

  /**
   * Position along `axis` where the mesh stays anchored. Wobble amplitude
   * scales with each vertex's distance from this anchor plane, so vertices
   * on the plane don't move and the rest sway around them. Useful for
   * pinning a plant base or a flag pole. When omitted, every vertex
   * wobbles equally.
   */
  anchor?: number

  /**
   * Direction the bend leans toward, in local geometry space. The component
   * along `axis` is projected out, so only the perpendicular part matters.
   * When omitted, the direction drifts on its own (see `drift`). Set this
   * when the force has a known heading — an explosion, a fan, an avatar
   * walking past.
   */
  forceDirection?: Vector3Tuple

  /**
   * Drive the clock yourself, in seconds. When set, `speed` is ignored.
   * Useful for syncing many wobbles to one timeline or scrubbing through
   * poses.
   */
  time?: number

  /**
   * The material to wobble. When omitted, the parent mesh's `material`
   * (read once at mount) is used. Pass a bound material ref to react to
   * runtime material swaps.
   */
  material?: Material | Material[]

  /**
   * Whether the shadow silhouette should follow the wobble. When `true`
   * (the default) `<Wobble>` attaches matching `customDepthMaterial` and
   * `customDistanceMaterial` to the parent mesh so shadows track the
   * deformation. Set to `false` to skip the attach — useful if the mesh
   * doesn't cast shadows, or you're already managing the depth/distance
   * materials yourself.
   * @default true
   */
  shadow?: boolean
}

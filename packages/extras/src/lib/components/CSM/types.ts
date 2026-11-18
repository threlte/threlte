import type { Snippet } from 'svelte'
import type { Camera, ColorRepresentation, Vector3Tuple } from 'three'
import type { CSM, CSMParameters } from 'three/examples/jsm/csm/CSM.js'

/**
 * Props shared by the WebGL and WebGPU implementations of `<CSM>`. Three.js
 * ships a separate implementation per renderer, but both are configured
 * through this signature.
 */
export interface CSMBaseProps {
  /**
   * Whether or not CSM is enabled. If `enabled={false}`, the `fallback`
   * snippet is rendered instead of the cascaded light.
   * @default true
   */
  enabled?: boolean
  /**
   * The camera the cascades are fit to.
   * @default the default camera
   */
  camera?: Camera
  /**
   * The number of shadow cascades.
   * @default 3
   */
  cascades?: number
  /**
   * How the camera frustum is split up into cascades. Pass a function to
   * compute the splits yourself — it receives the cascade count and the near
   * and far plane of the camera and returns one split per cascade as a
   * fraction of the frustum depth, the last of which should be `1`.
   * @default 'practical'
   */
  mode?:
    | 'practical'
    | 'uniform'
    | 'logarithmic'
    | ((cascades: number, near: number, far: number) => number[])
  /**
   * Shadows are not rendered farther away from the camera than this. May be
   * smaller than `camera.far`.
   * @default 100000
   */
  maxFar?: number
  /**
   * How far the shadow camera of each cascade is moved back along the light
   * direction. Larger scenes require larger values.
   * @default 200
   */
  lightMargin?: number
  /**
   * Fades shadows out towards the far edge of every cascade, which looks
   * softer than an abrupt cut-off at the cost of some performance.
   * @default false
   */
  fade?: boolean
  /**
   * The direction the light points in. Does not need to be normalized.
   * @default [1, -1, 1]
   */
  lightDirection?: Vector3Tuple
  /**
   * The intensity of the light.
   * @default 3
   */
  intensity?: number
  /**
   * The color of the light.
   * @default 0xffffff
   */
  color?: ColorRepresentation
  /**
   * The resolution of the shadow map of every cascade.
   * @default 2048
   */
  shadowMapSize?: number
  /**
   * The shadow bias of the first cascade. Every following cascade scales it by
   * its index, as a cascade covering more ground needs a larger offset.
   * @default 0.000001
   */
  shadowBias?: number
  /**
   * Offsets the shadow lookup along the surface normal. Usually a better way to
   * remove shadow acne than `shadowBias`, which detaches shadows from their
   * casters as it grows.
   * @default 0
   */
  shadowNormalBias?: number
  /**
   * How dark the shadows are, from `0` to `1`.
   * @default 1
   */
  shadowIntensity?: number
  /**
   * The radius the shadow edges are blurred over.
   * @default 1
   */
  shadowRadius?: number
  /**
   * The number of samples used to blur the shadow edges. Only applies when the
   * renderer uses `VSMShadowMap`.
   * @default 8
   */
  shadowBlurSamples?: number
  /**
   * The near plane of the shadow camera of every cascade.
   * @default 1
   */
  shadowNear?: number
  /**
   * The far plane of the shadow camera of every cascade.
   * @default 2000
   */
  shadowFar?: number
  /** Content rendered alongside the cascaded light, whether or not it's enabled. */
  children?: Snippet
  /** Rendered instead of the cascaded light while `enabled` is `false`. */
  fallback?: Snippet
}

export interface CSMProps extends CSMBaseProps {
  /**
   * The underlying three.js CSM instance, bindable for advanced use such as
   * visualizing the cascades with a `CSMHelper`.
   */
  csm?: CSM
  /**
   * @deprecated Set the equivalent props directly, they are reactive.
   */
  args?: Partial<CSMParameters>
  /**
   * @deprecated Bind to `csm` instead.
   */
  configure?: ((csm: CSM) => void) | undefined
  /**
   * @deprecated Use `intensity`, which is not divided by `Math.PI`.
   */
  lightIntensity?: number | undefined
  /**
   * @deprecated Use `color` instead.
   */
  lightColor?: ColorRepresentation | undefined
}

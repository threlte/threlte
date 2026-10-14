import type { Snippet } from 'svelte'
import type { Camera, ColorRepresentation, Vector3Tuple } from 'three'

/**
 * Props shared by the WebGL and WebGPU implementations of `<CSM>`. Three.js
 * ships a separate implementation per renderer, but both are configured
 * through this signature.
 */
export interface CSMProps {
  /**
   * Whether or not CSM is enabled. If `enabled={false}`, the `fallback`
   * snippet is rendered instead of the cascaded light.
   */
  enabled?: boolean
  /**
   * The camera the cascades are fit to. Defaults to the camera set by
   * `makeDefault`.
   */
  camera?: Camera
  /**
   * The number of shadow cascades.
   */
  cascades?: number
  /**
   * How the camera frustum is split up into cascades. Pass a function to
   * compute the splits yourself — it receives the cascade count and the near
   * and far plane of the camera and returns one split per cascade as a
   * fraction of the frustum depth, the last of which should be `1`.
   */
  mode?:
    | 'practical'
    | 'uniform'
    | 'logarithmic'
    | ((cascades: number, near: number, far: number) => number[])
  /**
   * Shadows are not rendered farther away from the camera than this. May be
   * smaller than `camera.far`.
   */
  maxFar?: number
  /**
   * How far the shadow camera of each cascade is moved back along the light
   * direction. Larger scenes require larger values.
   */
  lightMargin?: number
  /**
   * Fades shadows out towards the far edge of every cascade, which looks
   * softer than an abrupt cut-off at the cost of some performance.
   */
  fade?: boolean
  /**
   * The direction the light points in. Does not need to be normalized.
   */
  lightDirection?: Vector3Tuple
  /**
   * The intensity of the light.
   */
  intensity?: number
  /**
   * The color of the light.
   */
  color?: ColorRepresentation
  /**
   * The resolution of the shadow map of every cascade.
   */
  shadowMapSize?: number
  /**
   * The shadow bias of the first cascade. Every following cascade scales it by
   * its index, as a cascade covering more ground needs a larger offset.
   */
  shadowBias?: number
  /**
   * Offsets the shadow lookup along the surface normal. Usually a better way to
   * remove shadow acne than `shadowBias`, which detaches shadows from their
   * casters as it grows.
   */
  shadowNormalBias?: number
  /**
   * How dark the shadows are, from `0` to `1`.
   */
  shadowIntensity?: number
  /**
   * The radius the shadow edges are blurred over.
   */
  shadowRadius?: number
  /**
   * The number of samples used to blur the shadow edges. Only applies when the
   * renderer uses `VSMShadowMap`.
   */
  shadowBlurSamples?: number
  /**
   * The near plane of the shadow camera of every cascade.
   */
  shadowNear?: number
  /**
   * The far plane of the shadow camera of every cascade.
   */
  shadowFar?: number
  children?: Snippet
  fallback?: Snippet
}

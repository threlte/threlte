import { type ColorRepresentation, type Vector3 } from 'three'
import {
  axisKeys,
  axisKeysXUp,
  axisKeysZUp,
  faceAliases,
  faceLabels,
  positiveAxisKeys
} from './constants.js'
import { dominantAxis } from './upSpace.js'

/**
 * Configuration options for individual gizmo axes.
 * Each axis can be customized with its own appearance and behavior.
 */
export interface GizmoAxisOptions {
  /** Whether to draw the axis. Default `true` */
  enabled?: boolean
  /** Custom text label for the axis. If not specified, defaults to the axis name */
  label?: string
  /** The axis opacity. Default `1` */
  opacity?: number
  /** The scale multiplier for the indicator size. Default `1` */
  scale?: number
  /** Whether to draw the axis line. */
  line?: boolean
  /** The axis indicator background color. */
  color?: ColorRepresentation
  /** Color for the axis text label */
  labelColor?: ColorRepresentation
  /** The border around the axis indicator. */
  border?: {
    /** The border size around the axis indicator. */
    size: number
    /** The border color around the axis indicator. */
    color: ColorRepresentation
  }
  /** The axis indicator hover options. */
  hover?: {
    /** The fill color on hover */
    color?: ColorRepresentation
    /** The label text color when the axis is hovered. */
    labelColor?: ColorRepresentation
    /** The opacity when the axis is hovered. Default `1` */
    opacity?: number
    /** The indicator scale multiplier when the axis is hovered. Default `1` */
    scale?: number
    /** The border around the axis indicator. */
    border?: {
      /** The border size around the axis indicator. */
      size: number
      /** The border color around the axis indicator. */
      color: ColorRepresentation
    }
  }
}

/**
 * Configuration options for the `ViewportGizmo`.
 * All properties are optional and fall back to default values if not specified.
 */
export interface GizmoOptions {
  /** Parent element for the gizmo. Can be an HTMLElement or a CSS selector string */
  container?: HTMLElement | string
  /** The gizmo supports two types, a `sphere` and a `cube` configuration. Default `sphere` */
  type?: 'sphere' | 'cube'
  /** Size of the gizmo widget in pixels. Default `128` */
  size?: number
  /** Placement of the gizmo widget within its container. Default `top-right` */
  placement?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  /** Offset of the gizmo from the container edges in pixels. */
  offset?: {
    /** Offset from the left edge in pixels. Default `10` */
    left?: number
    /** Offset from the top edge in pixels. Default `10` */
    top?: number
    /** Offset from the right edge in pixels. Default `10` */
    right?: number
    /** Offset from the bottom edge in pixels. Default `10` */
    bottom?: number
  }
  /** Whether view changes should be animated. Default `true` */
  animated?: boolean
  /** Animation speed multiplier. Higher values result in faster animations. Default `1` */
  speed?: number
  /**
   * The texture resolution. Higher values improve quality at the cost of performance.
   * Default `64` for a `sphere` type, and `128` for the cube.
   */
  resolution?: number
  /** The width of the axes lines in pixels. Default `4` */
  lineWidth?: number
  /** HTML `id` attribute for the gizmo container */
  id?: string
  /** HTML `class` attribute for the gizmo container */
  className?: string
  /** Font configuration for axis labels. Follows standard CSS font properties. */
  font?: {
    /** Font family for axis labels */
    family?: string
    /** Font weight for axis labels */
    weight?: string | number
  }
  /** The gizmo background configuration. */
  background?: {
    /** Whether to display the background */
    enabled?: boolean
    /** Color of the background in its normal state */
    color?: ColorRepresentation
    /** Opacity of the background in its normal state (0-1) */
    opacity?: number
    hover?: {
      /** Color of the background when hovered */
      color?: ColorRepresentation
      /** Opacity of the background when hovered (0-1) */
      opacity?: number
    }
  }
  /** Configuration for the corner indicators of the gizmo. */
  corners?: {
    /** Whether to display corner indicators. Default `true` for the cube type */
    enabled?: boolean
    /** Base color of the corner indicators in their normal state */
    color?: ColorRepresentation
    /** Opacity of corner indicators in their normal state (0-1). Default `1` */
    opacity?: number
    /** Scale multiplier for corner indicator size */
    scale?: number
    /** Radius of the corner indicators in range [0, 1]. Controls the roundness. */
    radius?: number
    /** Smoothness of the corner indicators. Higher values create smoother transitions. Default `18` */
    smoothness?: number
    /** Corner indicator appearance when hovered */
    hover?: {
      /** Color of corner indicators when hovered */
      color?: ColorRepresentation
      /** Opacity of corner indicators when hovered (0-1) */
      opacity?: number
      /** Scale multiplier for corner indicators when hovered */
      scale?: number
    }
  }
  /** Configuration for the edge indicators of the gizmo. */
  edges?: {
    /** Whether to display edge indicators. Default `true` for the cube type */
    enabled?: boolean
    /** Base color of the edge indicators in their normal state */
    color?: ColorRepresentation
    /** Opacity of edge indicators in their normal state (0-1) */
    opacity?: number
    /** Scale multiplier for edge indicator thickness */
    scale?: number
    /** Radius of the edge indicators. Controls the roundness. */
    radius?: number
    /** Smoothness of the edge indicators. Higher values create smoother transitions. Default `18` */
    smoothness?: number
    /** Edge indicator appearance when hovered */
    hover?: {
      /** Color of edge indicators when hovered */
      color?: ColorRepresentation
      /** Opacity of edge indicators when hovered (0-1) */
      opacity?: number
      /** Scale multiplier for edge indicators when hovered */
      scale?: number
    }
  }
  /** The axes edge radius, applied to all axes */
  radius?: number
  /** The axes edge smoothness, applied to all axes */
  smoothness?: number
  /** Configuration for the positive `X` axis or the `Right` face. */
  x?: GizmoAxisOptions
  /** Configuration for the positive `Y` axis or the `Top` face. */
  y?: GizmoAxisOptions
  /** Configuration for the positive `Z` axis or the `Front` face. */
  z?: GizmoAxisOptions
  /** Configuration for the negative `X` axis or the `Left` face. */
  nx?: GizmoAxisOptions
  /** Configuration for the negative `Y` axis or the `Bottom` face. */
  ny?: GizmoAxisOptions
  /** Configuration for the negative `Z` axis or the `Back` face. */
  nz?: GizmoAxisOptions
  /** An alias for the `x` axis configuration, clearer with a cube configuration. */
  right?: GizmoAxisOptions
  /** An alias for the `y` axis configuration, clearer with a cube configuration. */
  top?: GizmoAxisOptions
  /** An alias for the `z` axis configuration, clearer with a cube configuration. */
  front?: GizmoAxisOptions
  /** An alias for the `nx` axis configuration, clearer with a cube configuration. */
  left?: GizmoAxisOptions
  /** An alias for the `ny` axis configuration, clearer with a cube configuration. */
  bottom?: GizmoAxisOptions
  /** An alias for the `nz` axis configuration, clearer with a cube configuration. */
  back?: GizmoAxisOptions
}

export interface ResolvedBorder {
  size: number
  color: ColorRepresentation
}

export interface ResolvedAxis {
  enabled: boolean
  label: string
  opacity: number
  scale: number
  line: boolean
  color: ColorRepresentation
  labelColor: ColorRepresentation
  border: ResolvedBorder
  hover: {
    color: ColorRepresentation
    labelColor: ColorRepresentation
    opacity: number
    scale: number
    border: ResolvedBorder
  }
}

export interface ResolvedIndicatorGroup {
  enabled: boolean
  color: ColorRepresentation
  opacity: number
  scale: number
  radius: number
  smoothness: number
  hover: { color: ColorRepresentation; opacity: number; scale: number }
}

export interface ResolvedOptions {
  isSphere: boolean
  type: 'sphere' | 'cube'
  container: HTMLElement | string
  size: number
  placement: NonNullable<GizmoOptions['placement']>
  resolution: number
  lineWidth: number
  radius: number
  smoothness: number
  animated: boolean
  speed: number
  id?: string
  className?: string
  font: { family: string; weight: string | number }
  offset: { top: number; left: number; bottom: number; right: number }
  background: {
    enabled: boolean
    color: ColorRepresentation
    opacity: number
    hover: { color: ColorRepresentation; opacity: number }
  }
  corners: ResolvedIndicatorGroup
  edges: ResolvedIndicatorGroup
  x: ResolvedAxis
  y: ResolvedAxis
  z: ResolvedAxis
  nx: ResolvedAxis
  ny: ResolvedAxis
  nz: ResolvedAxis
}

/**
 * Object literals only, so a value like a `Color` or an `HTMLElement` is carried
 * through whole instead of being merged into field by field.
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)

  return prototype === Object.prototype || prototype === null
}

/**
 * Deep-merges `override` onto `base`, returning fresh objects and mutating
 * neither. Leaving the caller's options untouched is what lets the resolved
 * defaults be shared structurally instead of cloned.
 */
const merge = <T>(base: T, override: unknown): T => {
  if (override === undefined) {
    return base
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T
  }

  const result: Record<string, unknown> = { ...base }

  for (const key in override) {
    result[key] = merge(result[key], override[key])
  }

  return result as T
}

export const resolveOptions = (options: GizmoOptions, up: Vector3): ResolvedOptions => {
  const type = options.type ?? 'sphere'
  const isSphere = type === 'sphere'
  const resolution = options.resolution ?? (isSphere ? 64 : 128)

  const { axis: upAxis, negative } = dominantAxis(up)

  const orderedKeys = [...(upAxis === 'z' ? axisKeysZUp : upAxis === 'x' ? axisKeysXUp : axisKeys)]

  // A negative up puts the top face on the other end of the up axis.
  if (negative) {
    const topKey = orderedKeys[1]
    orderedKeys[1] = orderedKeys[4]
    orderedKeys[4] = topKey
  }

  const aliased: GizmoOptions = { ...options }

  faceAliases.forEach((alias, index) => {
    const value = aliased[alias]
    if (value) {
      aliased[orderedKeys[index]] = value
    }
  })

  // The alias order already encodes which axis each face is on, so reading it
  // back the other way gives every axis its label without restating the rules.
  const labels = {} as Record<(typeof axisKeys)[number], string>

  orderedKeys.forEach((key, index) => {
    labels[key] = faceLabels[index]
  })

  const positiveAxisDefaults: GizmoAxisOptions = {
    enabled: true,
    color: 0xffffff,
    opacity: 1,
    scale: 0.7,
    labelColor: 0x222222,
    line: false,
    border: { size: 0, color: 0xdddddd },
    hover: {
      color: isSphere ? 0xffffff : 0x93d3eb,
      labelColor: 0x222222,
      opacity: 1,
      scale: 0.7,
      border: { size: 0, color: 0xdddddd }
    }
  }

  const negativeAxisDefaults: GizmoAxisOptions = {
    line: false,
    scale: isSphere ? 0.45 : 0.7,
    hover: { scale: isSphere ? 0.5 : 0.7 }
  }

  const defaults = {
    type,
    container: document.body,
    size: 128,
    placement: 'top-right',
    resolution,
    lineWidth: 4,
    radius: isSphere ? 1 : 0.2,
    smoothness: 18,
    animated: true,
    speed: 1,
    background: {
      enabled: true,
      color: isSphere ? 0xffffff : 0xe0e6ec,
      opacity: isSphere ? 0 : 1,
      hover: {
        color: isSphere ? 0xffffff : 0xe0e6ec,
        opacity: isSphere ? 0.2 : 1
      }
    },
    font: { family: 'sans-serif', weight: 900 },
    offset: { top: 10, left: 10, bottom: 10, right: 10 },
    corners: {
      enabled: !isSphere,
      color: isSphere ? 0xf2d962 : 0xffffff,
      opacity: 1,
      scale: isSphere ? 0.15 : 0.2,
      radius: 1,
      smoothness: 18,
      hover: {
        color: isSphere ? 0xffffff : 0x93d3eb,
        opacity: 1,
        scale: isSphere ? 0.2 : 0.225
      }
    },
    edges: {
      enabled: !isSphere,
      color: isSphere ? 0xf2d962 : 0xffffff,
      opacity: isSphere ? 1 : 0,
      radius: isSphere ? 1 : 0.125,
      smoothness: 18,
      scale: isSphere ? 0.15 : 1,
      hover: {
        color: isSphere ? 0xffffff : 0x93d3eb,
        opacity: 1,
        scale: isSphere ? 0.2 : 1
      }
    },
    x: {
      ...positiveAxisDefaults,
      ...(isSphere ? { label: 'X', color: 0xff3653, line: true } : { label: labels.x })
    },
    y: {
      ...positiveAxisDefaults,
      ...(isSphere ? { label: 'Y', color: 0x8adb00, line: true } : { label: labels.y })
    },
    z: {
      ...positiveAxisDefaults,
      ...(isSphere ? { label: 'Z', color: 0x2c8fff, line: true } : { label: labels.z })
    },
    nx: { ...negativeAxisDefaults, label: isSphere ? '' : labels.nx },
    ny: { ...negativeAxisDefaults, label: isSphere ? '' : labels.ny },
    nz: { ...negativeAxisDefaults, label: isSphere ? '' : labels.nz }
  } as unknown as Record<string, unknown>

  const resolved = merge(defaults, aliased)

  // A negative axis inherits whatever its positive counterpart resolved to,
  // with the negative defaults and then the caller's own values on top.
  for (const key of positiveAxisKeys) {
    const negativeKey = `n${key}`

    resolved[negativeKey] = merge(
      merge(resolved[key], defaults[negativeKey]),
      aliased[negativeKey as keyof GizmoOptions]
    )
  }

  return { ...resolved, isSphere } as unknown as ResolvedOptions
}

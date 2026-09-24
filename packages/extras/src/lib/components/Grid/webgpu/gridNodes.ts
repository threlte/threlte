// Credits to Evan Wallace https://madebyevan.com/shaders/grid/
import {
  Discard,
  Fn,
  atan,
  clamp,
  distance,
  float,
  fract,
  fwidth,
  length,
  max,
  min,
  mix,
  modelWorldMatrix,
  modelWorldMatrixInverse,
  positionGeometry,
  pow,
  select,
  smoothstep,
  uniform,
  varying,
  vec2,
  vec4
} from 'three/tsl'
import { Color, Vector3 } from 'three/webgpu'

export const createGridUniforms = () => ({
  cellSize: uniform(1),
  sectionSize: uniform(10),
  cellColor: uniform(new Color('#000000')),
  sectionColor: uniform(new Color('#0000ee')),
  backgroundColor: uniform(new Color('#dadada')),
  backgroundOpacity: uniform(0),
  fadeDistance: uniform(100),
  fadeStrength: uniform(1),
  fadeOrigin: uniform(new Vector3()),
  cellThickness: uniform(1),
  sectionThickness: uniform(2),
  maxRadius: uniform(0),
  cellDividers: uniform(6),
  sectionDividers: uniform(2),
  worldCamProjPosition: uniform(new Vector3()),
  worldPlanePosition: uniform(new Vector3())
})

export type GridUniforms = ReturnType<typeof createGridUniforms>

export interface GridNodeOptions {
  plane: 'xz' | 'xy' | 'zy'
  type: 'grid' | 'lines' | 'circular' | 'polar'
  axis: 'x' | 'y' | 'z'
  infiniteGrid: boolean
  followCamera: boolean
}

/**
 * Reorders a vec3 so the grid maths always run in a canonical xy plane. It is
 * applied once in the vertex stage to orient the plane and again in the fragment
 * stage to undo it — the same double swizzle the GLSL material performs with its
 * `coord0`/`coord1`/`coord2` uniforms.
 */
const planeSwizzle = {
  xz: 'xzy',
  xy: 'xyz',
  zy: 'zyx'
} as const

/** The grid helpers all take numeric uniforms, so their type is derived from one. */
type FloatNode = GridUniforms['cellSize']

/**
 * Builds the grid's position and fragment nodes.
 *
 * Unlike the GLSL material, `plane`, `type`, `axis`, `infiniteGrid` and
 * `followCamera` reshape the node graph instead of being branched on at runtime.
 * Those uniforms only exist in GLSL to avoid recompiling the shader, so dropping
 * them removes the dynamic `position[coord0]` indexing, the four-way `gridType`
 * switch and both boolean branches.
 */
export const createGridNodes = (uniforms: GridUniforms, options: GridNodeOptions) => {
  const {
    cellSize,
    sectionSize,
    cellColor,
    sectionColor,
    backgroundColor,
    backgroundOpacity,
    fadeDistance,
    fadeStrength,
    fadeOrigin,
    cellThickness,
    sectionThickness,
    maxRadius,
    cellDividers,
    sectionDividers,
    worldCamProjPosition,
    worldPlanePosition
  } = uniforms

  const swizzle = planeSwizzle[options.plane]

  // ---------------------------------------------------------------- vertex --

  // An infinite grid scales the plane out far enough to always cover the fade.
  const placed = options.infiniteGrid
    ? positionGeometry[swizzle].mul(fadeDistance.add(1))
    : positionGeometry[swizzle]

  // Offset the plane onto the camera in world space, then bring it back into
  // local space so three can apply the model-view-projection as usual.
  const world = modelWorldMatrix.mul(vec4(placed, 1))
  const cameraOffset = worldCamProjPosition.sub(worldPlanePosition)

  const positionNode = options.followCamera
    ? modelWorldMatrixInverse.mul(vec4(world.xyz.add(cameraOffset), world.w)).xyz
    : placed

  const localPosition = varying(positionNode, 'gridLocalPosition')
  const worldPosition = varying(modelWorldMatrix.mul(vec4(positionNode, 1)), 'gridWorldPosition')

  // -------------------------------------------------------------- fragment --

  const localPos = localPosition[swizzle]
  const radius = length(localPos.xy)

  const squareGrid = (size: FloatNode, thickness: FloatNode) => {
    const coord = localPos.xy.div(size)
    const grid = fract(coord.sub(0.5)).sub(0.5).abs().div(fwidth(coord))
    return min(grid.x, grid.y).add(1).sub(thickness).min(1).oneMinus()
  }

  const linesGrid = (size: FloatNode, thickness: FloatNode) => {
    const coord = localPos[options.axis].div(size)
    const line = fract(coord.sub(0.5)).sub(0.5).abs().div(fwidth(coord))
    return line.sub(thickness.mul(0.2)).min(1).oneMinus()
  }

  const circlesGrid = (size: FloatNode, thickness: FloatNode) => {
    const coord = radius.div(size)
    const line = fract(coord.sub(0.5)).sub(0.5).abs().div(fwidth(coord))
    return line.sub(thickness.mul(0.2)).min(1).oneMinus()
  }

  // An infinite grid has no radius limit, so both masks compile away entirely.
  const radiusMask = () => {
    if (options.infiniteGrid) return float(1)
    const width = max(fwidth(radius), 0.0001)
    const mask = smoothstep(maxRadius, maxRadius.add(width), radius).oneMinus()
    return select(maxRadius.lessThanEqual(0), float(1), mask)
  }

  const polarDividerMask = () => {
    if (options.infiniteGrid) return float(1)
    const width = max(fwidth(radius), 0.0001)
    const mask = smoothstep(maxRadius.sub(width), maxRadius, radius).oneMinus()
    return select(maxRadius.lessThanEqual(0), float(1), mask)
  }

  const polarGrid = (size: FloatNode, thickness: FloatNode, dividers: FloatNode) => {
    const angle = atan(localPos.x, localPos.y).mul(dividers).div(Math.PI)
    const coord = vec2(radius.div(size), angle)

    // Past the half turn the angle wraps, so its derivative has to be measured
    // on the wrapped value or the seam renders as a hard line.
    const span = dividers.mul(2)
    const wrapped = vec2(radius.div(size), fract(angle.div(span)).mul(span))
    const half = dividers.mul(0.5)
    const beyondHalf = angle.lessThan(half.negate()).or(angle.greaterThan(half))
    const width = select(beyondHalf, fwidth(wrapped), fwidth(coord)).mul(thickness.mul(0.25).add(1))

    const grid = fract(coord.sub(0.5)).sub(0.5).abs().div(width)
    const circle = grid.x.min(1).oneMinus()
    const divider = grid.y.min(1).oneMinus()

    return select(
      dividers.lessThanEqual(0),
      circlesGrid(size, thickness),
      max(circle, divider.mul(polarDividerMask()))
    )
  }

  const gridFor = (size: FloatNode, thickness: FloatNode, dividers: FloatNode) => {
    switch (options.type) {
      case 'lines':
        return linesGrid(size, thickness)
      case 'circular':
        return circlesGrid(size, thickness)
      case 'polar':
        return polarGrid(size, thickness, dividers)
      default:
        return squareGrid(size, thickness)
    }
  }

  const usesRadius = options.type === 'circular' || options.type === 'polar'

  const fragmentNode = Fn(() => {
    const cells = gridFor(cellSize, cellThickness, cellDividers)
    const sections = gridFor(sectionSize, sectionThickness, sectionDividers)

    const falloff = distance(fadeOrigin, worldPosition.xyz).div(fadeDistance).min(1).oneMinus()
    const fadeFactor = pow(falloff, fadeStrength).mul(0.95)

    const color = mix(cellColor, sectionColor, sectionThickness.mul(sections).min(1))
    const lines = cells.add(sections)

    // With a background the lines blend over it, otherwise they fade to transparent.
    const linesAlpha = clamp(lines.mul(fadeFactor), 0, 1)
    const overBackground = mix(backgroundColor, color, linesAlpha)
    const backgroundAlpha = max(linesAlpha, backgroundOpacity.mul(fadeFactor))

    const plainAlpha = lines.mul(pow(falloff, fadeStrength))
    const softenedAlpha = mix(plainAlpha.mul(0.75), plainAlpha, sections)

    const hasBackground = backgroundOpacity.greaterThan(0)
    const finalColor = select(hasBackground, overBackground, color)
    const alpha = select(hasBackground, backgroundAlpha, softenedAlpha)
    const finalAlpha = usesRadius ? alpha.mul(radiusMask()) : alpha

    Discard(finalAlpha.lessThanEqual(0))

    return vec4(finalColor, finalAlpha)
  })()

  return { positionNode, fragmentNode }
}

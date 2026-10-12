import {
  BackSide,
  Color,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  type BufferGeometry,
  type Camera,
  type Object3D,
  type Texture
} from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { atlasTexture, setAtlasHover, setAtlasRow } from './atlasTexture.js'
import { axisKeys, cornerPositions, edgePositions, spherePointDistance, yUp } from './constants.js'
import { roundedPlaneGeometry } from './roundedPlaneGeometry.js'
import type { ResolvedOptions } from './options.js'

export type Indicator = Sprite | Mesh<BufferGeometry, MeshBasicMaterial>

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const depthFadeAxes = [
  ['x', 0, 3],
  ['y', 1, 4],
  ['z', 2, 5]
] as const

const forward = new Vector3()
const lookTarget = new Vector3()
const lineDirection = new Vector3()

/**
 * Halves the opacity of whichever indicators face away from the camera, so the
 * sphere reads as having a near and a far side.
 */
export const applyDepthFade = (
  options: ResolvedOptions,
  indicators: Indicator[],
  camera: Camera
) => {
  if (!options.isSphere) {
    return
  }

  forward.set(0, 0, 1).applyQuaternion(camera.quaternion)

  for (const [axis, positiveIndex, negativeIndex] of depthFadeAxes) {
    const facing = forward[axis]

    const positive = indicators[positiveIndex]
    const positiveOpacity = positive.userData.opacity as number
    positive.material.opacity = clamp(facing >= 0 ? positiveOpacity : positiveOpacity / 2, 0, 1)

    const negative = indicators[negativeIndex]
    const negativeOpacity = negative.userData.opacity as number
    negative.material.opacity = clamp(facing >= 0 ? negativeOpacity / 2 : negativeOpacity, 0, 1)
  }
}

/** Swaps an indicator between its resting and hovered appearance. */
export const setIndicatorHover = (indicator: Indicator, hovered = true) => {
  const { material, userData } = indicator
  const { opacity, color, scale } = hovered ? userData.hover : userData

  indicator.scale.setScalar(scale)
  material.opacity = opacity

  if (material.map) {
    setAtlasHover(material.map, hovered)
  } else if ('color' in material) {
    material.color.set(color)
  }
}

/** Swaps the background between its resting and hovered appearance. */
export const setBackgroundHover = (
  background: Mesh<BufferGeometry, MeshBasicMaterial>,
  hovered = true
) => {
  const { material, userData } = background
  const { color, opacity } = hovered ? userData.hover : userData

  material.color.set(color)
  material.opacity = opacity
}

const buildAxes = (options: ResolvedOptions, atlas: Texture): Indicator[] => {
  const { isSphere, radius, smoothness } = options
  const geometry = isSphere ? undefined : roundedPlaneGeometry(radius, smoothness)

  return axisKeys.map((key, index) => {
    const isPositive = index < 3
    const texture = index === 0 ? atlas : atlas.clone()
    setAtlasRow(texture, index)

    const { enabled, scale, opacity, hover } = options[key]
    const parameters = { map: texture, opacity, transparent: true }

    const indicator: Indicator = isSphere
      ? new Sprite(new SpriteMaterial(parameters))
      : new Mesh(geometry, new MeshBasicMaterial(parameters))

    const axis = (isPositive ? key : key[1]) as 'x' | 'y' | 'z'
    indicator.position[axis] = (isPositive ? 1 : -1) * (isSphere ? spherePointDistance : 1)

    if (!isSphere) {
      indicator.lookAt(lookTarget.copy(indicator.position).multiplyScalar(1.7))
    }

    indicator.scale.setScalar(scale)
    indicator.renderOrder = 1
    indicator.visible = enabled
    indicator.userData = { scale, opacity, hover }

    return indicator
  })
}

const buildCorners = (options: ResolvedOptions, atlas: Texture): Indicator[] => {
  const { isSphere, corners } = options

  if (!corners.enabled) {
    return []
  }

  const { color, opacity, scale, radius, smoothness, hover } = corners
  const geometry = isSphere ? undefined : roundedPlaneGeometry(radius, smoothness)

  return Array.from({ length: cornerPositions.length / 3 }, (_, index) => {
    let indicator: Indicator

    if (isSphere) {
      const texture = atlas.clone()
      setAtlasRow(texture, 6)
      indicator = new Sprite(new SpriteMaterial({ transparent: true, opacity, map: texture }))
    } else {
      indicator = new Mesh(geometry, new MeshBasicMaterial({ transparent: true, opacity, color }))
    }

    const offset = index * 3
    indicator.position.set(
      cornerPositions[offset],
      cornerPositions[offset + 1],
      cornerPositions[offset + 2]
    )

    if (isSphere) {
      indicator.position.normalize().multiplyScalar(1.7)
    }

    indicator.scale.setScalar(scale)
    indicator.lookAt(lookTarget.copy(indicator.position).multiplyScalar(2))
    indicator.renderOrder = 1
    indicator.userData = { color, opacity, scale, hover }

    return indicator
  })
}

const buildEdges = (
  options: ResolvedOptions,
  atlas: Texture,
  atlasRow: number
): Indicator[] => {
  const { isSphere, edges } = options

  if (!edges.enabled) {
    return []
  }

  const { color, opacity, scale, radius, smoothness, hover } = edges
  const geometry = isSphere ? undefined : roundedPlaneGeometry(radius, smoothness, 1.2, 0.25)

  return Array.from({ length: edgePositions.length / 3 }, (_, index) => {
    let indicator: Indicator

    if (isSphere) {
      const texture = atlas.clone()
      setAtlasRow(texture, atlasRow)
      indicator = new Sprite(new SpriteMaterial({ transparent: true, opacity, map: texture }))
    } else {
      indicator = new Mesh(geometry, new MeshBasicMaterial({ transparent: true, opacity, color }))
    }

    const offset = index * 3
    indicator.position.set(
      edgePositions[offset],
      edgePositions[offset + 1],
      edgePositions[offset + 2]
    )

    if (isSphere) {
      indicator.position.normalize().multiplyScalar(1.7)
    }

    indicator.scale.setScalar(scale)
    indicator.up.copy(yUp)
    indicator.lookAt(lookTarget.copy(indicator.position).multiplyScalar(2))

    if (!isSphere && !indicator.position.y) {
      indicator.rotation.z = Math.PI / 2
    }

    indicator.renderOrder = 1
    indicator.userData = { color, opacity, scale, hover }

    return indicator
  })
}

const buildBackground = (
  axes: Indicator[],
  options: ResolvedOptions
): Mesh<BufferGeometry, MeshBasicMaterial> | null => {
  const { isSphere, background } = options
  const { enabled, color, opacity, hover } = background

  if (!enabled) {
    return null
  }

  const material = new MeshBasicMaterial({
    color,
    side: BackSide,
    opacity,
    transparent: true,
    depthWrite: false
  })

  let mesh: Mesh<BufferGeometry, MeshBasicMaterial>

  if (isSphere) {
    mesh = new Mesh(new SphereGeometry(1.8, 64, 64), material)
  } else {
    // The cube's backdrop is the six faces shrunk slightly and welded together,
    // so the inside of the cube is what gets picked up on hover.
    let merged: BufferGeometry | undefined

    for (const axis of axes) {
      const restingScale = axis.scale.x

      axis.scale.setScalar(0.9)
      axis.updateMatrix()

      const face = (axis as Mesh<BufferGeometry, MeshBasicMaterial>).geometry.clone()
      face.applyMatrix4(axis.matrix)
      merged = merged ? (mergeGeometries([merged, face]) as BufferGeometry) : face

      axis.scale.setScalar(restingScale)
    }

    mesh = new Mesh(merged, material)
  }

  mesh.userData = { color, opacity, hover }

  return mesh
}

/**
 * Builds the axis lines as thin cylinders rather than expanded line geometry:
 * `MeshBasicMaterial` resolves to a node material under WebGPU, so one
 * implementation covers both renderers while still honoring `lineWidth`.
 */
const buildAxisLines = (options: ResolvedOptions, worldPerPixel: number): Object3D[] => {
  const color = new Color()
  const { isSphere, lineWidth } = options
  const lineRadius = (lineWidth * worldPerPixel) / 2

  const lines: Object3D[] = []

  axisKeys.forEach((key, index) => {
    const { enabled, line, scale, color: axisColor } = options[key]

    if (!enabled || !line) {
      return
    }

    const sign = index < 3 ? 1 : -1
    const reach = (isSphere ? spherePointDistance - scale / 2 : 0.975) * sign
    const axis = (index < 3 ? key : key[1]) as 'x' | 'y' | 'z'

    lineDirection.set(0, 0, 0)
    lineDirection[axis] = reach

    const geometry = new CylinderGeometry(lineRadius, lineRadius, Math.abs(reach), 8, 1).translate(
      0,
      Math.abs(reach) / 2,
      0
    )

    const mesh = new Mesh(
      geometry,
      new MeshBasicMaterial({ color: color.set(axisColor).getHex() })
    )

    mesh.quaternion.setFromUnitVectors(yUp, lineDirection.normalize())
    lines.push(mesh)
  })

  return lines
}

export const buildGizmoObjects = (options: ResolvedOptions, worldPerPixel: number) => {
  const { corners, edges } = options
  const atlas = atlasTexture(options)

  const axes = buildAxes(options, atlas)
  const interactive: Indicator[] = [...axes]

  if (corners.enabled) {
    interactive.push(...buildCorners(options, atlas))
  }

  if (edges.enabled) {
    interactive.push(...buildEdges(options, atlas, corners.enabled ? 7 : 6))
  }

  return {
    interactive,
    background: buildBackground(axes, options),
    lines: buildAxisLines(options, worldPerPixel)
  }
}

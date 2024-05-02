import { OrthographicCamera, PerspectiveCamera, Vector3, type Vector3Tuple } from 'three'
import { currentWritable, useThrelte, watch, type Size } from '@threlte/core'
import type { Readable } from 'svelte/store'

/** Reactive size of the viewport in threejs units */
export interface Viewport {
  width: number
  height: number
  top: number
  left: number
  /** size.width / viewport.width */
  factor: number
  /** Camera distance */
  distance: number
  /** Camera aspect ratio: width / height */
  aspect: number
}

const tempTarget = new Vector3()
const position = new Vector3()

const getCurrentViewport = (
  camera: PerspectiveCamera | OrthographicCamera,
  target: Vector3 | Vector3Tuple,
  size: Size
): Omit<Viewport, 'dpr' | 'initialDpr'> => {
  const { width, height, top, left } = size

  const aspect = width / height

  if (Array.isArray(target)) {
    tempTarget.fromArray(target)
  } else {
    tempTarget.copy(target)
  }

  const distance = camera.getWorldPosition(position).distanceTo(tempTarget)

  if ('isOrthographicCamera' in camera) {
    return {
      width: width / camera.zoom,
      height: height / camera.zoom,
      top,
      left,
      factor: 1,
      distance,
      aspect
    }
  } else if ('isPersepctiveCamera' in camera) {
    const fov = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
    const h = 2 * Math.tan(fov / 2) * distance // visible height
    const w = h * (width / height)
    return {
      width: w,
      height: h,
      top,
      left,
      factor: width / w,
      distance,
      aspect
    }
  }

  throw new Error('Viewport did not recieve a Perspective or Orthographic camera')
}

export const useViewport = (): Readable<Viewport> & { current: Viewport } => {
  const viewport = currentWritable<Viewport>(undefined!)
  const { camera, size } = useThrelte()

  watch([camera, size], ([$camera, $size]) => {
    viewport.set(getCurrentViewport($camera, [0, 0, 0], $size))
  })

  return viewport
}

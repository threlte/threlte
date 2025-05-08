import { Camera, Vector3, type Vector3Tuple } from 'three'
import { currentWritable, isInstanceOf, useTask, useThrelte, watch } from '@threlte/core'
import type { Readable } from 'svelte/store'

export interface Viewport {
  /** Viewport width in Three.js units */
  width: number
  /** Viewport height in Three.js units */
  height: number
  /** size.width / viewport.width */
  factor: number
  /** Camera distance */
  distance: number
}

const origin = new Vector3()
const position = new Vector3()
const lastPosition = new Vector3()

export const useViewport = (
  target?: Vector3 | Vector3Tuple
): Readable<Viewport> & { current: Viewport } => {
  const viewport = currentWritable<Viewport>({
    width: 0,
    height: 0,
    factor: 0,
    distance: 0
  })

  const { camera, size, renderStage, scheduler } = useThrelte()

  const updateViewport = (
    $size: { width: number; height: number },
    $camera: Camera,
    distance: number
  ) => {
    viewport.update(($viewport) => {
      const { width, height } = $size

      if (Array.isArray(target)) {
        origin.fromArray(target)
      } else if (target !== undefined) {
        origin.copy(target)
      }

      $viewport.distance = distance

      if (isInstanceOf($camera, 'OrthographicCamera')) {
        $viewport.width = width / $camera.zoom
        $viewport.height = height / $camera.zoom
        $viewport.factor = 1
      } else if (isInstanceOf($camera, 'PerspectiveCamera')) {
        const fov = ($camera.fov * Math.PI) / 180 // convert vertical fov to radians
        const h = 2 * Math.tan(fov / 2) * distance // visible height
        const w = h * (width / height)
        $viewport.width = w
        $viewport.height = h
        $viewport.factor = width / w
      }

      return $viewport
    })
  }

  useTask(
    () => {
      camera.current.getWorldPosition(position)

      if (!position.equals(lastPosition)) {
        const distance = position.distanceTo(origin)

        updateViewport(size.current, camera.current, distance)
        lastPosition.copy(position)
      }
    },
    {
      autoInvalidate: false,
      stage: scheduler.createStage(Symbol('viewport-stage'), { before: renderStage })
    }
  )

  watch([camera, size], ([$camera, $size]) => {
    const distance = $camera.getWorldPosition(position).distanceTo(origin)
    updateViewport($size, $camera, distance)
  })

  return viewport
}

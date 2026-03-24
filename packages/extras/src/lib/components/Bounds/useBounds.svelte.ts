import { isInstanceOf, useTask, useThrelte } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import { fromStore } from 'svelte/store'
import {
  Object3D,
  Box3,
  Vector3,
  Group,
  Quaternion,
  Matrix4,
  PerspectiveCamera,
  OrthographicCamera
} from 'three'
import { useControlsContext } from '../controls/useControlsContext.js'
import type { OrbitControls, TrackballControls } from 'three/examples/jsm/Addons.js'
import type CameraControls from 'camera-controls'
import type { SizeProps } from './types.js'

export interface BoundsContext {
  getSize: () => SizeProps
  refresh(object?: Object3D | Box3): BoundsContext
  reset(): BoundsContext
  fit(): BoundsContext
  clip(): BoundsContext
}

const defaultInterpolateFn = (t: number) => 1 - Math.exp(-5 * t) + 0.007 * t

const key = Symbol('<Bounds>')

export const provideBounds = (
  ref: () => Group,
  margin: () => number,
  animate: () => boolean,
  maxDuration: () => number,
  interpolate: () => ((progress: number) => number) | undefined,
  onFit: () => ((sizeProps: SizeProps) => void) | undefined
) => {
  const { camera: cameraStore, invalidate } = useThrelte()
  const {
    orbitControls: orbitStore,
    trackballControls: trackballStore,
    cameraControls: ccStore
  } = useControlsContext()

  const camera = fromStore(cameraStore)
  const orbitControls = fromStore(orbitStore)
  const trackballControls = fromStore(trackballStore)
  const cameraControls = fromStore(ccStore)

  const controls = $derived<OrbitControls | CameraControls | TrackballControls | undefined>(
    orbitControls.current ?? trackballControls.current ?? cameraControls.current
  )

  const goal = {
    position: undefined as Vector3 | undefined,
    rotation: undefined as Quaternion | undefined,
    zoom: undefined as number | undefined,
    up: undefined as Vector3 | undefined,
    target: undefined as Vector3 | undefined
  }

  const origin = {
    position: new Vector3(),
    rotation: new Quaternion(),
    zoom: 1,
    target: new Vector3()
  }

  let progress = 0 // represents animation state from 0 to 1

  let animating = $state(false)

  const box = new Box3()
  const boxSize = new Vector3()
  const boxCenter = new Vector3()

  const getSize = (): SizeProps => {
    const cam = camera.current

    box.getSize(boxSize)
    box.getCenter(boxCenter)
    const maxSize = Math.max(boxSize.x, boxSize.y, boxSize.z)

    const fitHeightDistance = isInstanceOf(cam, 'PerspectiveCamera')
      ? maxSize / (2 * Math.atan((Math.PI * cam.fov) / 360))
      : maxSize * 4

    const fitWidthDistance = isInstanceOf(cam, 'PerspectiveCamera')
      ? fitHeightDistance / cam.aspect
      : maxSize * 4

    const distance = margin() * Math.max(fitHeightDistance, fitWidthDistance)

    return { box, size: boxSize, center: boxCenter, distance }
  }

  const refresh = (object?: Object3D | Box3) => {
    const cam = camera.current

    if (isInstanceOf(object, 'Box3')) {
      box.copy(object)
    } else {
      const target = object || ref()
      if (!target) {
        return context
      }
      target.updateWorldMatrix(true, true)
      box.setFromObject(target)
    }

    if (box.isEmpty()) {
      const max = cam.position.length() || 10
      box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max))
    }

    origin.position.copy(cam.position)
    origin.rotation.copy(cam.quaternion)

    if (isInstanceOf(cam, 'OrthographicCamera')) {
      origin.zoom = cam.zoom
    }

    if (controls && 'target' in controls) {
      origin.target.copy(controls.target)
    }

    goal.position = undefined
    goal.rotation = undefined
    goal.zoom = undefined
    goal.up = undefined
    goal.target = undefined

    return context
  }

  const setGoal = () => {
    const cam = camera.current as PerspectiveCamera | OrthographicCamera

    if (goal.position) {
      cam.position.copy(goal.position)
    }
    if (goal.rotation) {
      cam.quaternion.copy(goal.rotation)
    }
    if (goal.up) {
      cam.up.copy(goal.up)
    }
    if (goal.zoom !== undefined && isInstanceOf(cam, 'OrthographicCamera')) {
      cam.zoom = goal.zoom
    }

    cam.updateMatrixWorld()
    cam.updateProjectionMatrix()

    if (controls && goal.target) {
      if ('setTarget' in controls) {
        controls.setTarget(goal.target.x, goal.target.y, goal.target.z, false)
      } else {
        controls.target.copy(goal.target)
      }
    }

    animating = false

    progress = 1
    invalidate()
  }

  $effect(() => {
    if (!animating || !controls) {
      return
    }

    const { enabled } = controls
    controls.enabled = false
    return () => {
      if (controls) {
        controls.enabled = enabled
      }
    }
  })

  const reset = () => {
    const { center, distance } = getSize()
    const cam = camera.current

    const direction = cam.position.clone().sub(center).normalize()
    goal.position = center.clone().addScaledVector(direction, distance)
    goal.target = center.clone()
    const mCamRot = new Matrix4().lookAt(goal.position, goal.target, cam.up)
    goal.rotation = new Quaternion().setFromRotationMatrix(mCamRot)

    if (animate()) {
      animating = true
      progress = 0
    } else {
      setGoal()
    }

    return context
  }

  const fit = () => {
    const cam = camera.current

    if (!isInstanceOf(cam, 'OrthographicCamera')) {
      // For non-orthographic cameras, fit should behave exactly like reset
      return reset()
    }

    // For orthographic cameras, fit should only modify the zoom value
    let maxHeight = 0
    let maxWidth = 0
    const vertices = [
      new Vector3(box.min.x, box.min.y, box.min.z),
      new Vector3(box.min.x, box.max.y, box.min.z),
      new Vector3(box.min.x, box.min.y, box.max.z),
      new Vector3(box.min.x, box.max.y, box.max.z),
      new Vector3(box.max.x, box.max.y, box.max.z),
      new Vector3(box.max.x, box.max.y, box.min.z),
      new Vector3(box.max.x, box.min.y, box.max.z),
      new Vector3(box.max.x, box.min.y, box.min.z)
    ]

    // Transform the center and each corner to camera space
    const pos = goal.position ?? cam.position
    const target = goal.target ?? controls?.target
    const up = goal.up ?? cam.up
    const mCamWInv = target
      ? new Matrix4().lookAt(pos, target, up).setPosition(pos).invert()
      : cam.matrixWorldInverse

    for (const v of vertices) {
      v.applyMatrix4(mCamWInv)
      maxHeight = Math.max(maxHeight, Math.abs(v.y))
      maxWidth = Math.max(maxWidth, Math.abs(v.x))
    }

    maxHeight *= 2
    maxWidth *= 2
    const zoomForHeight = (cam.top - cam.bottom) / maxHeight
    const zoomForWidth = (cam.right - cam.left) / maxWidth

    goal.zoom = Math.min(zoomForHeight, zoomForWidth) / margin()

    if (animate()) {
      animating = true
      progress = 0
    } else {
      setGoal()
    }

    onFit()?.(getSize())

    return context
  }

  const clip = () => {
    const { distance } = getSize()
    const cam = camera.current as PerspectiveCamera | OrthographicCamera

    cam.near = distance / 100
    cam.far = distance * 100
    cam.updateProjectionMatrix()

    if (controls) {
      controls.maxDistance = distance * 10
      controls.update()
    }

    invalidate()

    return context
  }

  // Camera animation loop.
  useTask(
    (delta) => {
      const cam = camera.current as PerspectiveCamera | OrthographicCamera

      progress += delta / maxDuration()

      if (progress >= 1) {
        setGoal()
      } else {
        const fn = interpolate() ?? defaultInterpolateFn
        const k = fn(progress)

        if (goal.position) {
          cam.position.lerpVectors(origin.position, goal.position, k)
        }

        if (goal.rotation) {
          cam.quaternion.slerpQuaternions(origin.rotation, goal.rotation, k)
        }

        if (goal.up) {
          cam.up.set(0, 1, 0).applyQuaternion(cam.quaternion)
        }

        if (goal.zoom !== undefined && isInstanceOf(cam, 'OrthographicCamera')) {
          cam.zoom = (1 - k) * origin.zoom + k * goal.zoom
        }

        if (controls && goal.target && 'target' in controls) {
          controls.target.lerpVectors(origin.target, goal.target, k)
        }

        cam.updateMatrixWorld()
        cam.updateProjectionMatrix()
      }

      invalidate()
    },
    {
      running: () => animating
    }
  )

  const context: BoundsContext = {
    getSize,
    refresh,
    reset,
    fit,
    clip
  }

  setContext(key, context)

  return context
}

export const useBounds = (): BoundsContext => {
  return getContext<BoundsContext>(key)
}

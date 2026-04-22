import { Object3D, Vector3, type Vector3Tuple } from 'three'
import { useTask, useThrelte } from '@threlte/core'
import type CameraControls from 'camera-controls'

export type FollowTarget =
  | Object3D
  | { current?: Object3D | null }
  | (() => Object3D | null | undefined)

export interface UseFollowOptions {
  /**
   * The `CameraControls` instance from `<CameraControls>` that the follow
   * behavior is attached to. The hook is a no-op while this is falsy, so
   * it's safe to pass a ref that hasn't mounted yet.
   */
  controls?: CameraControls | null
  /**
   * Offset added to the target's world position when setting the
   * `CameraControls` target — used to look at the character's head, chest,
   * or some other part of the rig rather than the origin.
   * @default [0, 0, 0]
   */
  lookAtOffset?: Vector3 | Vector3Tuple
  /**
   * Dead zone in camera-space right/up axes. The target may drift this far
   * from the currently tracked position before the camera starts following.
   * Axes left at `0` have no dead zone on that axis.
   */
  deadZone?: { x?: number; y?: number }
  /**
   * Shift the tracked point in the target's direction of motion, expressed
   * as seconds of preview (`velocity * lookAhead`). `0` disables look-ahead.
   * @default 0
   */
  lookAhead?: number
  /**
   * Smoothing time in seconds for the velocity that drives `lookAhead`.
   * Prevents the look-ahead offset from snapping to full magnitude the
   * instant a character starts or stops moving — it ramps in and out over
   * this duration instead.
   * @default 0.15
   */
  lookAheadSmoothTime?: number
  /**
   * Smoothing time in seconds for the camera position's translation. The
   * camera's position lags the character's movement by this much, producing
   * a trailing / cinematic follow. Only the character-motion contribution
   * is smoothed — `CameraControls`' orbit pivot stays exactly on the
   * character and the camera's look-at direction updates instantly, so
   * rotating while moving and tweaking `lookAtOffset` both feel snappy.
   *
   * `0` (the default) disables follow smoothing. Rotation/zoom input still
   * smooths via `CameraControls`' own `smoothTime`.
   * @default 0
   */
  followSmoothTime?: number
}

const EPSILON = 1e-6

export const useFollow = (optionsFn?: () => UseFollowOptions) => {
  const { invalidate, scheduler, mainStage, renderStage } = useThrelte()

  const postStage = scheduler.createStage(Symbol('useFollow-post'), {
    after: mainStage,
    before: renderStage
  })

  let _following = $state(false)
  let _distance = $state(0)

  let target: FollowTarget | null = null
  let initialized = false
  let smoothingInitialized = false

  const targetWorld = new Vector3()
  const lastTargetWorld = new Vector3()
  const velocity = new Vector3()
  const smoothedVelocity = new Vector3()
  const trackedTarget = new Vector3()
  const lookAtPoint = new Vector3()
  const tempDiff = new Vector3()
  const cameraRight = new Vector3()
  const cameraUp = new Vector3()
  const cameraForward = new Vector3()
  const cameraPos = new Vector3()
  const inputForward = new Vector3()
  const inputRight = new Vector3()
  const smoothedTracked = new Vector3()
  const lag = new Vector3()
  const smoothedLookAt = new Vector3()

  const resolveTarget = (): Object3D | null => {
    if (target === null) return null
    if (target instanceof Object3D) return target
    if (typeof target === 'function') return target() ?? null
    return target.current ?? null
  }

  const { task } = useTask(
    Symbol('useFollow'),
    (delta) => {
      const options = optionsFn?.() ?? {}
      const controls = options.controls
      const obj = resolveTarget()

      if (!controls || obj === null) {
        if (_following) _following = false
        return
      }

      if (!_following) _following = true

      obj.getWorldPosition(targetWorld)

      if (initialized && delta > 0) {
        velocity.subVectors(targetWorld, lastTargetWorld).divideScalar(delta)
        const lookAheadSmoothTime = Math.max(0.001, options.lookAheadSmoothTime ?? 0.15)
        const velT = 1 - Math.exp(-delta / lookAheadSmoothTime)
        smoothedVelocity.lerp(velocity, velT)
      } else {
        velocity.set(0, 0, 0)
        smoothedVelocity.set(0, 0, 0)
      }
      lastTargetWorld.copy(targetWorld)

      const deadZoneX = options.deadZone?.x ?? 0
      const deadZoneY = options.deadZone?.y ?? 0

      if (!initialized) {
        trackedTarget.copy(targetWorld)
      } else if (deadZoneX > 0 || deadZoneY > 0) {
        const cam = controls.camera
        cameraRight.setFromMatrixColumn(cam.matrixWorld, 0).normalize()
        cameraUp.setFromMatrixColumn(cam.matrixWorld, 1).normalize()
        cameraForward.setFromMatrixColumn(cam.matrixWorld, 2).negate().normalize()

        tempDiff.subVectors(targetWorld, trackedTarget)
        const dx = tempDiff.dot(cameraRight)
        const dy = tempDiff.dot(cameraUp)
        const dz = tempDiff.dot(cameraForward)

        if (deadZoneX > 0) {
          if (Math.abs(dx) > deadZoneX) {
            trackedTarget.addScaledVector(cameraRight, dx > 0 ? dx - deadZoneX : dx + deadZoneX)
          }
        } else {
          trackedTarget.addScaledVector(cameraRight, dx)
        }

        if (deadZoneY > 0) {
          if (Math.abs(dy) > deadZoneY) {
            trackedTarget.addScaledVector(cameraUp, dy > 0 ? dy - deadZoneY : dy + deadZoneY)
          }
        } else {
          trackedTarget.addScaledVector(cameraUp, dy)
        }

        trackedTarget.addScaledVector(cameraForward, dz)
      } else {
        trackedTarget.copy(targetWorld)
      }

      lookAtPoint.copy(trackedTarget)
      if (options.lookAtOffset) {
        if (Array.isArray(options.lookAtOffset)) {
          lookAtPoint.x += options.lookAtOffset[0] ?? 0
          lookAtPoint.y += options.lookAtOffset[1] ?? 0
          lookAtPoint.z += options.lookAtOffset[2] ?? 0
        } else {
          lookAtPoint.add(options.lookAtOffset)
        }
      }

      const lookAhead = options.lookAhead ?? 0
      if (lookAhead !== 0 && smoothedVelocity.lengthSq() > EPSILON) {
        lookAtPoint.addScaledVector(smoothedVelocity, lookAhead)
      }

      controls.moveTo(lookAtPoint.x, lookAtPoint.y, lookAtPoint.z, false)
      initialized = true

      controls.camera.getWorldPosition(cameraPos)
      _distance = cameraPos.distanceTo(targetWorld)

      invalidate()
    },
    { autoInvalidate: false }
  )

  useTask(
    Symbol('useFollow-smooth'),
    (delta) => {
      const options = optionsFn?.() ?? {}
      const controls = options.controls
      if (!controls || !_following) return

      const followSmoothTime = Math.max(0, options.followSmoothTime ?? 0)

      if (!smoothingInitialized) {
        smoothedTracked.copy(trackedTarget)
        smoothingInitialized = true
      }

      if (followSmoothTime <= EPSILON) {
        smoothedTracked.copy(trackedTarget)
        return
      }

      const t = 1 - Math.exp(-delta / followSmoothTime)
      smoothedTracked.lerp(trackedTarget, t)

      lag.subVectors(smoothedTracked, trackedTarget)
      if (lag.lengthSq() < EPSILON) return

      const cam = controls.camera
      cam.position.add(lag)
      smoothedLookAt.copy(lookAtPoint).add(lag)
      cam.lookAt(smoothedLookAt)
    },
    { stage: postStage, autoInvalidate: false }
  )

  const follow = (next: FollowTarget | null) => {
    target = next
    initialized = false
    smoothingInitialized = false
    invalidate()
  }

  const getInputDirection = (right: number, forward: number, out: Vector3): Vector3 => {
    const cam = optionsFn?.().controls?.camera
    out.set(0, 0, 0)
    if (!cam) return out
    cam.getWorldDirection(inputForward)
    inputForward.y = 0
    if (inputForward.lengthSq() < EPSILON) return out
    inputForward.normalize()
    inputRight.set(-inputForward.z, 0, inputForward.x)
    return out.addScaledVector(inputRight, right).addScaledVector(inputForward, forward)
  }

  return {
    /** Internal task, exposed for ordering other tasks via `after`/`before`. */
    task,
    /**
     * Start following a target. Accepts an `Object3D`, a `{ current }` ref, a
     * getter function, or `null` to stop. Usable directly as an `oncreate`
     * handler: `<T.Group oncreate={follow.follow}>`.
     */
    follow,
    /** Stop following. Equivalent to `follow(null)`. */
    unfollow: () => follow(null),
    /**
     * Project a 2D input into a world-space direction aligned with the
     * camera's horizontal basis. `right` maps to the camera's right axis,
     * `forward` to its forward axis (both flattened to the XZ plane). Writes
     * to `out` and returns it.
     *
     * Used to make character movement feel correct regardless of how the
     * user has orbited the camera: `W` always means "away from camera".
     */
    getInputDirection,
    /** Whether a target is currently being followed. */
    get following() {
      return _following
    },
    /** Current distance from the camera's world position to the target. */
    get distance() {
      return _distance
    }
  }
}

export type UseFollowReturn = ReturnType<typeof useFollow>

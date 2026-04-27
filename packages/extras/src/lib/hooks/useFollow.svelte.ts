import { Euler, Object3D, Quaternion, Vector3, type Vector3Tuple } from 'three'
import { useTask, useThrelte } from '@threlte/core'
import type CameraControls from 'camera-controls'

export interface UseFollowOptions {
  target?: Object3D | undefined | null

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

  /**
   * When `true`, drive the camera's azimuth from the target's Y-axis world
   * rotation each frame, so the camera turns with the character. User orbit input
   * on the horizontal axis is effectively overridden while this is on; polar orbit
   * and zoom still work.
   *
   * Don't pair with `minAzimuthAngle`/`maxAzimuthAngle` limits on
   * `<CameraControls>` — the tracker will fight the limits.
   * @default false
   */
  trackRotation?: boolean

  /**
   * Smoothing time in seconds for rotation tracking. `0` (the default)
   * snaps the camera's azimuth to the target's yaw each frame. Higher values ease the
   * camera into the character's facing direction.
   * @default 0
   */
  trackRotationSmoothTime?: number

  /**
   * Additional azimuth offset (radians) applied after rotation tracking.
   * Set to `Math.PI` to sit the camera behind a character whose local `+Z`
   * axis is its forward, or `0` for a character whose local `-Z` is
   * forward.
   * @default 0
   */
  trackRotationOffset?: number
}

const EPSILON = 1e-6

export const useFollow = (optionsFn?: () => UseFollowOptions) => {
  const { invalidate, scheduler, mainStage, renderStage } = useThrelte()

  const {
    target,
    controls,
    deadZone,
    lookAtOffset,
    lookAheadSmoothTime = 0.15,
    lookAhead = 0,
    trackRotation = false,
    trackRotationOffset = 0,
    trackRotationSmoothTime = 0,
    followSmoothTime = 0
  } = $derived(optionsFn?.() ?? {})
  const deadZoneX = $derived(deadZone?.x ?? 0)
  const deadZoneY = $derived(deadZone?.y ?? 0)

  const postStage = scheduler.createStage(Symbol('useFollow-post'), {
    after: mainStage,
    before: renderStage
  })

  let following = $state(false)
  let distance = $state(0)

  let initialized = false
  let smoothingInitialized = false
  let prevTarget: Object3D | null = null

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
  const targetQuat = new Quaternion()
  const trackEuler = new Euler(0, 0, 0, 'YXZ')
  const targetForward = new Vector3()
  const targetRight = new Vector3()

  const { task } = useTask(
    Symbol('useFollow'),
    (delta) => {
      if (target !== prevTarget) {
        initialized = false
        smoothingInitialized = false
        prevTarget = target ?? null
      }

      if (!controls || !target) {
        if (following) following = false
        return
      }

      if (!following) {
        following = true
      }

      target.getWorldPosition(targetWorld)

      if (initialized && delta > 0) {
        velocity.subVectors(targetWorld, lastTargetWorld).divideScalar(delta)
        const scaledLookAheadSmoothTime = Math.max(0.001, lookAheadSmoothTime)
        const velT = 1 - Math.exp(-delta / scaledLookAheadSmoothTime)
        smoothedVelocity.lerp(velocity, velT)
      } else {
        velocity.set(0, 0, 0)
        smoothedVelocity.set(0, 0, 0)
      }

      lastTargetWorld.copy(targetWorld)

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
      if (lookAtOffset) {
        if (Array.isArray(lookAtOffset)) {
          lookAtPoint.x += lookAtOffset[0] ?? 0
          lookAtPoint.y += lookAtOffset[1] ?? 0
          lookAtPoint.z += lookAtOffset[2] ?? 0
        } else {
          lookAtPoint.add(lookAtOffset)
        }
      }

      if (lookAhead !== 0 && smoothedVelocity.lengthSq() > EPSILON) {
        lookAtPoint.addScaledVector(smoothedVelocity, lookAhead)
      }

      controls.moveTo(lookAtPoint.x, lookAtPoint.y, lookAtPoint.z, false)

      if (trackRotation) {
        target.getWorldQuaternion(targetQuat)
        trackEuler.setFromQuaternion(targetQuat, 'YXZ')
        const targetAzimuth = trackEuler.y + trackRotationOffset
        const current = controls.azimuthAngle
        let arc = targetAzimuth - current
        arc = Math.atan2(Math.sin(arc), Math.cos(arc))
        const rotSmooth = Math.max(0, trackRotationSmoothTime)
        const rotT = rotSmooth <= EPSILON ? 1 : 1 - Math.exp(-delta / rotSmooth)
        controls.azimuthAngle = current + arc * rotT
      }

      initialized = true

      invalidate()
    },
    { autoInvalidate: false }
  )

  const { task: smoothTask } = useTask(
    Symbol('useFollow-smooth'),
    (delta) => {
      if (!controls || !following) return

      const scaledFollowSmoothTime = Math.max(0, followSmoothTime)

      if (!smoothingInitialized) {
        smoothedTracked.copy(trackedTarget)
        smoothingInitialized = true
      }

      if (scaledFollowSmoothTime > EPSILON) {
        const t = 1 - Math.exp(-delta / scaledFollowSmoothTime)
        smoothedTracked.lerp(trackedTarget, t)

        lag.subVectors(smoothedTracked, trackedTarget)
        if (lag.lengthSq() >= EPSILON) {
          const cam = controls.camera
          cam.position.add(lag)
          smoothedLookAt.copy(lookAtPoint).add(lag)
          cam.lookAt(smoothedLookAt)
        }
      } else {
        smoothedTracked.copy(trackedTarget)
      }

      controls.camera.getWorldPosition(cameraPos)
      distance = cameraPos.distanceTo(targetWorld)
    },
    { stage: postStage, autoInvalidate: false }
  )

  const getInputDirection = (right: number, forward: number, out: Vector3): Vector3 => {
    const cam = controls?.camera
    out.set(0, 0, 0)
    if (!cam) return out
    cam.getWorldDirection(inputForward)
    inputForward.y = 0
    if (inputForward.lengthSq() < EPSILON) return out
    inputForward.normalize()
    inputRight.set(-inputForward.z, 0, inputForward.x)
    return out.addScaledVector(inputRight, right).addScaledVector(inputForward, forward)
  }

  const getTargetDirection = (right: number, forward: number, out: Vector3): Vector3 => {
    out.set(0, 0, 0)

    if (!target) return out
    target.updateWorldMatrix(true, false)
    targetRight.setFromMatrixColumn(target.matrixWorld, 0)
    targetForward.setFromMatrixColumn(target.matrixWorld, 2)
    targetRight.y = 0
    targetForward.y = 0
    if (targetForward.lengthSq() < EPSILON) return out
    targetRight.normalize()
    targetForward.normalize()
    return out.addScaledVector(targetRight, right).addScaledVector(targetForward, forward)
  }

  return {
    /** Internal task, exposed for ordering other tasks via `after`/`before`. */
    task,

    /**
     * Post-update task that runs after `<CameraControls>`' update, in a
     * dedicated stage between `mainStage` and `renderStage`. Applies
     * `followSmoothTime` lag to the camera's position and rebuilds the
     * camera's `lookAt` for the frame.
     *
     * Exposed as an ordering anchor for hooks that decorate the camera
     * after follow's writes (e.g. a camera shake):
     *
     * ```ts
     * const shake = useShake(() => ({ after: follow.smoothTask }))
     * ```
     */
    smoothTask,

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

    /**
     * Project a 2D input into a world-space direction aligned with the
     * target's own horizontal basis — `forward` follows the target's local
     * `+Z` axis, `right` follows its local `+X`. Writes to `out` and returns
     * it.
     *
     * Use this instead of `getInputDirection` when `trackRotation` is on:
     * camera-relative input combined with rotation tracking creates a
     * feedback loop and the character will spin.
     */
    getTargetDirection,

    /** Whether a target is currently being followed. */
    get following() {
      return following
    },

    /** Current distance from the camera's world position to the target. */
    get distance() {
      return distance
    }
  }
}

export type UseFollowReturn = ReturnType<typeof useFollow>

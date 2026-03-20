<script lang="ts">
  import { get } from 'svelte/store'
  import { Box3, Group, Matrix4, Quaternion, Vector3, type Camera, type Object3D } from 'three'
  import { T, observe, useTask, useThrelte } from '@threlte/core'
  import { useControlsContext } from '../controls/useControlsContext.js'
  import type { BoundsProps, SizeProps } from './types.js'

  type ControlsProto = {
    update(): void
    target: Vector3
    maxDistance: number
    addEventListener: (event: string, callback: (event: any) => void) => void
    removeEventListener: (event: string, callback: (event: any) => void) => void
  }

  const isOrthographic = (def: Camera): def is Camera & { isOrthographicCamera: true } =>
    def && (def as any).isOrthographicCamera

  const isBox3 = (def: any): def is Box3 => def && (def as any).isBox3

  const interpolateFuncDefault = (t: number) => {
    // Imitates the previously used THREE.MathUtils.damp
    return 1 - Math.exp(-5 * t) + 0.007 * t
  }

  let {
    maxDuration = 1,
    margin = 1.2,
    fit = false,
    clip = false,
    interpolateFunc = interpolateFuncDefault,
    onFit = () => {},
    ref = $bindable(),
    children,
    ...props
  }: BoundsProps = $props()

  const group = new Group()

  const { camera, size, invalidate } = useThrelte()
  const { orbitControls, trackballControls } = useControlsContext()

  const box = new Box3()

  // Animation state machine.
  const AnimationStateValues = { NONE: 0, START: 1, ACTIVE: 2 } as const
  type AnimationState = (typeof AnimationStateValues)[keyof typeof AnimationStateValues]

  const origin = {
    camPos: new Vector3(),
    camRot: new Quaternion(),
    camZoom: 1
  }

  const goal = {
    camPos: undefined as Vector3 | undefined,
    camRot: undefined as Quaternion | undefined,
    camZoom: undefined as number | undefined,
    camUp: undefined as Vector3 | undefined,
    target: undefined as Vector3 | undefined
  }

  let animationState = $state<AnimationState>(AnimationStateValues.NONE)
  let t = 0 // represents animation state from 0 to 1

  const getActiveControls = (): ControlsProto | undefined => {
    return (get(orbitControls) ?? get(trackballControls)) as unknown as ControlsProto | undefined
  }

  const getSize = (): SizeProps => {
    const cam = camera.current

    const boxSize = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxSize = Math.max(boxSize.x, boxSize.y, boxSize.z)

    const fitHeightDistance = isOrthographic(cam)
      ? maxSize * 4
      : maxSize / (2 * Math.atan((Math.PI * (cam as any).fov) / 360))

    const fitWidthDistance = isOrthographic(cam)
      ? maxSize * 4
      : fitHeightDistance / (cam as any).aspect
    const distance = margin * Math.max(fitHeightDistance, fitWidthDistance)

    return { box, size: boxSize, center, distance }
  }

  const refresh = (object?: Object3D | Box3) => {
    const cam = camera.current

    if (isBox3(object)) box.copy(object)
    else {
      const target = object ?? group
      if (!target) return
      target.updateWorldMatrix(true, true)
      box.setFromObject(target)
    }

    if (box.isEmpty()) {
      const max = cam.position.length() || 10
      box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max))
    }

    origin.camPos.copy(cam.position)
    origin.camRot.copy(cam.quaternion)
    if (isOrthographic(cam)) {
      origin.camZoom = (cam as any).zoom
    }

    goal.camPos = undefined
    goal.camRot = undefined
    goal.camZoom = undefined
    goal.camUp = undefined
    goal.target = undefined
  }

  const reset = () => {
    const cam = camera.current
    const { center, distance } = getSize()

    const direction = cam.position.clone().sub(center)
    if (direction.lengthSq() > 0) {
      direction.normalize()
    }

    goal.camPos = center.clone().addScaledVector(direction, distance)
    goal.target = center.clone()

    const mCamRot = new Matrix4().lookAt(goal.camPos, goal.target, cam.up)
    goal.camRot = new Quaternion().setFromRotationMatrix(mCamRot)

    animationState = AnimationStateValues.START
    t = 0
  }

  const fitBounds = () => {
    const cam = camera.current
    const controls = getActiveControls()

    if (!isOrthographic(cam)) {
      // For non-orthographic cameras, fit should behave exactly like reset
      return reset()
    }

    // For orthographic cameras, fit should only modify the zoom value.
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
    const pos = goal.camPos ?? cam.position
    const target = goal.target ?? controls?.target
    const up = goal.camUp ?? cam.up

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

    const zoomForHeight = ((cam as any).top - (cam as any).bottom) / maxHeight
    const zoomForWidth = ((cam as any).right - (cam as any).left) / maxWidth

    goal.camZoom = Math.min(zoomForHeight, zoomForWidth) / margin

    animationState = AnimationStateValues.START
    t = 0

    onFit?.(getSize())
  }

  const clipBounds = () => {
    const cam = camera.current
    const { distance } = getSize()

    ;(cam as any).near = distance / 100
    ;(cam as any).far = distance * 100
    ;(cam as any).updateProjectionMatrix()

    const controls = getActiveControls()
    if (controls) {
      controls.maxDistance = distance * 10
      controls.update()
    }

    invalidate()
  }

  // Ensure we don't let user drag hijack ongoing bounds animations.
  // (Copied from the React implementation's `controls.addEventListener('start', ...)`.)
  let controlsForDragHijack: ControlsProto | undefined
  const handleControlsStart = () => {
    const controls = controlsForDragHijack
    const cam = camera.current
    if (!controls || !goal.target || animationState === AnimationStateValues.NONE) {
      return
    }

    const front = new Vector3().setFromMatrixColumn(cam.matrix, 2)
    const d0 = origin.camPos.distanceTo(controls.target)
    const camPosOrOrigin = goal.camPos ?? origin.camPos
    const d1 = camPosOrOrigin.distanceTo(goal.target)
    const d = (1 - t) * d0 + t * d1

    controls.target.copy(cam.position).addScaledVector(front, -d)
    controls.update()

    animationState = AnimationStateValues.NONE
  }

  observe(
    () => [orbitControls, trackballControls],
    ([orbit, trackball]) => {
      const next = (orbit ?? trackball) as unknown as ControlsProto | undefined
      if (next === controlsForDragHijack) return

      if (controlsForDragHijack) {
        controlsForDragHijack.removeEventListener('start', handleControlsStart)
      }

      controlsForDragHijack = next
      if (controlsForDragHijack) {
        controlsForDragHijack.addEventListener('start', handleControlsStart)
      }
    }
  )

  // Refresh bounds when viewport changes.
  observe(
    () => [size, clip, fit, margin, camera, orbitControls, trackballControls],
    ([, , , , , ,]) => {
      refresh()
      if (fit) {
        reset()
        fitBounds()
      }
      if (clip) {
        clipBounds()
      }
    }
  )

  // Camera animation loop.
  useTask(
    (delta) => {
      // [additional animation step START] is needed to guarantee that delta used
      // in animation isn't absurdly high (2-3 seconds) which is actually possible
      // if rendering happens on demand.
      if (animationState === AnimationStateValues.START) {
        animationState = AnimationStateValues.ACTIVE
        return
      }

      if (animationState === AnimationStateValues.ACTIVE) {
        t += delta / maxDuration

        if (t >= 1) {
          if (goal.camPos) {
            camera.current.position.copy(goal.camPos)
          }
          if (goal.camRot) {
            camera.current.quaternion.copy(goal.camRot)
          }
          if (goal.camUp) {
            camera.current.up.copy(goal.camUp)
          }
          if (goal.camZoom !== undefined && isOrthographic(camera.current)) {
            ;(camera.current as any).zoom = goal.camZoom
          }

          camera.current.updateMatrixWorld()
          ;(camera.current as any).updateProjectionMatrix()

          const controls = getActiveControls()
          if (controls && goal.target) {
            controls.target.copy(goal.target)
            controls.update()
          }

          animationState = AnimationStateValues.NONE
          t = 1
          invalidate()
        } else {
          const k = interpolateFunc(t)

          if (goal.camPos) {
            camera.current.position.lerpVectors(origin.camPos, goal.camPos, k)
          }
          if (goal.camRot) {
            camera.current.quaternion.slerpQuaternions(origin.camRot, goal.camRot, k)
          }
          if (goal.camUp) {
            camera.current.up.set(0, 1, 0).applyQuaternion(camera.current.quaternion)
          }
          if (goal.camZoom !== undefined && isOrthographic(camera.current)) {
            ;(camera.current as any).zoom = (1 - k) * origin.camZoom + k * goal.camZoom
          }

          camera.current.updateMatrixWorld()
          ;(camera.current as any).updateProjectionMatrix()
        }

        invalidate()
      }
    },
    {
      running: () => animationState !== AnimationStateValues.NONE
    }
  )
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {@render children?.({ ref: group })}
</T>

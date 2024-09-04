<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import {
    Group,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
    Quaternion,
    Vector3
  } from 'three'
  import type { GizmoProps } from './Gizmo.svelte'
  import { interactivity, type IntersectionEvent } from '../../interactivity'
  import Axis from './Axis.svelte'
  import AxisHead from './AxisHead.svelte'

  let {
    animationTask,
    turnRate = 2 * Math.PI,
    target: targetArray = [0, 0, 0],
    verticalPlacement = 'bottom',
    horizontalPlacement = 'right',
    scale: gizmoScale = 1,
    xColor = 0xff3653,
    yColor = 0x8adb00,
    zColor = 0x2c8fff,
    paddingX = 50,
    paddingY = 50,
    hideNegativeAxes = false,
    hideAxisHeads = false,
    disabled = false,
    font = 'system-ui',
    onclick: userOnClick,
    mainCamera
  }: GizmoProps & { mainCamera: PerspectiveCamera | OrthographicCamera } = $props()

  const defaultUp = new Vector3()
  const target = new Vector3()

  $effect.pre(() => {
    defaultUp.copy(mainCamera.up)
  })

  $effect.pre(() => {
    target.fromArray(targetArray)
  })

  interactivity()

  const { invalidate, size } = useThrelte()

  $effect.pre(() => {
    gizmoScale
    horizontalPlacement
    verticalPlacement
    paddingX
    paddingY
    invalidate()
  })

  const root = new Group()
  const targetPosition = new Vector3()
  const targetQuaternion = new Quaternion()
  const currentQuaternion = new Quaternion()
  const dummy = new Object3D()

  let radius = 0
  let animating = false

  /**
   * @returns boolean that indicates if the target and the current rotation are equal.
   */
  const onclick = (event: IntersectionEvent<PointerEvent>) => {
    if (disabled) return

    userOnClick?.(event)

    animating = true

    const { object } = event.intersections[0]

    radius = mainCamera.position.distanceTo(target)

    // Rotate from current camera orientation
    currentQuaternion.copy(mainCamera.quaternion)

    targetPosition.copy(object.position).multiplyScalar(radius).add(target)

    dummy.lookAt(targetPosition)
    dummy.up.copy(mainCamera.up)

    targetQuaternion.copy(dummy.quaternion)
  }

  // Used to test which axis (pos or neg) are closer to the camera.
  const point = new Vector3()
  let x = $state(0)
  let y = $state(0)
  let z = $state(0)

  useTask(
    animationTask?.key ?? Symbol('threlte-extras-gizmo-animation'),
    (delta) => {
      point.set(0, 0, 1).applyQuaternion(mainCamera.quaternion)

      if (point.x !== x || point.y !== y || point.z !== z) {
        x = point.x
        y = point.y
        z = point.z
        root.quaternion.copy(mainCamera.quaternion).invert()
        invalidate()
      }

      if (animating) {
        const step = delta * turnRate

        // animate position by doing a slerp and then scaling the position on the unit sphere
        currentQuaternion.rotateTowards(targetQuaternion, step)
        mainCamera.position
          .set(0, 0, 1)
          .applyQuaternion(currentQuaternion)
          .multiplyScalar(radius)
          .add(target)
        mainCamera.up.set(0, 1, 0).applyQuaternion(currentQuaternion).normalize()
        mainCamera.quaternion.rotateTowards(targetQuaternion, step)

        if (currentQuaternion.angleTo(targetQuaternion) < 0.001) {
          animating = false
          mainCamera.up.copy(defaultUp)
        }

        invalidate()
      }
    },
    {
      ...animationTask,
      autoInvalidate: false
    }
  )

  // Used to decrease atifacts of intersecting axis stems.
  let frontMostAxisValue = $derived(Math.max(x, y, z))
  let usePolygonOffset = $derived(x < 0 || y < 0 || z < 0)

  const px = $derived(
    horizontalPlacement === 'left' ? -$size.width / 2 + paddingX : $size.width / 2 - paddingX
  )
  const py = $derived(
    verticalPlacement === 'top' ? $size.height / 2 - paddingY : -$size.height / 2 + paddingY
  )
</script>

<T.OrthographicCamera
  makeDefault
  position={[0, 0, 200]}
/>

<T
  is={root}
  position.x={px}
  position.y={py}
  scale={30 * gizmoScale}
>
  {#if !hideAxisHeads}
    <AxisHead
      color={xColor}
      position.x={1}
      label="X"
      opacity={x >= 0 ? 1 : 0.5}
      {font}
      {onclick}
    />

    <AxisHead
      color={yColor}
      position.y={1}
      label="Y"
      opacity={y >= 0 ? 1 : 0.5}
      {font}
      {onclick}
    />

    <AxisHead
      color={zColor}
      position.z={1}
      label="Z"
      opacity={z >= 0 ? 1 : 0.5}
      {font}
      {onclick}
    />
  {/if}

  {#if !hideNegativeAxes && !hideAxisHeads}
    <AxisHead
      color={xColor}
      position.x={-1}
      scale={0.8}
      opacity={x >= 0 ? 0.5 : 1}
      {onclick}
    />

    <AxisHead
      color={yColor}
      position.y={-1}
      scale={0.8}
      opacity={y >= 0 ? 0.5 : 1}
      {onclick}
    />

    <AxisHead
      color={zColor}
      position.z={-1}
      scale={0.8}
      userData.targetEuler={[0, Math.PI, 0]}
      opacity={z >= 0 ? 0.5 : 1}
      {onclick}
    />
  {/if}

  <Axis
    color={xColor}
    renderOrder={frontMostAxisValue === x ? -1 : 0}
    opacity={x >= 0 ? 1 : 0.5}
    polygonOffset={usePolygonOffset && frontMostAxisValue === x && x < 0.75}
  />

  <Axis
    color={yColor}
    rotation.z={Math.PI / 2}
    renderOrder={frontMostAxisValue === y ? -1 : 0}
    opacity={y >= 0 ? 1 : 0.5}
    polygonOffset={usePolygonOffset && frontMostAxisValue === y && y < 0.75}
  />

  <Axis
    color={zColor}
    rotation.y={-Math.PI / 2}
    renderOrder={frontMostAxisValue === z ? -1 : 0}
    opacity={z >= 0 ? 1 : 0.5}
    polygonOffset={usePolygonOffset && frontMostAxisValue === z && z < 0.75}
  />
</T>

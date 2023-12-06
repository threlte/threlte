<script lang="ts">
  import { HierarchicalObject, T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy, onMount } from 'svelte'
  import {
    CanvasTexture,
    Color,
    Euler,
    Object3D,
    OrthographicCamera,
    Quaternion,
    Raycaster,
    Scene,
    Sprite,
    Vector2,
    Vector3,
    Vector4,
    type Intersection
  } from 'three'
  import type { GizmoEvents, GizmoProps, GizmoSlots } from './Gizmo'

  type $$Props = GizmoProps
  type $$Events = GizmoEvents
  type $$Slots = GizmoSlots

  export let renderTask: $$Props['renderTask'] = undefined
  export let animationTask: $$Props['animationTask'] = undefined

  export let turnRate: Required<$$Props>['turnRate'] = 2 * Math.PI
  export let center: Required<$$Props>['center'] = [0, 0, 0]
  export let verticalPlacement: Required<$$Props>['verticalPlacement'] = 'bottom'
  export let horizontalPlacement: Required<$$Props>['horizontalPlacement'] = 'right'
  export let size: Required<$$Props>['size'] = 128
  export let xColor: Required<$$Props>['xColor'] = 0xff3653
  export let yColor: Required<$$Props>['yColor'] = 0x8adb00
  export let zColor: Required<$$Props>['zColor'] = 0x2c8fff

  $: centerVec = new Vector3(...center)

  const { autoRenderTask, renderer, camera, invalidate } = useThrelte()

  const orthoCam = new OrthographicCamera(-1.5, 1.5, 1.5, -1.5, 0, 4)
  orthoCam.position.set(0, 0, 2)

  let root: Scene

  useTask(
    renderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      const autoClear = renderer.autoClear
      renderer.autoClear = false

      const viewport = new Vector4()
      renderer.getViewport(viewport)

      const x = horizontalPlacement === 'left' ? 0 : renderer.domElement.offsetWidth - size
      const y = verticalPlacement === 'bottom' ? 0 : renderer.domElement.offsetHeight - size
      renderer.setViewport(x, y, size, size)

      renderer.render(root, orthoCam)

      renderer.setViewport(viewport.x, viewport.y, viewport.z, viewport.w)

      renderer.autoClear = autoClear
    },
    {
      ...(renderTask ?? { after: autoRenderTask }),
      autoInvalidate: false
    }
  )

  // User interaction must be handled manually because
  // the gizmo is not in the main scene. The click
  // target is added as a sibling of the renderer's
  // dom element.
  const clickTarget = document.createElement('div')
  clickTarget.style.position = 'absolute'
  $: {
    if (horizontalPlacement === 'right') {
      clickTarget.style.right = '0'
      clickTarget.style.left = ''
    } else {
      clickTarget.style.right = ''
      clickTarget.style.left = '0'
    }

    if (verticalPlacement === 'bottom') {
      clickTarget.style.bottom = '0'
      clickTarget.style.top = ''
    } else {
      clickTarget.style.bottom = ''
      clickTarget.style.top = '0'
    }

    clickTarget.style.height = `${size}px`
    clickTarget.style.width = `${size}px`
  }

  let posX: Sprite
  let posY: Sprite
  let posZ: Sprite
  let negX: Sprite
  let negY: Sprite
  let negZ: Sprite

  const targetPosition = new Vector3()
  const targetQuaternion = new Quaternion()
  const currentQuaternion = new Quaternion()
  const finalQuaternion = new Quaternion()
  let radius = 0

  let animating = false
  const mouse = new Vector2()
  const raycaster = new Raycaster()

  /**
   * Floating point operations make it hard to compare quaternions, controls
   * (such as the OrbitControls) may also restrict the rotation of the camera on
   * certain axes. To allow for loose equality checks, we use a sensible
   * threshold to compare quaternions.
   *
   * @param a - Quaternion a
   * @param b - Quaternion b
   * @param threshold - Threshold to use for comparison
   */
  const quaternionsAreEqual = (a: Quaternion, b: Quaternion, threshold: number) => {
    const delta =
      Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w)
    return delta < threshold
  }

  /**
   * @returns boolean that indicates if the target and the current rotation are equal.
   */
  const handleIntersection = (intersection: Intersection<Object3D>): boolean => {
    const object = intersection.object
    const targetPos = object.userData.targetPosition as [number, number, number]
    const targetEuler = object.userData.targetEuler as [number, number, number]

    radius = camera.current.position.distanceTo(centerVec)
    targetPosition
      .set(...targetPos)
      .multiplyScalar(radius)
      .add(centerVec)
    targetQuaternion.setFromEuler(new Euler(...targetEuler))

    const dummy = new Object3D()
    dummy.position.copy(centerVec)

    dummy.lookAt(camera.current.position)
    currentQuaternion.copy(dummy.quaternion)

    dummy.lookAt(targetPosition)
    finalQuaternion.copy(dummy.quaternion)

    if (quaternionsAreEqual(finalQuaternion, currentQuaternion, 0.0001)) {
      return true
    }

    animating = true
    return false
  }

  const handleClick = (event: MouseEvent) => {
    if (animating) {
      return
    }

    // Raycasting is done manually.
    const rect = clickTarget.getBoundingClientRect()
    const offsetX = rect.left + (clickTarget.offsetWidth - size)
    const offsetY = rect.top + (clickTarget.offsetHeight - size)
    mouse.x = ((event.clientX - offsetX) / (rect.right - offsetX)) * 2 - 1
    mouse.y = -((event.clientY - offsetY) / (rect.bottom - offsetY)) * 2 + 1

    raycaster.setFromCamera(mouse, orthoCam)

    const intersects = raycaster.intersectObjects([posX, posY, posZ, negX, negY, negZ])

    if (intersects.length > 0) {
      const alreadyReached = handleIntersection(intersects[0])
      if (alreadyReached) {
        // get the second closest intersection
        if (intersects.length > 1) {
          handleIntersection(intersects[1])
        }
      }
    }
  }

  onMount(() => {
    renderer.domElement.parentElement?.appendChild(clickTarget)
    clickTarget.addEventListener('click', handleClick)
  })

  onDestroy(() => {
    renderer.domElement.parentElement?.removeChild(clickTarget)
    clickTarget.removeEventListener('click', handleClick)
  })

  // Used to test which axis (pos or neg) are closer to the camera.
  const point = new Vector3()
  let p = [0, 0, 0]

  useTask(
    animationTask?.key ?? Symbol('threlte-extras-gizmo-animation'),
    (delta) => {
      point.set(0, 0, 1).applyQuaternion(camera.current.quaternion)
      if (point.x !== p[0] || point.y !== p[1] || point.z !== p[2]) {
        p = [point.x, point.y, point.z]
        root.quaternion.copy(camera.current.quaternion).invert()
        invalidate()
      }

      if (animating) {
        const step = delta * turnRate

        // animate position by doing a slerp and then scaling the position on the unit sphere
        currentQuaternion.rotateTowards(finalQuaternion, step)
        camera.current.position
          .set(0, 0, 1)
          .applyQuaternion(currentQuaternion)
          .multiplyScalar(radius)
          .add(centerVec)

        // animate orientation
        camera.current.quaternion.rotateTowards(targetQuaternion, step)

        if (currentQuaternion.angleTo(finalQuaternion) === 0) {
          animating = false
        }

        invalidate()
      }
    },
    {
      ...animationTask,
      autoInvalidate: false
    }
  )

  const getSpriteTexture = (color: number, text = '') => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    const context = canvas.getContext('2d')!
    context.beginPath()
    context.arc(32, 32, 16, 0, 2 * Math.PI)
    context.closePath()
    context.fillStyle = new Color(color).convertSRGBToLinear().getStyle()
    context.fill()

    if (text) {
      context.font = '24px Arial'
      context.textAlign = 'center'
      context.fillStyle = '#000000'
      context.fillText(text, 32, 41)
    }

    return new CanvasTexture(canvas)
  }
</script>

<HierarchicalObject>
  <T.Scene bind:ref={root}>
    <!-- xAxis -->
    <T.Sprite
      renderOrder={1}
      bind:ref={posX}
      position.x={1}
      userData.targetPosition={[1, 0, 0]}
      userData.targetEuler={[0, Math.PI * 0.5, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(xColor, 'X')}
        opacity={p[0] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh position.x={0.4}>
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[0] >= 0 ? 1 : 0.5}
      >
        <T.Color
          attach="color"
          args={[xColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      renderOrder={1}
      bind:ref={negX}
      position.x={-1}
      scale={0.8}
      userData.targetPosition={[-1, 0, 0]}
      userData.targetEuler={[0, -Math.PI * 0.5, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(xColor)}
        opacity={p[0] >= 0 ? 0.5 : 1}
      />
    </T.Sprite>

    <!-- yAxis -->
    <T.Sprite
      renderOrder={1}
      bind:ref={posY}
      position.y={1}
      userData.targetPosition={[0, 1, 0]}
      userData.targetEuler={[-Math.PI * 0.5, 0, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(yColor, 'Y')}
        opacity={p[1] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.y={0.4}
      rotation.z={Math.PI / 2}
    >
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[1] >= 0 ? 1 : 0.5}
      >
        <T.Color
          attach="color"
          args={[yColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      renderOrder={1}
      bind:ref={negY}
      position.y={-1}
      scale={0.8}
      userData.targetPosition={[0, -1, 0]}
      userData.targetEuler={[Math.PI * 0.5, 0, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(yColor)}
        opacity={p[1] >= 0 ? 0.5 : 1}
      />
    </T.Sprite>

    <!-- zAxis -->
    <T.Sprite
      renderOrder={1}
      bind:ref={posZ}
      position.z={1}
      userData.targetPosition={[0, 0, 1]}
      userData.targetEuler={[0, 0, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(zColor, 'Z')}
        opacity={p[2] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.z={0.4}
      rotation.y={-Math.PI / 2}
    >
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[2] >= 0 ? 1 : 0.5}
      >
        <T.Color
          attach="color"
          args={[zColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      renderOrder={1}
      bind:ref={negZ}
      position.z={-1}
      scale={0.8}
      userData.targetPosition={[0, 0, -1]}
      userData.targetEuler={[0, Math.PI, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(zColor)}
        opacity={p[2] >= 0 ? 0.5 : 1}
      />
    </T.Sprite>
  </T.Scene>
</HierarchicalObject>

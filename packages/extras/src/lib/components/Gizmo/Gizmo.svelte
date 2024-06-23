<script lang="ts">
  import { HierarchicalObject, T, useTask, useThrelte } from '@threlte/core'
  import { onMount } from 'svelte'
  import {
    CanvasTexture,
    CapsuleGeometry,
    Color,
    Euler,
    Object3D,
    OrthographicCamera,
    Quaternion,
    Raycaster,
    Scene,
    Vector2,
    Vector3,
    Vector4,
    type ColorRepresentation,
    type Intersection,
    type Sprite
  } from 'three'
  import type { GizmoProps } from './Gizmo.svelte'

  let {
    renderTask,
    animationTask,
    turnRate = 2 * Math.PI,
    center = [0, 0, 0],
    verticalPlacement = 'bottom',
    horizontalPlacement = 'right',
    size = 128,
    xColor = 0xff3653,
    yColor = 0x8adb00,
    zColor = 0x2c8fff,
    toneMapped = false,
    paddingX = 0,
    paddingY = 0
  }: GizmoProps = $props()

  const centerVec = new Vector3()

  $effect.pre(() => {
    centerVec.fromArray(center)
  })

  const { autoRenderTask, renderer, camera, invalidate } = useThrelte()

  // invalidate the frame when any of the following values change
  $effect.pre(() => {
    size
    horizontalPlacement
    verticalPlacement
    toneMapped
    paddingX
    paddingY
    invalidate()
  })

  const orthoCam = new OrthographicCamera(-1.25, 1.25, 1.25, -1.25, 0, 4)
  orthoCam.position.set(0, 0, 2)

  const root = new Scene()

  const viewport = new Vector4()

  useTask(
    renderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      const { autoClear, toneMapping } = renderer
      renderer.autoClear = false
      renderer.getViewport(viewport)
      renderer.toneMapping = toneMapped ? renderer.toneMapping : 0

      const x =
        horizontalPlacement === 'left'
          ? paddingX
          : renderer.domElement.offsetWidth - size - paddingX
      const y =
        verticalPlacement === 'bottom'
          ? paddingY
          : renderer.domElement.offsetHeight - size - paddingY

      renderer.setViewport(x, y, size, size)
      renderer.render(root, orthoCam)
      renderer.setViewport(viewport.x, viewport.y, viewport.z, viewport.w)
      renderer.autoClear = autoClear
      renderer.toneMapping = toneMapping
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
  // We need to know the bounding rect of the renderer's dom element
  const renderTarget = renderer.domElement
  const boundingRect = renderTarget.getBoundingClientRect()

  clickTarget.style.position = 'absolute'

  $effect.pre(() => {
    if (horizontalPlacement === 'right') {
      clickTarget.style.right = ''
      clickTarget.style.left = `${boundingRect.right - size - paddingX}px`
    } else {
      clickTarget.style.right = ''
      clickTarget.style.left = `${paddingX + boundingRect.left}px`
    }

    if (verticalPlacement === 'bottom') {
      clickTarget.style.bottom = ''
      clickTarget.style.top = `${boundingRect.bottom - size - paddingY}px`
    } else {
      clickTarget.style.bottom = ''
      clickTarget.style.top = `${paddingY + boundingRect.top}px`
    }

    clickTarget.style.height = `${size}px`
    clickTarget.style.width = `${size}px`
  })

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
    return () => {
      renderer.domElement.parentElement?.removeChild(clickTarget)
      clickTarget.removeEventListener('click', handleClick)
    }
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

  const findClosestPow2LargerThan = (x: number) => {
    if (x <= 0) {
      return 1
    }
    let pow2 = 1
    while (pow2 < x) {
      pow2 <<= 1
    }
    return pow2
  }

  let textureSize = $derived(findClosestPow2LargerThan(size * 0.3 * renderer.getPixelRatio()))

  /**
   * Keep track of the textures to be able to dispose them when they are no
   * longer needed.
   */
  const textures: Record<string, CanvasTexture> = {}

  const color = new Color()

  const getSpriteTexture = (size: number, colorRepresentation: ColorRepresentation, text = '') => {
    color.set(colorRepresentation)
    const key = `${color.getHexString()}-${text}`
    if (textures[key]) {
      textures[key].dispose()
    }
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext('2d')!
    context.beginPath()
    context.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI)
    context.closePath()
    context.fillStyle = color.convertSRGBToLinear().getStyle()
    context.fill()

    if (text) {
      const textSize = Math.abs(size * (24 / 64))
      context.font = `${textSize}px Arial`
      context.textAlign = 'center'
      context.fillStyle = '#000000'
      const textY = size * (41 / 64)
      context.fillText(text, size / 2, textY)
    }

    const texture = new CanvasTexture(canvas)
    textures[key] = texture
    return texture
  }

  const stemGeometry = new CapsuleGeometry(0.025, 0.78)
  stemGeometry.rotateZ(Math.PI / 2)

  // Used to decrease atifacts of intersecting axis stems.
  let frontMostAxisIndex = $derived(p.indexOf(Math.max(...p)))
  let usePolygonOffset = $derived(p.some((v) => v < 0))
</script>

<HierarchicalObject>
  <T is={root}>
    {@const polygonOffsetFactor = -20}

    <!-- xAxis -->
    <T.Sprite
      renderOrder={1}
      bind:ref={posX}
      position.x={1}
      userData.targetPosition={[1, 0, 0]}
      userData.targetEuler={[0, Math.PI * 0.5, 0]}
    >
      <T.SpriteMaterial
        map={getSpriteTexture(textureSize, xColor, 'X')}
        opacity={p[0] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.x={0.39}
      renderOrder={frontMostAxisIndex === 0 ? -1 : 0}
    >
      <T is={stemGeometry} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[0] >= 0 ? 1 : 0.5}
        color={xColor}
        polygonOffset={usePolygonOffset && frontMostAxisIndex === 0 && p[0] < 0.75}
        {polygonOffsetFactor}
      />
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
        map={getSpriteTexture(textureSize, xColor)}
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
        map={getSpriteTexture(textureSize, yColor, 'Y')}
        opacity={p[1] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.y={0.39}
      rotation.z={Math.PI / 2}
      renderOrder={frontMostAxisIndex === 1 ? -1 : 0}
    >
      <T is={stemGeometry} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[1] >= 0 ? 1 : 0.5}
        color={yColor}
        polygonOffset={usePolygonOffset && frontMostAxisIndex === 1 && p[1] < 0.75}
        {polygonOffsetFactor}
      />
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
        map={getSpriteTexture(textureSize, yColor)}
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
        map={getSpriteTexture(textureSize, zColor, 'Z')}
        opacity={p[2] >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.z={0.39}
      rotation.y={-Math.PI / 2}
      renderOrder={frontMostAxisIndex === 2 ? -1 : 0}
    >
      <T is={stemGeometry} />
      <T.MeshBasicMaterial
        transparent
        opacity={p[2] >= 0 ? 1 : 0.5}
        color={zColor}
        polygonOffset={usePolygonOffset && frontMostAxisIndex === 2 && p[2] < 0.75}
        {polygonOffsetFactor}
      />
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
        map={getSpriteTexture(textureSize, zColor)}
        opacity={p[2] >= 0 ? 0.5 : 1}
      />
    </T.Sprite>
  </T>
</HierarchicalObject>

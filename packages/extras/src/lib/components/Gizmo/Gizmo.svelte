<script lang="ts">
  import { HierarchicalObject, T, useFrame, useRender, useThrelte } from '@threlte/core'
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
    Vector4
  } from 'three'
  import type { GizmoEvents, GizmoProps, GizmoSlots } from './Gizmo'

  type $$Props = Required<GizmoProps>
  type $$Events = GizmoEvents
  type $$Slots = GizmoSlots

  export let turnRate: $$Props['turnRate'] = 2 * Math.PI
  export let center: $$Props['center'] = [0, 0, 0]
  export let verticalPlacement: $$Props['verticalPlacement'] = 'bottom'
  export let horizontalPlacement: $$Props['horizontalPlacement'] = 'right'
  export let size: $$Props['size'] = 128
  export let xColor: $$Props['xColor'] = 0xff3653
  export let yColor: $$Props['yColor'] = 0x8adb00
  export let zColor: $$Props['zColor'] = 0x2c8fff

  $: centerVec = new Vector3(...center)

  const { renderer, camera } = useThrelte()

  const orthoCam = new OrthographicCamera(-1.5, 1.5, 1.5, -1.5, 0, 4)
  orthoCam.position.set(0, 0, 2)

  let root: Scene

  // The scene is manually rendered such that the gizmo
  // can be rendered on top of the existing scene using
  // an orthographic camera. The gizmo itself is not in
  // the main scene.
  useRender(({ camera, renderer, scene }) => {
    renderer.render(scene, camera.current)

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
  })

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
      const intersection = intersects[0]
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

      animating = true

      return true
    } else {
      return false
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
  let point = new Vector3()
  // The rotation of the main camera, used to rotate the gizmo.
  let quaternion = new Quaternion()

  useFrame(({ camera }, delta) => {
    point = new Vector3(0, 0, 1).applyQuaternion(camera.current.quaternion)
    quaternion = new Quaternion().copy(camera.current.quaternion).invert()

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
    }
  })

  const getSpriteTexture = (color: number, text = '') => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    const context = canvas.getContext('2d')!
    context.beginPath()
    context.arc(32, 32, 16, 0, 2 * Math.PI)
    context.closePath()
    context.fillStyle = new Color(color).getStyle()
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
  <T.Scene
    bind:ref={root}
    quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
  >
    <!-- xAxis -->
    <T.Sprite
      bind:ref={posX}
      position.x={1}
      userData.targetPosition={[1, 0, 0]}
      userData.targetEuler={[0, Math.PI * 0.5, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(xColor, 'X') }]}
        opacity={point.x >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh position.x={0.4}>
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial>
        <T.Color
          attach="color"
          args={[xColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      bind:ref={negX}
      position.x={-1}
      scale={0.8}
      userData.targetPosition={[-1, 0, 0]}
      userData.targetEuler={[0, -Math.PI * 0.5, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(xColor) }]}
        opacity={point.x >= 0 ? 0.5 : 1}
      />
    </T.Sprite>

    <!-- yAxis -->
    <T.Sprite
      bind:ref={posY}
      position.y={1}
      userData.targetPosition={[0, 1, 0]}
      userData.targetEuler={[-Math.PI * 0.5, 0, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(yColor, 'Y') }]}
        opacity={point.y >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.y={0.4}
      rotation.z={Math.PI / 2}
    >
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial>
        <T.Color
          attach="color"
          args={[yColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      bind:ref={negY}
      position.y={-1}
      scale={0.8}
      userData.targetPosition={[0, -1, 0]}
      userData.targetEuler={[Math.PI * 0.5, 0, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(yColor) }]}
        opacity={point.y >= 0 ? 0.5 : 1}
      />
    </T.Sprite>

    <!-- zAxis -->
    <T.Sprite
      bind:ref={posZ}
      position.z={1}
      userData.targetPosition={[0, 0, 1]}
      userData.targetEuler={[0, 0, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(zColor, 'Z') }]}
        opacity={point.z >= 0 ? 1 : 0.5}
      />
    </T.Sprite>

    <T.Mesh
      position.z={0.4}
      rotation.y={-Math.PI / 2}
    >
      <T.BoxGeometry args={[0.8, 0.05, 0.05]} />
      <T.MeshBasicMaterial>
        <T.Color
          attach="color"
          args={[zColor]}
        />
      </T.MeshBasicMaterial>
    </T.Mesh>

    <T.Sprite
      bind:ref={negZ}
      position.z={-1}
      scale={0.8}
      userData.targetPosition={[0, 0, -1]}
      userData.targetEuler={[0, Math.PI, 0]}
    >
      <T.SpriteMaterial
        args={[{ map: getSpriteTexture(zColor) }]}
        opacity={point.z >= 0 ? 0.5 : 1}
      />
    </T.Sprite>
  </T.Scene>
</HierarchicalObject>

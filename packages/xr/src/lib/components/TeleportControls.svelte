<!--
@component

`<TeleportControls />` creates a teleportation experience similar to that on the Quest home environment.

@param handedness - Which hands to allow teleportation from.

@param maxDistance - The maximum radial teleporting distance from the user's current origin, in meters.

@event teleport - Fires after a teleport event.

```svelte
  <TeleportControls
    handedness={'left' | 'right'}
    maxDistance={10}
    on:teleport={(event) => {}} 
  >
    <T.Mesh teleportSurface>
      ...
    </T.Mesh>
  </TeleportControls>
```
-->

<script lang='ts'>
  import * as THREE from 'three'
  import { T, useFrame, createRawEventDispatcher } from '@threlte/core'
  import { activeTeleportController, pendingTeleportDestination } from '../internal/stores'
  import { useTeleport } from '../hooks/useTeleport'
  import { useController } from '../hooks/useController'
  import Ray from '../components/Ray.svelte'
  import { teleportPlugin } from '../plugins/teleportPlugin'

  /**
   * The raycaster used for teleportation.
   * @default new THREE.Raycaster()
   */
  export let raycaster = new THREE.Raycaster()

  /**
   * The controller handedness that the teleport controls is linked to.
   * @default 'right'
   */
  export let handedness: 'left' | 'right' = 'right'

  /**
   * The maximum radial teleporting distance from the user's current origin, in meters.
   * @default 20
   */
  export let maxDistance = 20

  type $$Events = {
    /** Fired after a teleportation occurs with the new location as the payload. */
    teleport: THREE.Vector3
  }

  const dispatch = createRawEventDispatcher<$$Events>()

  let destination: THREE.Vector3 | undefined
  let activeController: THREE.XRTargetRaySpace | undefined

  const teleport = useTeleport()
  const navMeshes: THREE.Mesh[] = []
  const controllerPosition = new THREE.Vector3()
  const matrix4 = new THREE.Matrix4()
  const rayMidpoint = new THREE.Vector3()
  const rayDivisions = 40
  const positions = new Float32Array(rayDivisions * 3)
  const curve = new THREE.QuadraticBezierCurve3()
  const curvePoint = new THREE.Vector3()

  $: raycaster.far = maxDistance
  $: teleportController = useController(handedness)
  $: teleportGamepad = teleportController.current?.inputSource.gamepad

  const calculateRayMidpoint = (vector1: THREE.Vector3, vector2: THREE.Vector3) => {
    rayMidpoint.x = (vector1.x + vector2.x) / 2;
    rayMidpoint.y = (vector1.y + vector2.y) / 2;
    rayMidpoint.z = (vector1.z + vector2.z) / 2;
  }

  const { start, stop } = useFrame(() => {
    matrix4.identity().extractRotation(activeController!.matrixWorld)
    raycaster.ray.origin.setFromMatrixPosition(activeController!.matrixWorld)
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(matrix4)

    const [intersect] = raycaster.intersectObjects(navMeshes, true)

    if (intersect === undefined) {
      destination = undefined
      $pendingTeleportDestination = undefined
      return
    }

    destination = intersect.point
    $pendingTeleportDestination = destination

    activeController!.getWorldPosition(controllerPosition)

    calculateRayMidpoint(controllerPosition, destination)

    // Create an arc
    rayMidpoint.y += 0.8

    curve.v0.copy(controllerPosition)
    curve.v1.copy(rayMidpoint)
    curve.v2.copy(intersect.point)

    for (let i = 0, j = 0; i < rayDivisions; i += 1, j += 3) {
      const t = i / rayDivisions;
      curve.getPoint(t, curvePoint)
      positions[j + 0] = curvePoint.x
      positions[j + 1] = curvePoint.y
      positions[j + 2] = curvePoint.z
    }

  }, { autostart: false })

  const handleSelectStart = (controller: THREE.XRTargetRaySpace) => {
    activeController = controller
    $activeTeleportController = controller

    start()
  }

  const handleSelectEnd = () => {
    stop()

    activeController = undefined
    $activeTeleportController = undefined

    if (destination !== undefined) {
      teleport(destination)
      dispatch('teleport', destination)
    }
  }

  useFrame(() => {
    const selecting = (teleportGamepad?.axes[3] ?? 0) < -0.9

    if (selecting && activeController === undefined) {
      handleSelectStart(teleportController.current!.targetRay)
    } else if (!selecting && activeController !== undefined) {
      handleSelectEnd()
    }
  })

  teleportPlugin(navMeshes)
</script>

<slot />

<slot name='ray'>
  <Ray
    visible={activeController !== undefined && destination !== undefined}
    positions={activeController !== undefined && destination !== undefined ? positions : undefined}
  />
</slot>

<slot name='cursor'>
  <T.Mesh
    visible={activeController !== undefined && destination !== undefined}
    position.x={destination?.x}
    position.y={destination?.y}
    position.z={destination?.z}
  >
    {@const innerRadius = 0.175}
    {@const outerRadius = 0.2}
    {@const thetaSegments = 32}
    <T.RingGeometry
      args={[innerRadius, outerRadius, thetaSegments]}
      on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
    />
    <T.MeshBasicMaterial
      polygonOffset
      polygonOffsetFactor={-1}
    />
  </T.Mesh>
</slot>

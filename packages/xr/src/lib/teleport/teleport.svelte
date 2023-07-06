

<script lang='ts'>

import * as THREE from 'three'
import { onMount, afterUpdate } from 'svelte'
import { T, useFrame, createRawEventDispatcher } from '@threlte/core'
import { activeTeleportController, pendingTeleportDestination } from '$lib/stores'
import { useTeleport, useXrController, useXrGamepad } from '$lib/hooks'
import Ray from '$lib/ray.svelte'
import Marker from './marker.svelte'

// export let intersects: THREE.Object3D[] = []

/**
 * The raycaster used for teleportation.
 */
export let raycaster = new THREE.Raycaster()

/**
 * The controller handedness that the teleport controls can originate from.
 * @default right
 */
export let handedness: 'left' | 'right' = 'right'

/**
 * The maximum teleporting distance from the user's current origin, in meters.
 * @default 20
 */
export let maxDistance = 20

type $$Events = {
  teleport: THREE.Vector3
}

const dispatch = createRawEventDispatcher<$$Events>()

let navmeshParent: THREE.Group
let navMeshes: THREE.Object3D[] = []
let destination: THREE.Vector3 | undefined
let activeController: THREE.XRTargetRaySpace | undefined

const teleport = useTeleport()
const controllerPosition = new THREE.Vector3()
const matrix4 = new THREE.Matrix4()
const rayMidpoint = new THREE.Vector3()
const rayDivisions = 40
const positions = new Float32Array(rayDivisions * 3)
const curve = new THREE.QuadraticBezierCurve3()
const curvePoint = new THREE.Vector3()

$: raycaster.far = maxDistance
$: teleportController = useXrController(handedness)
$: teleportGamepad = useXrGamepad(handedness)

const calculateRayMidpoint = (vector1: THREE.Vector3, vector2: THREE.Vector3) => {
  rayMidpoint.x = (vector1.x + vector2.x) / 2;
  rayMidpoint.y = (vector1.y + vector2.y) / 2;
  rayMidpoint.z = (vector1.z + vector2.z) / 2;
}

const { start, stop } = useFrame(() => {
  if (activeController === undefined) return

  matrix4.identity().extractRotation(activeController.matrixWorld)
  raycaster.ray.origin.setFromMatrixPosition(activeController.matrixWorld)
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(matrix4)

  const [intersect] = raycaster.intersectObjects(navMeshes)

  if (intersect === undefined) {
    destination = undefined
    $pendingTeleportDestination = undefined
    return
  }

  destination = intersect.point
  $pendingTeleportDestination = destination

  activeController.getWorldPosition(controllerPosition)

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
  const selecting = (teleportGamepad.current?.axes[3] ?? 0) < -0.9

  if (selecting && activeController === undefined) {
    handleSelectStart(teleportController.current!.controller)
  } else if (!selecting && activeController !== undefined) {
    handleSelectEnd()
  }
})

afterUpdate(() => {
  navMeshes = navmeshParent.children
})

onMount(() => {
  navMeshes = navmeshParent.children
})

</script>

<!--
@component

`<TeleportControls />` creates a teleportation experience similar to that on the Quest home environment.

@param handedness - Which hands to allow teleportation from.

@param maxDistance - The maximum radial teleportation distance in meters.

@event teleport - Fires after a teleport event.

```svelte
  <TeleportControls
    handedness={'left' | 'right'}
    maxDistance={10}
    on:teleport={(event) => {}} 
  />
```
-->

<T.Group bind:ref={navmeshParent}>
  <slot />
</T.Group>

<Ray
  visible={activeController !== undefined && destination !== undefined}
  {positions}
/>

<Marker
  visible={activeController !== undefined && destination !== undefined}
  position.x={destination?.x}
  position.y={destination?.y}
  position.z={destination?.z}
/>

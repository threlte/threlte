<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { VirtualEnvironment } from '@threlte/extras'
  import { XR, Controller, Hand, pointerControls } from '@threlte/xr'
  import { type Group, Vector3 } from 'three'
  import Spaceship from './models/spaceship.svelte'
  import Stars from './Stars.svelte'

  pointerControls('left')
  pointerControls('right')

  const scale = 0.02
  // Toy hovering at eye level, ~30 cm ahead of the user.
  const home = new Vector3(0, 1.4, -0.3)

  let intersectionPoint: Vector3 | undefined
  let translAccelleration = 0
  let angleAccelleration = 0

  let spaceShipRef = $state<Group>()
  let translY = $state(0)
  let angleZ = $state(0)

  const up = new Vector3(0, 1, 0)
  const dir = new Vector3()
  const pivot = new Vector3()

  useTask(() => {
    if (intersectionPoint === undefined) return

    const targetY = intersectionPoint.y - home.y
    translAccelleration += (targetY - translY) * 0.01
    translAccelleration *= 0.92
    translY += translAccelleration

    pivot.set(home.x, home.y + translY, home.z)
    dir.copy(intersectionPoint).sub(pivot).normalize()
    const dirCos = dir.dot(up)
    const angle = Math.acos(dirCos) - Math.PI * 0.5
    angleAccelleration += (angle - angleZ) * 0.02
    angleAccelleration *= 0.9
    angleZ += angleAccelleration
  })
</script>

<XR />

<Controller left />
<Controller right />
<Hand left />
<Hand right />

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.5, 0.3]}
  fov={50}
  oncreate={(ref) => {
    ref.lookAt(home)
  }}
/>

<T.DirectionalLight
  intensity={1.8}
  position={[0, 2, 0.5]}
  castShadow
  shadow.bias={-0.0001}
/>

<!-- Invisible ray-target plane. Controller and hand rays drive the
     spaceship's motion via event.point. -->
<T.Mesh
  position.x={home.x}
  position.y={home.y}
  position.z={home.z}
  visible={false}
  onpointermove={(event) => {
    intersectionPoint = event.point
  }}
>
  <T.PlaneGeometry args={[2, 2]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<Spaceship
  bind:ref={spaceShipRef}
  {scale}
  position={[home.x, home.y + translY, home.z]}
  rotation={[angleZ, 0, angleZ, 'ZXY']}
/>

<!-- Stars are both visible in the main scene and captured into the cube
     map that lights the spaceship's reflections. -->
<VirtualEnvironment visible>
  <Stars />
</VirtualEnvironment>

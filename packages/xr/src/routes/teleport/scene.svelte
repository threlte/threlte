<script lang='ts'>

import * as THREE from 'three'
import { T, useThrelte } from '@threlte/core'
import { XR, TeleportControls, Controllers, Hands, useTeleport } from '$lib'
import colorOptions from 'nice-color-palettes/100.json'

const { camera, renderer } = useThrelte()
const teleport = useTeleport()

renderer.setClearColor(0x000000)

camera.current.position.z = 1.75
camera.current.lookAt(0, 1.75, 1)

teleport(new THREE.Vector3(0.5, 0, 0.5))

const pointOnCircle = (radius: number, theta: number) => {
  const x = radius * Math.cos(theta)
  const y = radius * Math.sin(theta)

  return { x, y }
}

const randomColor = () => {
  const colors = colorOptions[Math.trunc(Math.random() * colorOptions.length)]!
  return colors[Math.trunc(Math.random() * colors.length)]
}

const cylinders = Array.from({ length: 14 }).map((_, index) => {
  return {
    point: pointOnCircle(5, index / 2),
    color: randomColor(),
  }
})

</script>

<XR>
  <Controllers />
  <Hands />
</XR>

<TeleportControls handedness='left'>
  <T.Mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
    <T.CircleGeometry args={[20]} />
    <T.MeshStandardMaterial color={randomColor()} />
  </T.Mesh>

  {#each cylinders as { point, color }, index}
    <T.Mesh
      position={[point.x, index / 2, point.y]}
      castShadow
      receiveShadow
    >
      <T.CylinderGeometry args={[1, 1, 0.1]} />
      <T.MeshStandardMaterial {color} />
    </T.Mesh>
  {/each}
</TeleportControls>

<T.AmbientLight />

<T.DirectionalLight
  position={[5, 5, 1]}
  castShadow
  shadow.camera.top={50}
  shadow.camera.right={50}
  shadow.camera.left={-50}
  shadow.camera.bottom={-50}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/>

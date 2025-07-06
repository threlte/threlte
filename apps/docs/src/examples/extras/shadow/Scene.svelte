<script lang="ts">
  import { Mesh } from 'three'
  import { OrbitControls, Shadow } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  const plane = new Mesh()

  const sphere = new Mesh()

  const radius = 1

  const diameter = 2 * radius
  const planeScale = 2 * diameter
  plane.scale.x = planeScale
  plane.scale.y = planeScale

  let time = 0
  let scale = $state(1)

  useTask((dt) => {
    time += dt
    const s = Math.sin(time)
    sphere.position.y = 2.5 + s
    scale = 3 + s
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={5}
  position.y={5}
  position.z={5}
  oncreate={(ref) => {
    ref.lookAt(plane.position)
  }}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T is={sphere}>
  <T.IcosahedronGeometry args={[radius, 2]} />
  <T.MeshBasicMaterial
    color="orangered"
    wireframe
  />
</T>

<T.Group rotation.x={-1 * 0.5 * Math.PI}>
  <T is={plane}>
    <T.PlaneGeometry />
  </T>
  <Shadow
    {scale}
    position.z={0.1}
  />
</T.Group>

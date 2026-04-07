<script lang="ts">
  import { Mesh } from 'three'
  import { OrbitControls, ShadowMaterial } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  let { color = '#000000' } = $props()

  const plane = new Mesh()

  const sphere = new Mesh()

  const radius = 1

  const diameter = 2 * radius
  const planeScale = 2 * diameter
  plane.scale.x = planeScale
  plane.scale.y = planeScale

  let time = 0

  const shadowMesh = new Mesh()

  useTask((dt) => {
    time += dt
    const s = Math.sin(time)
    sphere.position.y = 2.5 + s
    shadowMesh.scale.setScalar(3 + s)
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
  <T
    is={shadowMesh}
    position.z={0.01}
  >
    <T.PlaneGeometry />
    <ShadowMaterial {color} />
  </T>
</T.Group>

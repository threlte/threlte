<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls, Sky, useFBO, useGltf } from '@threlte/extras'
  import {
    CameraHelper,
    Group,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry
  } from 'three'

  const gltf = useGltf('/models/Duck.glb')

  const { renderer, scene } = useThrelte()
  const fbo = useFBO({
    size: {
      width: 1024,
      height: 2048
    }
  })

  const group = new Group()

  const cameraMeshHeight = 1
  const cameraRotationRadius = 5

  // create the plane and other camera in the script tag so that we don't have to bind to the ref and worry about `undefined` cases
  const rotatingCamera = new PerspectiveCamera(40, 1, 2, 8)
  const helper = new CameraHelper(rotatingCamera)

  const planeMesh = new Mesh(new PlaneGeometry(), new MeshStandardMaterial({ map: fbo.texture }))
  planeMesh.position.setZ(-1 * (cameraMeshHeight + cameraRotationRadius))
  planeMesh.scale.setScalar(10)

  let time = 0
  useTask((delta) => {
    time += delta * 0.2
    const c = Math.cos(time)
    const s = Math.sin(time)
    rotatingCamera.position.set(cameraRotationRadius * c, 2 * c * s, cameraRotationRadius * s)
    rotatingCamera.lookAt(group.position)

    planeMesh.visible = false
    helper.visible = false
    const lastRenderTarget = renderer.getRenderTarget()

    renderer.setRenderTarget(fbo)
    renderer.render(scene, rotatingCamera)

    helper.visible = true
    planeMesh.visible = true
    renderer.setRenderTarget(lastRenderTarget)
  })
</script>

<T.PerspectiveCamera
  position.x={5}
  position.y={5}
  position.z={10}
  makeDefault
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight />

<Sky />

<T
  is={rotatingCamera}
  manual
/>
<T
  is={helper}
  attach={scene}
/>

<T is={planeMesh} />

<T is={group}>
  <T.Group position.y={-1}>
    {#await gltf then { scene }}
      <T is={scene} />
    {/await}
  </T.Group>
</T>

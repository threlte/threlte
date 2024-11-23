<script lang="ts">
  import { OrbitControls, Sky, useGltf } from '@threlte/extras'
  import { Group, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { useFBO } from '@threlte/extras'

  let { useRotatingCamera }: { useRotatingCamera: boolean } = $props()

  const useControlsCamera = $derived(!useRotatingCamera)

  const gltf = useGltf('/models/Duck.glb')

  const { renderer, scene } = useThrelte()
  const fbo = useFBO()

  const group = new Group()

  const cameraMeshHeight = 1
  const cameraRotationRadius = 5

  // create the plane and other camera in the script tag so that we don't have to bind to the ref and worry about `undefined` cases
  const rotatingCamera = new PerspectiveCamera()

  const planeMesh = new Mesh(new PlaneGeometry(), new MeshStandardMaterial({ map: fbo.texture }))
  planeMesh.position.setZ(-1 * (cameraMeshHeight + cameraRotationRadius))
  planeMesh.scale.setScalar(10)

  let time = 0
  useTask((delta) => {
    time += delta
    const c = Math.cos(time)
    const s = Math.sin(time)
    rotatingCamera.position.set(cameraRotationRadius * c, 2 * c * s, cameraRotationRadius * s)
    rotatingCamera.lookAt(group.position)

    const lastVisible = planeMesh.visible
    planeMesh.visible = false
    const lastRenderTarget = renderer.getRenderTarget()

    renderer.setRenderTarget(fbo)
    renderer.render(scene, rotatingCamera)

    planeMesh.visible = lastVisible
    renderer.setRenderTarget(lastRenderTarget)
  })
</script>

<T.PerspectiveCamera
  position.x={5}
  position.y={5}
  position.z={10}
  makeDefault={useControlsCamera}
>
  <OrbitControls enabled={useControlsCamera} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />

<Sky />

<T
  is={rotatingCamera}
  makeDefault={useRotatingCamera}
>
  <T.Mesh rotation.x={0.5 * Math.PI}>
    <T.CylinderGeometry
      args={[0.25 * cameraMeshHeight, 0.5 * cameraMeshHeight, cameraMeshHeight]}
    />
    <T.MeshStandardMaterial color="orangered" />
  </T.Mesh>
</T>

<T is={planeMesh} />

<T is={group}>
  {#await gltf then { scene }}
    <T is={scene} />
  {/await}
</T>

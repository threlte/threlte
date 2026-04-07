<script lang="ts">
  import {
    DirectionalLight,
    Mesh,
    MeshNormalMaterial,
    PerspectiveCamera,
    Plane,
    TorusKnotGeometry,
    Vector3,
    Vector4
  } from 'three'
  import { ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh.js'
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'

  const planeY = 0
  const planeOffset = 0.01
  const planeConstant = planeY + planeOffset
  const yHat = new Vector3(0, 1, 0)
  const plane = new Plane(yHat, planeConstant)

  let { w = 0.01 } = $props()

  const mesh = new Mesh(new TorusKnotGeometry(), new MeshNormalMaterial())
  mesh.translateY(2)

  const translationAxis = new Vector3()

  // only used to create a DirectionalLightHelper
  // notice that it's not added to the scene at the bottom but the shadow is still visible
  const light = new DirectionalLight()
  light.translateOnAxis(translationAxis.set(1, 1, -1).normalize(), 5)
  const lightPosition4D = new Vector4(...light.position)

  $effect(() => {
    lightPosition4D.w = w
  })

  const shadowMesh = new ShadowMesh(mesh)

  const floor = new Mesh()
  const floorSize = 15
  floor.lookAt(plane.normal)

  const camera = new PerspectiveCamera()
  camera.translateOnAxis(translationAxis.set(1, 1, 1).normalize(), 20)
  camera.lookAt(floor.position)

  useTask((dt) => {
    mesh.rotateY(dt)
    shadowMesh.update(plane, lightPosition4D)
  })
</script>

<T
  is={camera}
  makeDefault
>
  <OrbitControls
    enableDamping
    maxPolarAngle={(2 / 5) * Math.PI}
  />
</T>

<T is={floor}>
  <T.PlaneGeometry args={[floorSize, floorSize]} />
  <T.MeshBasicMaterial color="#ccccaa" />
</T>

<T is={mesh} />

<T is={shadowMesh} />

<T
  is={light}
  attach={false}
  target={mesh}
/>

<T.DirectionalLightHelper args={[light]} />

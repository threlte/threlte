<script lang="ts">
  import type { Mesh } from 'three'
  import { OrbitControls, Sky, useFBO } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'

  const { camera, renderer, scene } = useThrelte()

  const renderTarget = useFBO({})

  let fboPreviewMesh: Mesh

  let knotRotation = 0

  useTask((delta) => {
    knotRotation += delta

    // save state before updating
    const previewMeshVisible = fboPreviewMesh.visible
    const lastRenderTarget = renderer.getRenderTarget()

    // update state
    renderer.setRenderTarget(renderTarget)
    fboPreviewMesh.visible = false

    renderer.render(scene, camera.current)

    // restore previous state
    fboPreviewMesh.visible = previewMeshVisible
    renderer.setRenderTarget(lastRenderTarget)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 1, 5]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<T.Mesh
  rotation.x={knotRotation}
  rotation.z={knotRotation}
>
  <T.TorusKnotGeometry />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.Mesh
  position.z={-5}
  bind:ref={fboPreviewMesh}
  scale={5}
>
  <T.PlaneGeometry />
  <T.MeshStandardMaterial
    map={renderTarget.texture}
    color="#CCFFCC"
  />
</T.Mesh>

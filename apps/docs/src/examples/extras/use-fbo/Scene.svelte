<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'

  import { interactivity, OrbitControls, Sky, useFBO } from '@threlte/extras'

  import { Mesh, PerspectiveCamera, Vector2 } from 'three'

  interactivity()

  const { camera, renderer, scene, size } = useThrelte()

  // render scene at a lower resolution
  const renderTarget = useFBO($size.width * 0.5, $size.height * 0.5, {
    samples: 4
  })

  // change aspect ratio of the texture because we are putting it on a circle so w and h are the same
  const aspect = new Vector2($size.height / $size.width, 1).normalize()
  renderTarget.texture.repeat.set(aspect.x, aspect.y)
  renderTarget.texture.offset.x = -0.5 * (aspect.x - 1)
  renderTarget.texture.offset.y = -0.5 * (aspect.y - 1)

  let fboPreviewMesh: Mesh

  let knotRotation = 0

  useTask((delta) => {
    knotRotation += delta
    if (!fboPreviewMesh) return
    const cam = $camera as PerspectiveCamera

    fboPreviewMesh.visible = false
    renderer.setRenderTarget(renderTarget)
    renderer.render(scene, cam)

    fboPreviewMesh.visible = true
    renderer.setRenderTarget(null)
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
  position.x={-0.1}
  bind:ref={fboPreviewMesh}
>
  <T.PlaneGeometry args={[5, 5]} />
  <T.MeshBasicMaterial
    map={renderTarget.texture}
    color="#CCFFCC"
  />
</T.Mesh>

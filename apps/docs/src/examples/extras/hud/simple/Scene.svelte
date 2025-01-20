<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Float, OrbitControls, HUD } from '@threlte/extras'
  import { Quaternion } from 'three'
  import HudScene from './HudScene.svelte'

  let selected = $state('box')
  let rotation = $state(0)

  const quaternion = new Quaternion()
  const { camera } = useThrelte()

  useTask(
    (delta) => {
      rotation += delta

      // Spin mesh to the inverse of the default cameras matrix
      quaternion.copy(camera.current.quaternion).invert()
    },
    { autoInvalidate: false }
  )
</script>

<T.PerspectiveCamera
  position={[11, 5, 11]}
  makeDefault
  fov={30}
>
  <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.AmbientLight intensity={0.6} />

<T.GridHelper args={[5]} />

<HUD>
  <HudScene
    {quaternion}
    onselect={(arg) => {
      selected = arg
    }}
  />
</HUD>

<Float
  speed={8}
  rotation.y={rotation}
>
  {#if selected === 'box'}
    <T.Mesh
      position.y={0.8}
      scale={2}
    >
      <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
      <T.MeshToonMaterial color="turquoise" />
    </T.Mesh>
  {:else if selected === 'torus'}
    <T.Mesh
      position.y={0.8}
      scale={1.8}
    >
      <T.TorusGeometry args={[0.25, 0.1]} />
      <T.MeshToonMaterial color="turquoise" />
    </T.Mesh>
  {:else if selected === 'torusknot'}
    <T.Mesh
      position.y={0.8}
      scale={1.8}
    >
      <T.TorusKnotGeometry args={[0.215, 0.08, 256]} />
      <T.MeshToonMaterial color="turquoise" />
    </T.Mesh>
  {/if}
</Float>

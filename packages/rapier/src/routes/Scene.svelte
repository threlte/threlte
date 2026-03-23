<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { RigidBody, AutoColliders, useRapier } from '$lib/index.js'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const { renderer } = useThrelte()
  const { resume, pause, paused } = useRapier()

  let { sleeping }: { sleeping: (context: WebGLRenderingContext) => void } = $props()

  let sleepingObjects = $state(0)

  $effect(() => {
    if (sleepingObjects === 2) {
      sleeping(renderer.getContext())
    }
  })
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'p') {
      if ($paused) {
        resume()
        window.requestAnimationFrame(() => {
          pause()
        })
      } else {
        pause()
      }
    }
  }}
/>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
/>

<T.Group position={[0, 0, -0.2]}>
  <RigidBody
    type="dynamic"
    linearDamping={1}
    angularDamping={1}
    onsleep={() => sleepingObjects++}
  >
    <AutoColliders>
      <T.Mesh
        castShadow
        receiveShadow
      >
        <T.MeshStandardMaterial color="hotpink" />
        <T.BoxGeometry />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<T.Group
  position={[0, 2, 0.3]}
  rotation.y={20 * DEG2RAD}
>
  <RigidBody
    type="dynamic"
    linearDamping={1}
    angularDamping={1}
    onsleep={() => sleepingObjects++}
  >
    <AutoColliders>
      <T.Mesh
        castShadow
        receiveShadow
      >
        <T.MeshStandardMaterial color="hotpink" />
        <T.BoxGeometry />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<AutoColliders shape="cuboid">
  <T.Mesh
    receiveShadow
    position.y={-1}
  >
    <T.MeshStandardMaterial color="turquoise" />
    <T.BoxGeometry args={[4, 0.1, 4]} />
  </T.Mesh>
</AutoColliders>

<T.AmbientLight />
<T.DirectionalLight
  position={[4, 10, 0]}
  castShadow
  shadow.mapSize={1024}
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={10}
  shadow.camera.bottom={-10}
/>

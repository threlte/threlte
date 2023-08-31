<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import { XR, VRButton, Controllers, Hands } from '$lib'
</script>

<main>
  <Canvas>
    <XR>
      <Controllers />
      <Hands />
    </XR>

    <T.PerspectiveCamera
      makeDefault
      position={[3, 3, 3]}
      on:create={({ ref }) => ref.lookAt(0, 0, 0)}
    />

    <T.Mesh position.y={0.5} castShadow receiveShadow>
      <T.MeshStandardMaterial color="hotpink" />
      <T.BoxGeometry />
    </T.Mesh>

    <T.Mesh receiveShadow>
      <T.CylinderGeometry args={[2, 2, 0.1]} />
      <T.MeshStandardMaterial />
    </T.Mesh>

    <T.DirectionalLight castShadow />
    <T.AmbientLight />
  </Canvas>

  <VRButton />
</main>

<style>
  main {
    height: 100dvh;
  }
</style>

<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import { XR, VRButton } from '$lib'
</script>

<main>
  <Canvas>
    <XR />

    <T.PerspectiveCamera
      makeDefault
      position={[3, 3, 3]}
      on:create={({ ref }) => ref.lookAt(0, 0, 0)}
    />
    <T.Mesh>
      <T.MeshStandardMaterial color="hotpink" />
      <T.BoxGeometry />
    </T.Mesh>
    <T.DirectionalLight />
    <T.AmbientLight />
  </Canvas>

  <VRButton />
</main>

<style>
  main {
    height: 100vh;
  }
</style>

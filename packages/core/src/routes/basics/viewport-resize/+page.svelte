<script lang="ts">
  import { T, Canvas } from '$lib'
</script>

<div id="parent">
  <Canvas>
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
</div>

<style>
  div {
    width: 100vw;
    height: 100vh;
  }
</style>

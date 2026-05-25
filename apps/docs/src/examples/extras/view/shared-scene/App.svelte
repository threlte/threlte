<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Scene from './Scene.svelte'

  let minimap = $state.raw<HTMLDivElement>()
</script>

<div id="container">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[1.6, 1.6, 3.6]}
      fov={50}
      oncreate={(ref) => ref.lookAt(0, 0, 0)}
    />

    <Scene {minimap} />

    <OrbitControls />
  </Canvas>

  <div
    bind:this={minimap}
    id="minimap"
  ></div>
</div>

<style>
  div#container {
    position: relative;
    height: 100%;
  }

  div#minimap {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 25%;
    aspect-ratio: 1;
    z-index: 1;
    border: 1px solid #333;
  }
</style>

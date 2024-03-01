<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Controls from './Controls.svelte'
  import Scene from './scene/Scene.svelte'

  import { baseFov } from './Controls.svelte'
  import LensView from './LensView.svelte'
  import Scope from './scene/Scope.svelte'
</script>

<div>
  <ul>
    <li>Press <b>S</b> to toggle scope mode.</li>
    <li><b>Mousewheel</b> or <b>A/D</b> to adjust zoom level.</li>
  </ul>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[0, 1.5, 20]}
      fov={baseFov}
    >
      <Scope let:ref>
        <LensView scope={ref} />
      </Scope>
    </T.PerspectiveCamera>
    <Controls />
    <Scene />
  </Canvas>
</div>

<style>
  ul {
    position: absolute;
    top: 0;
    left: 0;
  }
  div {
    height: 100%;
  }
</style>

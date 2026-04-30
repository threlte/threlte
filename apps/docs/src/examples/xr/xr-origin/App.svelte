<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
</script>

<div class="example">
  <div class="hud">
    Best tested in VR: walk around your playspace, then click a colored pad. The cyan feet marker
    should land in the middle of the selected pad.
  </div>

  <Canvas>
    <Scene />
  </Canvas>

  <VRButton />
</div>

<style>
  .example {
    position: relative;
    height: 100%;
  }

  .hud {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1;
    max-width: 22rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 0.75rem;
    background: rgb(10 12 16 / 0.78);
    color: rgb(229 231 235);
    font-size: 0.875rem;
    line-height: 1.4;
    backdrop-filter: blur(10px);
  }
</style>

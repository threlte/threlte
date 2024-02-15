<script lang="ts">
  import { Canvas, extend } from '@threlte/core'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import Scene from './Scene.svelte'

  extend({
    OrbitControls
  })
</script>

<div class="relative h-full w-full">
  <Canvas>
    <Scene />
  </Canvas>

  <div
    class=" absolute left-0 top-0 h-full w-full [&>*]:pointer-events-none"
    id="int-target"
  >
    <div class="relative left-6 top-6">
      <div class="text-orange text-sm font-bold uppercase">Custom Event Target</div>
      <div class="text-orange text-3xl font-bold">Event Handling on Foreground Element</div>
    </div>
  </div>
</div>

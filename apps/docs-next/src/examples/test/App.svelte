<script lang="ts">
  import { Canvas, extend } from '@threlte/core'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import Scene from './Scene.svelte'

  extend({
    OrbitControls
  })
</script>

<div class="w-full h-full relative">
  <Canvas>
    <Scene />
  </Canvas>

  <div
    class="bg-red-500/20 absolute top-0 left-0 w-full h-full [&>*]:pointer-events-none"
    id="int-target"
  >
    <div class="relative top-6 left-6">
      <div class="text-sm text-orange uppercase">Custom Event Target</div>
      <div class="text-3xl font-bold text-orange">Event Handling on Foreground Element</div>
    </div>
  </div>
</div>

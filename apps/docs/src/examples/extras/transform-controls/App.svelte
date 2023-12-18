<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, List, ThemeUtils } from 'svelte-tweakpane-ui'
  let controls: 'trackball' | 'orbit' = 'orbit'
</script>

<Pane
  theme={ThemeUtils.presets.standard}
  position="fixed"
  title="TransformControls"
>
  <List
    label="Camera Controls"
    bind:value={controls}
    options={{
      trackball: 'trackball',
      orbit: 'orbit'
    }}
  />
</Pane>

<div class="relative h-full w-full bg-blue-900">
  <Canvas>
    <Scene {controls} />
  </Canvas>
</div>

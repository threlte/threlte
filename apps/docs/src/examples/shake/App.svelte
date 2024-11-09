<script lang="ts">
  import Scene from './Scene.svelte'
  import ParametersFolder from './ParametersFolder.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui'

  let useShakeyCamera = $state(true)
  let pitchFrequency = $state(0.1)
  let pitchIntensity = $state(0.1)
  let rollFrequency = $state(0.1)
  let rollIntensity = $state(0.1)
  let yawFrequency = $state(0.1)
  let yawIntensity = $state(0.1)
</script>

<div>
  <Pane
    position="fixed"
    title="shake"
  >
    <Checkbox
      bind:value={useShakeyCamera}
      label="use shakey camera"
    />
    <ParametersFolder
      axis="pitch"
      bind:frequency={pitchFrequency}
      bind:intensity={pitchIntensity}
    />
    <ParametersFolder
      axis="roll"
      bind:frequency={rollFrequency}
      bind:intensity={rollIntensity}
    />
    <ParametersFolder
      axis="yaw"
      bind:frequency={yawFrequency}
      bind:intensity={yawIntensity}
    />
  </Pane>
  <Canvas>
    <Scene
      {pitchFrequency}
      {pitchIntensity}
      {rollFrequency}
      {rollIntensity}
      {useShakeyCamera}
      {yawFrequency}
      {yawIntensity}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

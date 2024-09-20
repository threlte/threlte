<script lang="ts">
  import { Checkbox, Pane, ThemeUtils, Slider } from 'svelte-tweakpane-ui'

  export let staticMoving: boolean
  export let noRotate: boolean
  export let rotateSpeed: number
  export let noZoom: boolean
  export let zoomSpeed: number
  export let noPan: boolean
  export let panSpeed: number
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="TrackballControls"
>
  <Checkbox
    bind:value={staticMoving}
    label="staticMoving"
  />
  <Checkbox
    bind:value={noRotate}
    label="noRotate"
  />
  <Checkbox
    bind:value={noPan}
    label="noPan"
  />
  <Checkbox
    bind:value={noZoom}
    label="noZoom"
  />

  <Slider
    label="rotateSpeed"
    bind:value={rotateSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="panSpeed"
    bind:value={panSpeed}
    min={0.05}
    max={1.0}
    step={0.05}
  />
  <Slider
    label="zoomSpeed"
    bind:value={zoomSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
</Pane>

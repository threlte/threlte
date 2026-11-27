<script lang="ts">
  import { Checkbox, Pane, ThemeUtils, Slider } from 'svelte-tweakpane-ui'

  interface Props {
    autoRotate: boolean
    autoRotateSpeed: number
    enableDamping: boolean
    rotateSpeed: number
    zoomToCursor: boolean
    zoomSpeed: number
    minPolarAngle: number
    maxPolarAngle: number
    enableZoom: boolean
  }

  let {
    autoRotate = $bindable(),
    autoRotateSpeed = $bindable(),
    enableDamping = $bindable(),
    rotateSpeed = $bindable(),
    zoomToCursor = $bindable(),
    zoomSpeed = $bindable(),
    minPolarAngle = $bindable(),
    maxPolarAngle = $bindable(),
    enableZoom = $bindable()
  }: Props = $props()
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="OrbitControls"
>
  <Checkbox
    bind:value={autoRotate}
    label="autoRotate"
  />
  <Slider
    label="autoRotateSpeed"
    bind:value={autoRotateSpeed}
    min={0}
    max={5}
    step={0.1}
  />
  <Checkbox
    bind:value={enableDamping}
    label="enableDamping"
  />
  <Checkbox
    bind:value={enableZoom}
    label="enableZoom"
  />
  <Checkbox
    bind:value={zoomToCursor}
    label="zoomToCursor"
  />
  <Slider
    label="rotateSpeed"
    bind:value={rotateSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="zoomSpeed"
    bind:value={zoomSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="minPolarAngle"
    bind:value={minPolarAngle}
    min={0}
    max={Math.PI}
    step={0.1}
  />
  <Slider
    label="maxPolarAngle"
    bind:value={maxPolarAngle}
    min={0}
    max={Math.PI}
    step={0.1}
  />
</Pane>

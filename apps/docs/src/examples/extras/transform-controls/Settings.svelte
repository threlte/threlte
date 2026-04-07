<script lang="ts">
  import { Pane, List, Checkbox, ThemeUtils } from 'svelte-tweakpane-ui'

  interface Props {
    controls?: '<OrbitControls>' | '<TrackballControls>' | '<CameraControls>'
    autoPauseControls?: boolean
  }

  let { controls = $bindable('<OrbitControls>'), autoPauseControls = $bindable(true) }: Props =
    $props()
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="TransformControls"
>
  <List
    label="Camera Controls"
    bind:value={controls}
    options={{
      '<OrbitControls>': '<OrbitControls>',
      '<TrackballControls>': '<TrackballControls>',
      '<CameraControls>': '<CameraControls>'
    }}
  />
  <Checkbox
    label="autoPauseControls"
    bind:value={autoPauseControls}
  />
</Pane>

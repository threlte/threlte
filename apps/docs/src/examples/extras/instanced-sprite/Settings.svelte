<script lang="ts">
  import { Checkbox, Pane, Slider, ThemeUtils } from 'svelte-tweakpane-ui'

  interface Props {
    billboarding: boolean
    fps: number
  }

  let { billboarding = $bindable(), fps = $bindable() }: Props = $props()
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="InstancedSprite"
>
  <Checkbox
    bind:value={billboarding}
    label="billboarding"
  />

  <Slider
    label="fps"
    min={1}
    max={30}
    step={1}
    bind:value={fps}
  />
</Pane>

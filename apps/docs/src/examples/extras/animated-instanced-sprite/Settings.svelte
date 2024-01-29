<script lang="ts">
  import { Checkbox, Pane, ThemeUtils, Slider } from 'svelte-tweakpane-ui'

  export let billboarding: boolean
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="AnimatedInstancedSprite"
>
  <Checkbox
    bind:value={billboarding}
    label="billboarding"
  />
</Pane>

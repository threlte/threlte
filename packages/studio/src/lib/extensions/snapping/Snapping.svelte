<script lang="ts">
  import { Slider } from 'svelte-tweakpane-ui'
  import DropDownPane from '../../components/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { snappingScope, type SnappingActions, type SnappingState } from './types.js'
  import type { Snippet } from 'svelte'

  let {
    children
  }: {
    children?: Snippet
  } = $props()

  const { createExtension } = useStudio()

  const extension = createExtension<SnappingState, SnappingActions>({
    scope: snappingScope,
    state({ persist }) {
      return {
        enabled: persist(true),
        translate: persist(0.1),
        rotate: persist(15),
        scale: persist(0.1)
      }
    },
    actions: {
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      },
      setEnabled({ state }, enabled) {
        state.enabled = enabled
      },
      setRotate({ state }, rotate) {
        state.rotate = rotate
      },
      setScale({ state }, scale) {
        state.scale = scale
      },
      setTranslate({ state }, translate) {
        state.translate = translate
      }
    },
    keyMap() {
      return {
        toggleEnabled: 'm'
      }
    }
  })
</script>

<ToolbarItem>
  <HorizontalButtonGroup>
    <ToolbarButton
      active={extension.state.enabled}
      icon="mdiMagnet"
      label="Snapping"
      tooltip="Snapping (M)"
      onclick={extension.toggleEnabled}
    />
    <DropDownPane title="Snapping Settings">
      <Slider
        label="Move"
        min={0}
        value={extension.state.translate}
        on:change={(e) => {
          extension.setTranslate(e.detail.value)
        }}
      />
      <Slider
        label="Rotate"
        min={0}
        value={extension.state.rotate}
        format={(v) => `${v}°`}
        on:change={(e) => {
          extension.setRotate(e.detail.value)
        }}
      />
      <Slider
        label="Scale"
        min={0}
        value={extension.state.scale}
        on:change={(e) => {
          extension.setScale(e.detail.value)
        }}
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

{@render children?.()}

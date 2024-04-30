<script lang="ts">
  import { Slider } from 'svelte-tweakpane-ui'
  import DropDownPane from '../../components/DropDownPane/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/Tools/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions'
  import { snappingScope, type SnappingActions, type SnappingState } from './types'

  const { createExtension } = useStudio()

  const { state, run } = createExtension<SnappingState, SnappingActions>({
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
      active={state.enabled}
      icon="mdiMagnet"
      label="Snapping"
      tooltip="Snapping (M)"
      on:click={() => {
        run('toggleEnabled')
      }}
    />
    <DropDownPane title="Snapping Settings">
      <Slider
        label="Move"
        min={0}
        value={state.translate}
        on:change={(e) => {
          run('setTranslate', e.detail.value)
        }}
      />
      <Slider
        label="Rotate"
        min={0}
        value={state.rotate}
        format={(v) => `${v}°`}
        on:change={(e) => {
          run('setRotate', e.detail.value)
        }}
      />
      <Slider
        label="Scale"
        min={0}
        value={state.scale}
        on:change={(e) => {
          run('setScale', e.detail.value)
        }}
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

<slot />

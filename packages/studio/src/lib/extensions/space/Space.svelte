<script lang="ts">
  import ToolbarButton from '../../components/ToolbarButton/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/Tools/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions'
  import { spaceScope, type SpaceActions, type SpaceState } from './types'

  const { createExtension } = useStudio()

  const { state, run } = createExtension<SpaceState, SpaceActions>({
    scope: spaceScope,
    state({ persist }) {
      return {
        space: persist('local')
      }
    },
    actions: {
      setSpace({ state }, space) {
        state.space = space
      },
      toggleSpace({ state }) {
        state.space = state.space === 'local' ? 'world' : 'local'
      }
    },
    keyMap() {
      return {
        toggleSpace: 'w'
      }
    }
  })
</script>

<ToolbarItem>
  <HorizontalButtonGroup>
    <ToolbarButton
      active={state.space === 'local'}
      icon="mdiAxisArrow"
      label="Local"
      tooltip="Local (W)"
      on:click={() => {
        run('setSpace', 'local')
      }}
    />
    <ToolbarButton
      active={state.space === 'world'}
      icon="mdiEarth"
      label="World"
      tooltip="World (W)"
      on:click={() => {
        run('setSpace', 'world')
      }}
    />
  </HorizontalButtonGroup>
</ToolbarItem>

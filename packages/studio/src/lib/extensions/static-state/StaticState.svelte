<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AutoValue, Element, Folder, Pane } from 'svelte-tweakpane-ui'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { useStudio } from '../../internal/extensions'
  import { accessors, type StaticState } from './StaticState'
  import { getStaticStates } from './staticStates'
  import { staticStateScope, type StaticStateActions, type StaticStateState } from './types'
  import { staticStateMetaKey } from '../../config'
  import { clientRpc } from '../../rpc/clientRpc'
  import type { Modifier } from '../../types'

  let { children }: { children?: Snippet } = $props()

  const { createExtension } = useStudio()

  const extension = createExtension<StaticStateState, StaticStateActions>({
    scope: staticStateScope,
    state({ persist }) {
      return {
        editorEnabled: persist(false)
      }
    },
    actions: {
      toggleEditorEnabled({ state }) {
        state.editorEnabled = !state.editorEnabled
      }
    }
  })

  const browser = typeof window !== 'undefined'

  const states = getStaticStates()

  const getValue = (state: StaticState, accessor: string) => {
    return $state.snapshot(state[accessor as unknown as keyof StaticState])
  }

  const setValue = (state: StaticState, accessor: string, value: any) => {
    state[accessor as unknown as keyof StaticState] = value
    const className = state.constructor.name
    clientRpc?.mutateStaticState(state[staticStateMetaKey].id, className, accessor, value)
  }

  const findModifiers = (state: StaticState, accessor: string) => {
    const member = state[staticStateMetaKey].members.find((m) => m.name === accessor)
    if (!member) return []
    return member.modifiers
  }

  const buildOptionsFromModifiers = (modifiers: Modifier[]) => {
    const options: Record<string, any> = {}
    modifiers.forEach((modifier) => {
      let v = modifier.value
      try {
        v = JSON.parse(v)
      } catch (error) {
        // ignore
      }
      options[modifier.name] = v
    })
    return options
  }
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      on:click={extension.toggleEditorEnabled}
      active={extension.state.editorEnabled}
      label="Static State"
      icon="mdiAppsBox"
      tooltip="Static State"
    />
  </HorizontalButtonGroup>
</ToolbarItem>

{#if extension.state.editorEnabled}
  <Pane
    title="Static State"
    position="fixed"
    width={320}
    x={browser ? innerWidth - 6 - 320 : 6}
    y={6 + 60 + 6}
  >
    {#if states.size > 0}
      {#each states as state}
        <Folder title={state.constructor.name}>
          {#each state[accessors] as accessor (accessor)}
            <AutoValue
              value={getValue(state, accessor)}
              options={buildOptionsFromModifiers(findModifiers(state, accessor))}
              label={accessor}
              on:change={(e) => {
                setValue(state, accessor, e.detail.value)
              }}
            />
          {/each}
        </Folder>
      {/each}
      <Element>
        <div style="display: flex; justify-content: end; margin-bottom: 4px;"></div>
      </Element>
    {:else}
      <Element>
        <p>No static states found</p>
      </Element>
    {/if}
  </Pane>
{/if}

{@render children?.()}

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AutoValue, Element, Folder, Pane } from 'svelte-tweakpane-ui'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { staticStateMetaKey } from '../../config.js'
  import { useStudio } from '../../internal/extensions.js'
  import { clientRpc } from '../../rpc/clientRpc.js'
  import type { Modifier } from '../../types.js'
  import { accessors, instances, setValue, StaticState } from './StaticState.js'
  import { staticStateScope, type StaticStateActions, type StaticStateState } from './types.js'

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
      toggleEditor({ state }) {
        state.editorEnabled = !state.editorEnabled
      },
      enableEditor({ state }) {
        state.editorEnabled = true
      },
      disableEditor({ state }) {
        state.editorEnabled = false
      }
    }
  })

  const browser = typeof window !== 'undefined'

  const getValue = (state: StaticState, accessor: string) => {
    return $state.snapshot(state[accessor as unknown as keyof StaticState])
  }

  let debounceTimeouts: Record<string, ReturnType<typeof setTimeout>> = {}

  /**
   * Syncs the value back to the code. Debounced to prevent multiple calls.
   */
  const syncValue = (
    moduleId: string,
    module: boolean,
    className: string,
    accessor: string,
    value: any
  ) => {
    const debounceKey = `${moduleId}-${module}-${className}-${accessor}`

    if (debounceTimeouts[debounceKey]) {
      clearTimeout(debounceTimeouts[debounceKey])
    }

    debounceTimeouts[debounceKey] = setTimeout(() => {
      clientRpc?.mutateStaticState(moduleId, module, className, accessor, value)
      delete debounceTimeouts[debounceKey]
    }, 500)
  }

  const setStateValue = (state: StaticState, accessor: string, value: any) => {
    StaticState[setValue](state.constructor, accessor, value)
    const className = state.constructor.name
    syncValue(
      state[staticStateMetaKey].id,
      state[staticStateMetaKey].module,
      className,
      accessor,
      value
    )
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
      } catch {
        // ignore
      }
      options[modifier.name] = v
    })
    return options
  }

  const buildAutoValueOptions = (state: StaticState | undefined, accessor: string) => {
    // In some rare cases, Svelte may provide an undefined state.
    if (!state) return {}
    const modifiers = findModifiers(state, accessor)
    const options = buildOptionsFromModifiers(modifiers)
    // must be any because of the way the AutoValue component works
    return {
      options: options
    } as any
  }

  const hasStates = $derived.by(() => {
    return [...StaticState[instances]].some(([_, ix]) => ix.size > 0)
  })
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      onclick={extension.toggleEditor}
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
    {#if hasStates}
      {#each StaticState[instances].entries() as [constructor, ix] (constructor.name)}
        {#if ix.size > 0}
          <Folder title={constructor.name}>
            {@const [instance] = ix}
            {#each instance[accessors] as accessor (accessor)}
              <AutoValue
                value={getValue(instance, accessor)}
                label={accessor}
                on:change={(e) => {
                  setStateValue(instance, accessor, e.detail.value)
                }}
                {...buildAutoValueOptions(instance, accessor)}
              />
            {/each}
          </Folder>
        {/if}
      {/each}
    {:else}
      <Element>
        <div>
          <p>No static states found</p>
        </div>
      </Element>
    {/if}
  </Pane>
{/if}

{@render children?.()}

<style>
  div {
    padding: 0.25rem 4px;
    font-family: monospace;
    font-size: 11px;
    color: var(--lbl-fg);
  }
</style>

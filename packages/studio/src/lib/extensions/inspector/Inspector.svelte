<script lang="ts">
  import { Element, Pane, Separator } from 'svelte-tweakpane-ui'
  import type { Pane as TpPane } from 'tweakpane'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { browser } from '../../internal/browser.js'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { useTransactions } from '../transactions/useTransactions.js'
  import Bindings from './Bindings.svelte'
  import { inspectorScope, type InspectorActions, type InspectorState } from './types.js'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const { createExtension } = useStudio()
  const { openInEditor } = useTransactions()

  const ext = createExtension<InspectorState, InspectorActions>({
    scope: inspectorScope,
    state({ persist }) {
      return {
        enabled: persist(true)
      }
    },
    actions: {
      setEnabled({ state }, enabled) {
        state.enabled = enabled
      },
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      }
    },
    keyMap({ meta }) {
      return {
        toggleEnabled: meta('i')
      }
    }
  })

  const objectSelection = useObjectSelection()

  const title = $derived.by(() => {
    if (objectSelection.selectedObjects.length === 0) return 'Inspector'
    if (objectSelection.selectedObjects.length === 1)
      return `${objectSelection.selectedObjects[0].name} (${objectSelection.selectedObjects[0].type})`
    return `${objectSelection.selectedObjects.length} objects`
  })

  let pane = $state<TpPane>()
  $effect(() => {
    if (!pane) return
    const contentEl = pane.element.querySelector('.tp-rotv_c') as HTMLElement
    if (!contentEl) return
    contentEl.style.maxHeight = '50vh'
    contentEl.style.overflow = 'auto'
  })
</script>

<ToolbarItem position="right">
  <ToolbarButton
    label="Inspector"
    icon="mdiPencil"
    onclick={ext.toggleEnabled}
    active={ext.state.enabled}
  />
</ToolbarItem>

{#if ext.state.enabled && objectSelection.selectedObjects.length > 0}
  <Pane
    bind:tpPane={pane}
    {title}
    position="fixed"
    width={320}
    x={browser ? innerWidth - 6 - 320 : 6}
    y={6 + 60 + 6}
  >
    {#if objectSelection.selectedObjects.length === 1}
      <Element>
        <div style="display: flex; justify-content: end; margin-bottom: 4px;">
          <ToolbarButton
            icon="mdiMenuOpen"
            label="Open In Editor"
            onclick={() => {
              openInEditor(objectSelection.selectedObjects[0])
            }}
            disabled={objectSelection.selectedObjects.length !== 1}
            tooltip="Open In Editor"
          />
        </div>
      </Element>
      <Separator />
    {/if}
    <Bindings />
  </Pane>
{/if}

{@render children?.()}

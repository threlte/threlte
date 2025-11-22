<script lang="ts">
  import { Element, Pane } from 'svelte-tweakpane-ui'
  import type { Pane as TpPane } from 'tweakpane'
  import Portal from '../../components/Portal.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import Tree from './Tree.svelte'
  import {
    sceneHierarchyScope,
    type SceneHierarchyActions,
    type SceneHierarchyState
  } from './types.js'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const { createExtension } = useStudio()

  const ext = createExtension<SceneHierarchyState, SceneHierarchyActions>({
    scope: sceneHierarchyScope,
    state({ persist }) {
      return {
        enabled: persist(true)
      }
    },
    actions: {
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      },
      setEnabled({ state }, enabled) {
        state.enabled = enabled
      }
    },
    keyMap({ meta }) {
      return {
        toggleEnabled: meta('h')
      }
    }
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
    label="Scene Hierarchy"
    icon="mdiFormatListBulletedSquare"
    onclick={ext.toggleEnabled}
    active={ext.state.enabled}
  />
</ToolbarItem>

{#if ext.state.enabled}
  <Portal>
    <Pane
      title="Scene Hierarchy"
      position="fixed"
      y={72}
      x={6}
      bind:tpPane={pane}
    >
      <Element>
        <Tree />
      </Element>
    </Pane>
  </Portal>
{/if}

{@render children?.()}

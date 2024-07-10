<script lang="ts">
  import { injectPlugin, useThrelte } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Checkbox, Element, RadioGrid } from 'svelte-tweakpane-ui'
  import DropDownPane from '../../components/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte'
  import Changes from './Changes.svelte'
  import { TransactionQueue } from './TransactionQueue/TransactionQueue.svelte'
  import { transactionsScope, type TransactionsActions, type TransactionsState } from './types'
  import { clientRpc } from './vite-plugin/clientRpc'
  import { getThrelteStudioUserData } from './vite-plugin/runtimeUtils'
  import type { StudioProps } from './vite-plugin/types'
  import { vitePluginEnabled } from './vite-plugin/vitePluginEnabled'

  const { createExtension } = useStudio()
  const { invalidate } = useThrelte()

  const applyToProperties = ['shadow', 'light', 'material', 'camera', 'target']

  const insertStudioProps = (object: any, props: StudioProps) => {
    for (const key of Object.keys(object)) {
      if (applyToProperties.includes(key)) {
        const newProps: StudioProps = {
          ...props,
          pathItems: [...(props.pathItems ?? []), key]
        }
        const hasUserData = 'userData' in object[key]
        const hasInspectorOptions = hasUserData && 'threlteStudio' in object[key].userData
        if (!hasInspectorOptions) {
          if (hasUserData) {
            object[key].userData.threlteStudio = newProps
          } else {
            object[key]['userData'] = { threlteStudio: newProps }
          }
        }
        insertStudioProps(object[key], newProps)
      }
    }
  }

  injectPlugin<{
    threlteStudio: StudioProps
  }>('sync', ({ ref, props }) => {
    if (!props.threlteStudio) return

    ref.userData.threlteStudio = props.threlteStudio

    // go through the properties and apply the studio props to the properties
    // that are in the applyToProperties array
    onMount(() => {
      insertStudioProps(ref, props.threlteStudio)
    })
    return {
      pluginProps: ['threlteStudio']
    }
  })

  const objectSelection = useObjectSelection()

  const extension = createExtension<TransactionsState, TransactionsActions>({
    scope: transactionsScope,
    state: ({ persist }) => {
      return {
        enabled: persist<boolean>(true),
        mode: persist<'auto' | 'manual'>('auto'),
        precision: persist<number>(4),
        queue: new TransactionQueue()
      }
    },
    actions: {
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      },
      setEnabled({ state }, enabled) {
        state.enabled = enabled
      },
      setMode({ state }, mode) {
        state.mode = mode
      },
      setPrecision({ state }, precision) {
        state.precision = precision
      },
      commit({ state }, transaction) {
        state.queue.commit(transaction)
        invalidate()
      },
      undo({ state }) {
        state.queue.undo()
        invalidate()
      },
      redo({ state }) {
        state.queue.redo()
        invalidate()
      },
      sync({ state }) {
        state.queue.sync()
      },
      async openInEditor(_, object) {
        if (!clientRpc) return
        const userData = getThrelteStudioUserData(object)
        if (!userData) return
        const pos = await clientRpc.getColumnAndRow(
          userData.moduleId,
          userData.index,
          userData.signature
        )
        const fileLoc = `${userData.moduleId}:${pos.row}:${pos.column + 1}`
        fetch(`/__open-in-editor?file=${encodeURIComponent(fileLoc)}`)
      },
      openSelectedInEditor() {
        const objects = objectSelection.selectedObjects
        if (objects.length !== 1) return
        extension.openInEditor(objects[0])
      }
    },
    keyMap({ meta, shift }) {
      return {
        undo: meta('z'),
        redo: shift(meta('z')),
        sync: meta('s'),
        openSelectedInEditor: meta('o')
      }
    }
  })

  $effect(() => {
    if (
      extension.state.enabled &&
      extension.state.mode === 'auto' &&
      extension.state.queue.syncQueue.length
    ) {
      extension.sync()
    }
  })

  const tooltip = $derived.by(() => {
    if (!vitePluginEnabled) return 'Vite plugin not found'
    if (!extension.state.enabled) return 'Sync disabled'
    if (extension.state.mode === 'manual') {
      if (!extension.state.queue.syncQueue.length) return 'Up-to-date'
      return `Sync ${extension.state.queue.syncQueue.length} change${extension.state.queue.syncQueue.length > 1 ? 's' : ''}`
    }
    return 'Auto-sync'
  })
</script>

<ToolbarItem position="right">
  <HorizontalButtonGroup>
    <ToolbarButton
      error={!vitePluginEnabled}
      success={extension.state.enabled && extension.state.mode === 'auto'}
      warn={extension.state.enabled &&
        extension.state.mode === 'manual' &&
        extension.state.queue.syncQueue.length > 0}
      disabled={!extension.state.enabled || extension.state.mode === 'auto'}
      icon={extension.state.mode === 'auto' && extension.state.queue.syncQueue.length > 0
        ? 'mdiLoading'
        : 'mdiContentSave'}
      label="Sync"
      {tooltip}
      on:click={extension.sync}
    />

    <DropDownPane title="Sync Settings">
      <Checkbox
        label="Enabled"
        value={extension.state.enabled}
        on:change={(e) => {
          extension.setEnabled(e.detail.value)
        }}
      />
      <RadioGrid
        label="Mode"
        columns={2}
        values={['manual', 'auto']}
        on:change={(e) => {
          extension.setMode(e.detail.value as 'manual' | 'auto')
        }}
        value={extension.state.mode}
      />

      <Element>
        <Changes />
      </Element>
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

<ToolbarItem position="right">
  <HorizontalButtonGroup>
    <ToolbarButton
      icon="mdiUndo"
      label="Undo"
      disabled={!extension.state.queue.canUndo}
      tooltip="Undo (Cmd+Z)"
      on:click={extension.undo}
    />
    <ToolbarButton
      icon="mdiRedo"
      label="Redo"
      disabled={!extension.state.queue.canRedo}
      tooltip="Redo (Shift+Cmd+Z)"
      on:click={extension.redo}
    />
  </HorizontalButtonGroup>
</ToolbarItem>

<slot />

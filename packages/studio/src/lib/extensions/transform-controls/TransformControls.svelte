<script lang="ts">
  import { Checkbox } from 'svelte-tweakpane-ui'
  import type { Object3D } from 'three'
  import DropDownPane from '../../components/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import ContainerTransform from './ContainerTransform.svelte'
  import SingleTransform from './SingleTransform.svelte'
  import {
    transformControlsScope,
    type TransformControlsActions,
    type TransformControlsState
  } from './types.js'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const { createExtension: createExtension } = useStudio()

  const extension = createExtension<TransformControlsState, TransformControlsActions>({
    scope: transformControlsScope,
    state: ({ persist }) => ({
      enabled: persist(true),
      mode: persist('translate'),
      inUse: false
    }),
    actions: {
      enable({ state }) {
        state.enabled = true
      },
      disable({ state }) {
        state.enabled = false
        state.inUse = false
      },
      toggle({ state }) {
        state.enabled = !state.enabled
        if (!state.enabled) {
          state.inUse = false
        }
      },
      setMode({ state }, mode) {
        state.mode = mode
      },
      translate({ state }) {
        state.mode = 'translate'
      },
      rotate({ state }) {
        state.mode = 'rotate'
      },
      scale({ state }) {
        state.mode = 'scale'
      },
      setInUse({ state }, inUse) {
        state.inUse = inUse
      }
    },
    keyMap() {
      return {
        translate: 't',
        rotate: 'r',
        scale: 's',
        toggleInUse: 'z'
      }
    }
  })

  const mode = $derived(extension.state.mode)
  const enabled = $derived(extension.state.enabled)

  const objectSelection = useObjectSelection()

  const key = (objects: Object3D[]) => objects.map((o) => o.uuid).join()
</script>

{#if enabled}
  {#if objectSelection.selectedObjects.length > 1}
    {#key key(objectSelection.selectedObjects)}
      <ContainerTransform />
    {/key}
  {:else if objectSelection.selectedObjects.length === 1}
    {#key key(objectSelection.selectedObjects)}
      <SingleTransform />
    {/key}
  {/if}
{/if}

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      onclick={() => {
        extension.setMode('translate')
      }}
      active={mode === 'translate'}
      label="Move"
      icon="mdiRayEndArrow"
      tooltip="Move (T)"
    />

    <ToolbarButton
      onclick={() => {
        extension.setMode('rotate')
      }}
      active={mode === 'rotate'}
      label="Rotate"
      icon="mdiRotateLeft"
      tooltip="Rotate (R)"
    />

    <ToolbarButton
      onclick={() => {
        extension.setMode('scale')
      }}
      active={mode === 'scale'}
      label="Scale"
      icon="mdiArrowExpand"
      tooltip="Scale (S)"
    />

    <DropDownPane title="Settings">
      <Checkbox
        value={enabled}
        on:change={(e) => {
          if (e.detail.value) {
            extension.enable()
          } else {
            extension.disable()
          }
        }}
        label="Enabled"
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

{@render children?.()}

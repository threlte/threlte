<script lang="ts">
  import { Grid } from '@threlte/extras'
  import {
    Color,
    RadioGrid,
    Slider,
    type ColorValue,
    type RadioGridChangeEvent
  } from 'svelte-tweakpane-ui'
  import type { Mesh } from 'three'
  import DropDownPane from '../../components/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import { gridScope, type GridActions, type GridState } from './types.js'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const { createExtension } = useStudio()
  const studioObjectsRegistry = useStudioObjectsRegistry()

  let grid = $state(studioObjectsRegistry.studioObjectRef<Mesh>())

  const extension = createExtension<GridState, GridActions>({
    scope: gridScope,
    state({ persist }) {
      return {
        enabled: persist(true),
        color: persist('#5f5f5f'),
        step: persist(1),
        plane: persist('xz')
      }
    },
    actions: {
      setEnabled({ state }, enabled) {
        state.enabled = enabled
      },
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      },
      setColor({ state }, color) {
        state.color = color
      },
      setStep({ state }, step) {
        state.step = step
      },
      setPlane({ state }, plane) {
        state.plane = plane
      }
    }
  })

  const onColorChange = (e: CustomEvent<{ value: ColorValue }>) => {
    extension.setColor(e.detail.value as string)
  }

  const onPlaneChange = (e: RadioGridChangeEvent) => {
    extension.setPlane(e.detail.value as 'xy' | 'xz' | 'zy')
  }

  const onStepChange = (e: CustomEvent<{ value: number }>) => {
    extension.setStep(e.detail.value)
  }
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      onclick={() => {
        extension.toggleEnabled()
      }}
      active={extension.state.enabled}
      label="Grid"
      icon="mdiGrid"
      tooltip="Grid"
    />

    <DropDownPane title="Grid Settings">
      <Color
        value={extension.state.color}
        label="Color"
        on:change={onColorChange}
      />

      <Slider
        value={extension.state.step}
        label="Step"
        min={0}
        on:change={onStepChange}
      />
      <RadioGrid
        value={extension.state.plane}
        values={['xy', 'xz', 'yz']}
        rows={1}
        label="Plane"
        on:change={onPlaneChange}
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

{#if extension.state.enabled}
  <Grid
    bind:ref={grid.ref}
    name="Grid"
    userData={{ ignoreOverrideMaterial: true }}
    infiniteGrid
    cellSize={extension.state.step}
    sectionSize={extension.state.step * 10}
    sectionColor={extension.state.color}
    cellColor={extension.state.color}
    plane={extension.state.plane}
    renderOrder={9999}
    fadeDistance={extension.state.step * 500}
  />
{/if}

{@render children?.()}

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
  import DropDownPane from '../../components/DropDownPane/DropDownPane.svelte'
  import ToolbarButton from '../../components/ToolbarButton/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/Tools/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte'
  import { gridScope, type GridActions, type GridState } from './types'

  const { createExtension } = useStudio()
  const studioObjectsRegistry = useStudioObjectsRegistry()

  let grid = studioObjectsRegistry.studioObjectRef<Mesh>()

  const { state, run: runGridAction } = createExtension<GridState, GridActions>({
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
    runGridAction('setColor', e.detail.value as string)
  }

  const onPlaneChange = (e: RadioGridChangeEvent) => {
    runGridAction('setPlane', e.detail.value as 'xy' | 'xz' | 'zy')
  }

  const onStepChange = (e: CustomEvent<{ value: number }>) => {
    runGridAction('setStep', e.detail.value)
  }
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      on:click={() => {
        runGridAction('toggleEnabled')
      }}
      active={state.enabled}
      label="Grid"
      icon="mdiGrid"
      tooltip="Grid"
    />

    <DropDownPane title="Grid Settings">
      <Color
        value={state.color}
        label="Color"
        on:change={onColorChange}
      />

      <Slider
        value={state.step}
        label="Step"
        min={0}
        on:change={onStepChange}
      />
      <RadioGrid
        value={state.plane}
        values={['xy', 'xz', 'yz']}
        rows={1}
        label="Plane"
        on:change={onPlaneChange}
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

{#if state.enabled}
  <Grid
    userData={{ ignoreOverrideMaterial: true }}
    infiniteGrid
    cellSize={state.step}
    sectionSize={state.step * 10}
    sectionColor={state.color}
    cellColor={state.color}
    plane={state.plane}
    renderOrder={9999}
    bind:ref={grid.ref}
    fadeDistance={state.step * 500}
  />
{/if}

<slot />

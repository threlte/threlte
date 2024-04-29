<script lang="ts">
  import { HierarchicalObject, useThrelte, watch } from '@threlte/core'
  import { Gizmo, Grid } from '@threlte/extras'
  import { objectSelection } from '../extensions/object-selection'
  import { renderModes } from '../extensions/render-modes'
  // import {
  // 	transformControls,
  // 	transformControlsScope,
  // 	type TransformControlsActions,
  // 	type TransformControlsState,
  // } from '../extensions/transform-controls'
  import { add } from '../hooks/useOnAdd'
  import { remove } from '../hooks/useOnRemove'
  import { getInternalContext, useInspector } from '../internal/context'
  import { createRootContext, useStudio } from '../internal/extensions'
  import AxesHelper from './Internal/AxesHelper.svelte'
  import Portal from './Internal/Portal.svelte'
  import Draggable from './Positions/Draggable.svelte'
  import Inline from './Positions/Inline.svelte'
  import AutoSync from './Tools/AutoSync.svelte'
  import FreeCamera from './Tools/FreeCamera.svelte'
  import Helpers from './Tools/Helpers.svelte'
  import Keyboard from './Tools/Keyboard.svelte'
  import Raycast from './Tools/Raycast.svelte'
  import TransformControls from './Tools/TransformControls.svelte'
  import { browser } from '../internal/browser'

  const { position } = useInspector()
  const { scene } = useThrelte()
  const { usingRaycast, selectedObject, gizmoSettings, toolSettings, studioObjects, syncSettings } =
    getInternalContext()

  $: object = $selectedObject
  $: component = $position === 'inline' ? Inline : Draggable

  const onCreate = (args: { ref: THREE.Object3D; cleanup: (callback: () => void) => void }) => {
    studioObjects.update((objects) => {
      objects.add(args.ref)
      return objects
    })
    args.cleanup(() => {
      studioObjects.update((objects) => {
        objects.delete(args.ref)
        return objects
      })
    })
  }

  // createRootContext()

  // renderModes()
  // objectSelection()

  // const { useExtension } = useStudio()

  // const tInUse = subStore(state, (s) => s[transformControlsScope].inUse)

  // const transformControlsState = getState3<boolean>('transform-controls')

  // watch(tInUse, (inUse) => {
  // 	console.log('inUse', inUse)
  // })

  // watch(transformControlsState, (transformControlsState) => {
  // 	console.log('transformControlsState', transformControlsState)
  // })

  // const tc = useExtension<TransformControlsState, TransformControlsActions>(transformControlsScope)
  // const inUse = tc.select((s) => s.inUse)

  // watch(inUse, (inUse) => {
  // 	console.log('inUse', inUse)
  // })

  // transformControls()
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'f') {
      tc.run('toggleInUse')
    }
  }}
/>

<Keyboard />

<!-- <ViewportRenderModes /> -->

{#if $syncSettings.enabled && $syncSettings.mode === 'auto'}
  <AutoSync />
{/if}

<Portal>
  {#if $$slots.default}
    <svelte:component this={component}>
      <slot />
    </svelte:component>
  {:else}
    <svelte:component this={component} />
  {/if}
</Portal>

<!-- Ensure that all inspector objects are added to the scene passed to the inspector -->
<HierarchicalObject
  onChildMount={(child) => add.call(scene, child)}
  onChildDestroy={(child) => remove.call(scene, child)}
>
  {#if $gizmoSettings.viewportGizmo.visible && $toolSettings.freeCamera.enabled}
    <Gizmo
      size={100}
      horizontalPlacement="left"
      verticalPlacement="bottom"
      paddingX={6}
      paddingY={6}
      toneMapped={false}
    />
  {/if}

  {#if $gizmoSettings.grid.visible}
    <Grid
      userData={{ ignoreOverrideMaterial: true }}
      infiniteGrid
      cellSize={$gizmoSettings.grid.units}
      renderOrder={9999}
      sectionColor={$gizmoSettings.grid.color}
      cellColor={$gizmoSettings.grid.color}
      on:create={onCreate}
      plane={$gizmoSettings.grid.plane}
    />
  {/if}

  {#if $gizmoSettings.axes.visible}
    <AxesHelper
      length={2}
      width={0.2}
      on:create={onCreate}
    />
  {/if}

  {#if $toolSettings.freeCamera.enabled}
    <FreeCamera />
  {/if}

  {#if $usingRaycast}
    <Raycast />
  {/if}

  {#if object && !('isScene' in object)}
    {#if $toolSettings.transformControls.enabled}
      {#key object}
        <TransformControls {object} />
      {/key}
    {/if}

    {#if $gizmoSettings.helpers.visible}
      <Helpers {object} />
    {/if}
  {/if}
</HierarchicalObject>

<style>
  /* tweakpane checkbox value wrapper */
  :global(.tp-lblv_v:has(.tp-ckbv)) {
    width: auto !important;
  }
</style>

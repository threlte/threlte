<script lang="ts">
  import type { Component, Snippet } from 'svelte'
  import EditorCamera from '../extensions/editor-camera/EditorCamera.svelte'
  import Grid from '../extensions/grid/Grid.svelte'
  import Helpers from '../extensions/helpers/Helpers.svelte'
  import Inspector from '../extensions/inspector/Inspector.svelte'
  import ObjectSelection from '../extensions/object-selection/ObjectSelection.svelte'
  import RenderModes from '../extensions/render-modes/RenderModes.svelte'
  import SceneHierarchy from '../extensions/scene-hierarchy/SceneHierarchy.svelte'
  import Snapping from '../extensions/snapping/Snapping.svelte'
  import Space from '../extensions/space/Space.svelte'
  import StaticState from '../extensions/static-state/StaticState.svelte'
  import StudioObjectsRegistry from '../extensions/studio-objects-registry/StudioObjectsRegistry.svelte'
  import Transactions from '../extensions/transactions/Transactions.svelte'
  import TransformControls from '../extensions/transform-controls/TransformControls.svelte'
  import { createRootContext, useStudio } from '../internal/extensions.js'
  import NestedComponents from './NestedComponents.svelte'
  import Toolbar from './Toolbar.svelte'


  type Props = {
    namespace?: string
    transient?: boolean
    extensions?: Component[]
    children: Snippet
  }

  let { extensions, children, namespace = 'default', transient = false }: Props = $props()

  createRootContext(namespace, transient)

  const { createExtension } = useStudio()

  const defaultExtensions = [
    Transactions,
    StudioObjectsRegistry,
    ObjectSelection,
    Space,
    Snapping,
    TransformControls,
    EditorCamera,
    RenderModes,
    Grid,
    Helpers,
    SceneHierarchy,
    Inspector,
    StaticState
  ]

  const allExtensions = [...defaultExtensions, ...(extensions ?? [])] as Component[]

  // TODO: this is a bit of a hack, but it works for now
  const studioExtension = createExtension<
    {
      enabled: boolean
    },
    {
      toggle: () => void
    }
  >({
    scope: 'studio',
    state: ({ persist }) => ({
      enabled: persist(true)
    }),
    actions: {
      toggle: ({ state }) => {
        state.enabled = !state.enabled
        if (!state.enabled) {
          // we need a hard reload here
          window.location.reload()
        }
      }
    },
    keyMap({ alt, shift }) {
      return {
        toggle: shift(alt('s'))
      }
    }
  })
</script>

{#if studioExtension.state.enabled}
  <Toolbar />

  <NestedComponents extensions={allExtensions}>
    {@render children()}
  </NestedComponents>
{:else}
  {@render children()}
{/if}

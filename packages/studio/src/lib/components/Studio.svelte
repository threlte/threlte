<script lang="ts">
  import type { Snippet } from 'svelte'
  import EditorCamera from '../extensions/editor-camera/EditorCamera.svelte'
  import Grid from '../extensions/grid/Grid.svelte'
  import Helpers from '../extensions/helpers/Helpers.svelte'
  import Inspector from '../extensions/inspector/Inspector.svelte'
  import ObjectSelection from '../extensions/object-selection/ObjectSelection.svelte'
  import RenderModes from '../extensions/render-modes/RenderModes.svelte'
  import SceneHierarchy from '../extensions/scene-hierarchy/SceneHierarchy.svelte'
  import Snapping from '../extensions/snapping/Snapping.svelte'
  import Space from '../extensions/space/Space.svelte'
  import Transactions from '../extensions/transactions/Transactions.svelte'
  import TransformControls from '../extensions/transform-controls/TransformControls.svelte'
  import { createRootContext } from '../internal/extensions'
  import Toolbar from './Toolbar.svelte'
  import NestedComponents from './NestedComponents.svelte'
  import StudioObjectsRegistry from '../extensions/studio-objects-registry/StudioObjectsRegistry.svelte'

  type Props = {
    namespace?: string
    transient?: boolean
    extensions?: ConstructorOfATypedSvelteComponent[]
    children: Snippet
  }

  let { extensions, children, namespace = 'default', transient = false }: Props = $props()

  createRootContext(namespace, transient)

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
    Inspector
  ]

  const allExtensions = [...defaultExtensions, ...(extensions ?? [])]
</script>

<Toolbar />

<NestedComponents extensions={allExtensions}>
  {@render children()}
</NestedComponents>

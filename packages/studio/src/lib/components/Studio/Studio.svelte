<script lang="ts">
  import { injectPlugin, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { DirectionalLight, SpotLight } from 'three'
  import EditorCamera from '../../extensions/editor-camera/EditorCamera.svelte'
  import Grid from '../../extensions/grid/Grid.svelte'
  import Helpers from '../../extensions/helpers/Helpers.svelte'
  import Inspector from '../../extensions/inspector/Inspector.svelte'
  import ObjectSelection from '../../extensions/object-selection/ObjectSelection.svelte'
  import RenderModes from '../../extensions/render-modes/RenderModes.svelte'
  import SceneHierarchy from '../../extensions/scene-hierarchy/SceneHierarchy.svelte'
  import Snapping from '../../extensions/snapping/Snapping.svelte'
  import Space from '../../extensions/space/Space.svelte'
  import StudioObjectsRegistry from '../../extensions/studio-objects-registry/StudioObjectsRegistry.svelte'
  import Transactions from '../../extensions/transactions/Transactions.svelte'
  import TransformControls from '../../extensions/transform-controls/TransformControls.svelte'
  import { createRootContext } from '../../internal/extensions'
  import Toolbar from '../Toolbar/Toolbar.svelte'

  type Props = {
    extensions?: ConstructorOfATypedSvelteComponent[]
  }

  let { extensions }: Props = $props()

  const { scene } = useThrelte()

  createRootContext()

  const isDirectionalLight = (object: any): object is DirectionalLight => {
    return object && 'isDirectionalLight' in object
  }

  const isSpotLight = (object: any): object is SpotLight => {
    return object && 'isSpotLight' in object
  }

  const isValidLight = (object: any): object is DirectionalLight | SpotLight => {
    return isDirectionalLight(object) || isSpotLight(object)
  }

  injectPlugin<{ manual?: boolean }>('directional-light-target', ({ ref, props }) => {
    if (props.manual || !isValidLight(ref)) return

    let instance = ref
    if (instance.target.name === '') {
      instance.target.name = 'Target'
    }
    scene.add(instance.target)

    onDestroy(() => {
      scene.remove(instance.target)
    })
    return {
      onRefChange(ref) {
        scene.remove(instance.target)
        if (isValidLight(ref)) {
          instance = ref
          if (instance.target.name === '') {
            instance.target.name = 'Target'
          }
          scene.add(instance.target)
        }
      }
    }
  })
</script>

<Toolbar />

<Transactions>
  <slot />
</Transactions>

<ObjectSelection />
<StudioObjectsRegistry />

<Space />
<Snapping />
<TransformControls />
<EditorCamera />
<RenderModes />
<Grid />
<Helpers />
<SceneHierarchy />
<Inspector />

{#if extensions}
  {#each extensions as extension}
    <svelte:component this={extension} />
  {/each}
{/if}

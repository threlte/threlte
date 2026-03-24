<script lang="ts">
  import { isInstanceOf, T, useTask, useThrelte } from '@threlte/core'
  import { Light, Object3D } from 'three'
  import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import { useTransactions } from '../transactions/useTransactions.js'
  import AxesHelper from './AxesHelper.svelte'
  import GroupHelper from './GroupHelper.svelte'
  import Mounter from './Mounter.svelte'
  import { helpersScope, type HelpersActions, type HelpersState } from './types.js'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const { autoRenderTask } = useThrelte()
  const { createExtension } = useStudio()
  const { onTransaction } = useTransactions()

  const ext = createExtension<HelpersState, HelpersActions>({
    scope: helpersScope,
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
    }
  })

  const objectSelection = useObjectSelection()

  const { addObject, removeObject } = useStudioObjectsRegistry()

  const activeHelpers = new Set<Object3D>()

  useTask(
    () => {
      for (const helper of activeHelpers) {
        if ('update' in helper && typeof helper.update === 'function') {
          helper.update()
        }
      }
    },
    {
      autoInvalidate: false,
      before: autoRenderTask
    }
  )

  const onCreate = (ref: Object3D): (() => void) => {
    addObject(ref)
    activeHelpers.add(ref)
    return () => {
      removeObject(ref)
      activeHelpers.delete(ref)
    }
  }

  const isLight = (object: any): object is Light => {
    return object.isLight
  }

  let invalidations = $state(1)
  onTransaction(() => {
    invalidations++
  })
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      onclick={ext.toggleEnabled}
      active={ext.state.enabled}
      label="Helpers"
      icon="mdiFitToScreen"
      tooltip="Helpers"
    />
  </HorizontalButtonGroup>
</ToolbarItem>

{#if ext.state.enabled}
  <AxesHelper
    length={999}
    width={0.2}
  />

  {#each objectSelection.selectedObjects as object (object.uuid)}
    <Mounter parent={object}>
      <AxesHelper
        length={0.5}
        width={0.2}
        opacity={0.3}
        overlay
      />

      {#if isInstanceOf(object, 'Group')}
        <GroupHelper oncreate={onCreate} />
      {/if}
    </Mounter>

    {#if isInstanceOf(object, 'Camera')}
      <T.CameraHelper
        userData={{ ignoreOverrideMaterial: true }}
        args={[object]}
        oncreate={onCreate}
      />
    {:else if isLight(object)}
      {#if object.shadow && invalidations && object.castShadow}
        <T.CameraHelper
          userData={{ ignoreOverrideMaterial: true }}
          args={[object.shadow.camera]}
          oncreate={onCreate}
        />
      {/if}

      {#if 'isDirectionalLight' in object}
        <T.DirectionalLightHelper
          userData={{ ignoreOverrideMaterial: true }}
          args={[object, 10]}
          oncreate={onCreate}
        />
      {:else if 'isSpotLight' in object}
        <T.SpotLightHelper
          userData={{ ignoreOverrideMaterial: true }}
          args={[object]}
          oncreate={onCreate}
        />
      {:else if 'isPointLight' in object}
        <T.PointLightHelper
          userData={{ ignoreOverrideMaterial: true }}
          args={[object, 10]}
          oncreate={onCreate}
        />
      {:else if 'isHemisphereLight' in object}
        <T.HemisphereLightHelper
          userData={{ ignoreOverrideMaterial: true }}
          args={[object, 10]}
          oncreate={onCreate}
        />
      {:else if 'isRectAreaLight' in object}
        <T
          is={RectAreaLightHelper}
          userData={{ ignoreOverrideMaterial: true }}
          oncreate={onCreate}
          args={[object]}
        />
      {/if}
    {/if}
  {/each}
{/if}

{@render children?.()}

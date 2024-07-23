<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Gizmo } from '@threlte/extras'
  import { Light, Object3D, type Camera, type Group } from 'three'
  import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import { useStudio } from '../../internal/extensions'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte'
  import { useTransactions } from '../transactions/useTransactions'
  import AxesHelper from './AxesHelper.svelte'
  import GroupHelper from './GroupHelper.svelte'
  import Mounter from './Mounter.svelte'
  import { helpersScope, type HelpersActions, type HelpersState } from './types'

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

  const onCreate = (args: { ref: Object3D; cleanup: (callback: () => void) => void }) => {
    addObject(args.ref)
    activeHelpers.add(args.ref)
    args.cleanup(() => {
      removeObject(args.ref)
      activeHelpers.delete(args.ref)
    })
  }

  const isCamera = (object: any): object is Camera => {
    return object.isCamera
  }

  const isLight = (object: any): object is Light => {
    return object.isLight
  }

  const isGroup = (object: any): object is Group => {
    return object.isGroup
  }

  let invalidations = $state(1)
  onTransaction(() => {
    invalidations++
  })
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      on:click={ext.toggleEnabled}
      active={ext.state.enabled}
      label="Helpers"
      icon="mdiFitToScreen"
      tooltip="Helpers"
    />
  </HorizontalButtonGroup>
</ToolbarItem>

{#if ext.state.enabled}
  <Gizmo
    paddingX={6}
    paddingY={6}
    verticalPlacement="bottom"
    size={100}
    horizontalPlacement="left"
  />

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

      {#if isGroup(object)}
        <GroupHelper {onCreate} />
      {/if}
    </Mounter>

    {#if isCamera(object)}
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

<slot />

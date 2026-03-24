<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { onDestroy, type Snippet } from 'svelte'
  import {
    BackSide,
    DoubleSide,
    FrontSide,
    Material,
    MeshBasicMaterial,
    MeshMatcapMaterial
  } from 'three'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { renderModesScope, type RenderModesActions, type RenderModesState } from './types.js'

  let { children }: { children?: Snippet } = $props()

  const hasMaterial = (object: any): object is { material: Material } => {
    return 'material' in object
  }

  const { createExtension } = useStudio()
  const { scene, invalidate, renderer } = useThrelte()

  const extension = createExtension<RenderModesState, RenderModesActions>({
    scope: renderModesScope,
    state: ({ persist }) => ({
      renderMode: persist<RenderModesState['renderMode']>('rendered')
    }),
    actions: {
      cycleRenderMode({ state }) {
        state.renderMode =
          state.renderMode === 'wireframe'
            ? 'solid'
            : state.renderMode === 'solid'
              ? 'rendered'
              : 'wireframe'
      },
      setRenderMode({ state }, mode) {
        state.renderMode = mode
      }
    },
    keyMap() {
      return {
        cycleRenderMode: 'v'
      }
    }
  })

  // override to exclude objects with `ignoreOverrideMaterial` from being rendered with the override material
  // see https://github.com/mrdoob/three.js/blob/45498d0255abe5da8d3ff95c117ccab594c49b8f/src/renderers/WebGLRenderer.js#L1589-L1616
  const ogRenderBufferDirect = renderer.renderBufferDirect.bind(renderer)
  renderer.renderBufferDirect = (...args) => {
    // signature: 0:camera, 1:scene, 2:geometry, 3:material, 4:object, 5:group
    if (args[4].userData.ignoreOverrideMaterial && hasMaterial(args[4])) {
      // we have to mimic what `renderObject` does with the original material
      const material = args[4].material
      if (material.transparent && material.side === DoubleSide && !material.forceSinglePass) {
        material.side = BackSide
        material.needsUpdate = true
        ogRenderBufferDirect.call(renderer, args[0], args[1], args[2], material, args[4], args[5])
        material.side = FrontSide
        material.needsUpdate = true
        ogRenderBufferDirect.call(renderer, args[0], args[1], args[2], material, args[4], args[5])
        material.side = DoubleSide
      } else {
        ogRenderBufferDirect.call(renderer, args[0], args[1], args[2], material, args[4], args[5])
      }
    } else {
      ogRenderBufferDirect.call(renderer, ...args)
    }
  }

  onDestroy(() => {
    renderer.renderBufferDirect = ogRenderBufferDirect
  })

  $effect(() => {
    switch (extension.state.renderMode) {
      case 'rendered': {
        scene.overrideMaterial = null
        break
      }
      case 'wireframe': {
        scene.overrideMaterial = new MeshBasicMaterial({
          wireframe: true,
          color: '#ffffff'
        })
        break
      }
      case 'solid': {
        scene.overrideMaterial = new MeshMatcapMaterial({
          color: '#ffffff',
          flatShading: true
        })
        break
      }
    }
    invalidate()
  })
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      label="Wireframe"
      icon="mdiWeb"
      onclick={() => {
        extension.setRenderMode('wireframe')
      }}
      active={extension.state.renderMode === 'wireframe'}
      tooltip="Wireframe (V)"
    />
    <ToolbarButton
      label="Solid"
      icon="mdiCircle"
      onclick={() => {
        extension.setRenderMode('solid')
      }}
      active={extension.state.renderMode === 'solid'}
      tooltip="Solid (V)"
    />
    <ToolbarButton
      label="Rendered"
      icon="mdiCircleOpacity"
      onclick={() => {
        extension.setRenderMode('rendered')
      }}
      active={extension.state.renderMode === 'rendered'}
      tooltip="Rendered (V)"
    />
  </HorizontalButtonGroup>
</ToolbarItem>

{@render children?.()}

<script lang="ts">
  import { observe, T, useThrelte, watch } from '@threlte/core'
  import type CC from 'camera-controls'
  import { onDestroy, type Snippet } from 'svelte'
  import { Checkbox, RadioGrid } from 'svelte-tweakpane-ui'
  import { Box3, OrthographicCamera, PerspectiveCamera, Sphere, Vector3 } from 'three'
  import DropDownPane from '../../components/DropDownPane.svelte'
  import HorizontalButtonGroup from '../../components/HorizontalButtonGroup.svelte'
  import ToolbarButton from '../../components/ToolbarButton.svelte'
  import ToolbarItem from '../../components/ToolbarItem.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import CameraControls from './CameraControls.svelte'
  import DefaultCamera from './DefaultCamera.svelte'
  import { editorCameraScope, type EditorCameraActions, type EditorCameraState } from './types.js'

  let { children }: { children?: Snippet } = $props()

  const { createExtension } = useStudio()
  const { camera } = useThrelte()
  const { addObject, removeObject } = useStudioObjectsRegistry()

  const editorCameraPerspective = new PerspectiveCamera()
  editorCameraPerspective.userData.editorCamera = true
  editorCameraPerspective.userData.perspective = true
  addObject(editorCameraPerspective)
  const editorCameraOrthographic = new OrthographicCamera()
  editorCameraOrthographic.userData.editorCamera = true
  editorCameraOrthographic.userData.orthographic = true
  addObject(editorCameraOrthographic)

  onDestroy(() => {
    removeObject(editorCameraPerspective)
    removeObject(editorCameraOrthographic)
  })

  let cameraControls: CC | undefined

  const objectSelection = useObjectSelection()

  const extension = createExtension<EditorCameraState, EditorCameraActions>({
    scope: editorCameraScope,
    state({ persist }) {
      return {
        enabled: persist(false),
        mode: persist('Perspective'),
        position: persist([10, 10, 10]),
        target: persist([0, 0, 0]),
        defaultCamera: {
          object: undefined,
          enabled: persist(true),
          height: persist(240),
          width: persist(400)
        }
      }
    },
    actions: {
      toggleEnabled({ state }) {
        state.enabled = !state.enabled
      },
      setEnabled({ state }, active) {
        state.enabled = active
      },
      setOrthographic({ state }) {
        state.mode = 'Orthographic'
      },
      setPerspective({ state }) {
        state.mode = 'Perspective'
      },
      setEditorCameraTransform({ state }, position, target) {
        state.position = position
        state.target = target
      },
      setMode({ state }, mode) {
        state.mode = mode
      },
      toggleMode({ state }) {
        state.mode = state.mode === 'Orthographic' ? 'Perspective' : 'Orthographic'
      },
      toggleDefaultCameraEnabled({ state }) {
        state.defaultCamera.enabled = !state.defaultCamera.enabled
      },
      setDefaultCameraEnabled({ state }, enabled) {
        state.defaultCamera.enabled = enabled
      },
      setDefaultCameraObject({ state }, object) {
        state.defaultCamera.object = object
      },
      focusSelectedObjects() {
        if (!cameraControls) return
        if (!objectSelection.selectedObjects.length) return

        const box = new Box3()
        const centerAbs = new Vector3()
        objectSelection.selectedObjects.forEach((object) => {
          object.getWorldPosition(centerAbs)
          box.expandByPoint(centerAbs)
          box.expandByObject(object, false)
        })

        const sphere = new Sphere()

        box.getBoundingSphere(sphere)
        cameraControls.fitToSphere(sphere, true)
      }
    },
    keyMap({ shift }) {
      return {
        toggleEnabled: 'c',
        focusSelectedObjects: shift('f'),
        toggleDefaultCameraEnabled: shift('c')
      }
    }
  })

  const editorCameraPosition = $derived(extension.state.position)
  const editorCameraTarget = $derived(extension.state.target)
  const defaultCameraEnabled = $derived(extension.state.defaultCamera.enabled)
  const editorCameraEnabled = $derived(extension.state.enabled)
  const mode = $derived(extension.state.mode)
  const editorCamera = $derived(
    mode === 'Orthographic' ? editorCameraOrthographic : editorCameraPerspective
  )
  const defaultCameraObject = $derived(extension.state.defaultCamera.object)

  watch(camera, (camera) => {
    if (camera !== editorCameraPerspective && camera !== editorCameraOrthographic) {
      extension.setDefaultCameraObject(camera)
    }
  })

  observe(
    () => [defaultCameraObject, editorCameraEnabled, editorCamera],
    ([defaultCameraObject, editorCameraEnabled, editorCamera]) => {
      if (editorCameraEnabled) {
        camera.set(editorCamera)
      } else if (defaultCameraObject) {
        camera.set(defaultCameraObject)
      }
    }
  )

  onDestroy(() => {
    if (defaultCameraObject) camera.set(defaultCameraObject)
  })

  let modes = ['Perspective', 'Orthographic']

  const onModeChange = (mode: string | number | boolean) => {
    if (mode === 'Perspective') extension.setPerspective()
    if (mode === 'Orthographic') extension.setOrthographic()
  }
</script>

<ToolbarItem position="left">
  <HorizontalButtonGroup>
    <ToolbarButton
      onclick={extension.toggleEnabled}
      active={editorCameraEnabled}
      label="Editor Camera"
      icon="mdiCamera"
      tooltip="Editor Camera (C)"
    />

    <ToolbarButton
      onclick={extension.focusSelectedObjects}
      disabled={objectSelection.selectedObjects.length === 0}
      label="Focus Selected"
      icon="mdiImageFilterCenterFocusStrongOutline"
      tooltip="Focus Selected (Shift+F)"
    />

    <DropDownPane title="Settings">
      <RadioGrid
        value={mode}
        values={modes}
        on:change={(e) => {
          onModeChange(e.detail.value)
        }}
      />
      <Checkbox
        value={defaultCameraEnabled}
        label="Default Camera"
        on:change={(e) => {
          extension.setDefaultCameraEnabled(e.detail.value)
        }}
      />
    </DropDownPane>
  </HorizontalButtonGroup>
</ToolbarItem>

{#if editorCameraEnabled}
  {#if mode === 'Perspective'}
    <T is={editorCameraPerspective}>
      <CameraControls
        camera={editorCameraPerspective}
        initialPosition={new Vector3(...editorCameraPosition)}
        initialTarget={new Vector3(...editorCameraTarget)}
        rest={(payload) => {
          extension.setEditorCameraTransform(payload.position.toArray(), payload.target.toArray())
        }}
        cc={(cc) => {
          cameraControls = cc
        }}
      />
    </T>
  {:else if mode === 'Orthographic'}
    <T
      zoom={100}
      is={editorCameraOrthographic}
    >
      <CameraControls
        camera={editorCameraOrthographic}
        initialPosition={new Vector3(...editorCameraPosition)}
        initialTarget={new Vector3(...editorCameraTarget)}
        rest={(payload) => {
          extension.setEditorCameraTransform(payload.position.toArray(), payload.target.toArray())
        }}
        cc={(cc) => {
          cameraControls = cc
        }}
      />
    </T>
  {/if}

  {#if defaultCameraEnabled}
    <DefaultCamera />
  {/if}
{/if}

{@render children?.()}

<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Element, Pane } from 'svelte-tweakpane-ui'
  import {
    Vector2,
    Vector4,
    type Camera,
    type OrthographicCamera,
    type PerspectiveCamera
  } from 'three'
  import Portal from '../../components/Portal.svelte'
  import { useStudio } from '../../internal/extensions.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import { editorCameraScope, type EditorCameraActions, type EditorCameraState } from './types.js'

  const { useExtension } = useStudio()
  const { renderer, canvas, scene, autoRenderTask, invalidate } = useThrelte()

  const editorCameraExtension = useExtension<EditorCameraState, EditorCameraActions, true>(
    editorCameraScope
  )

  const studioObjectsRegistry = useStudioObjectsRegistry()
  const defaultCameraObject = $derived(editorCameraExtension.state.defaultCamera.object)
  const width = $derived(editorCameraExtension.state.defaultCamera.width)
  const height = $derived(editorCameraExtension.state.defaultCamera.height)

  let canvasEl = $state<HTMLCanvasElement | undefined>(undefined)
  const context = $derived(canvasEl ? canvasEl.getContext('2d') : undefined)

  let previousAspect = 0
  const setupPerspectiveCamera = (camera: PerspectiveCamera) => {
    previousAspect = camera.aspect
    // set up perspective cam to be 16/9
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  let previousLeft = 0
  let previousRight = 0
  const updateOrthographicCamera = (camera: OrthographicCamera) => {
    // set up ortho cam to be 16/9
    const frustumHeight = camera.top - camera.bottom
    const aspect = width / height
    previousLeft = camera.left
    previousRight = camera.right
    camera.left = -frustumHeight * aspect
    camera.right = frustumHeight * aspect
    camera.updateProjectionMatrix()
  }

  const updateCamera = (camera: Camera) => {
    if ((camera as any).isPerspectiveCamera) {
      setupPerspectiveCamera(camera as PerspectiveCamera)
    } else if ((camera as any).isOrthographicCamera) {
      updateOrthographicCamera(camera as OrthographicCamera)
    }
  }

  const resetPerspectiveCamera = (camera: PerspectiveCamera) => {
    camera.aspect = previousAspect
    camera.updateProjectionMatrix()
  }

  const resetOrthographicCamera = (camera: OrthographicCamera) => {
    camera.left = previousLeft
    camera.right = previousRight
    camera.updateProjectionMatrix()
  }

  const resetCamera = (camera: Camera) => {
    if ((camera as any).isPerspectiveCamera) {
      resetPerspectiveCamera(camera as PerspectiveCamera)
    } else if ((camera as any).isOrthographicCamera) {
      resetOrthographicCamera(camera as OrthographicCamera)
    }
  }

  const viewport = new Vector4()
  const size = new Vector2()
  let dpr = 0

  const studioObjectsArray = $derived(Array.from(studioObjectsRegistry.objects))

  useTask(
    () => {
      if (!context || !canvasEl) return
      const defaultCamera = defaultCameraObject
      if (!defaultCamera) return

      updateCamera(defaultCamera)

      renderer.getViewport(viewport)
      renderer.getSize(size)

      const setupCanvas = dpr === 0

      dpr = renderer.getPixelRatio()

      if (setupCanvas) {
        canvasEl.width = width * dpr
        canvasEl.height = height * dpr
      }

      // set viewport
      renderer.setViewport(0, 0, width, height)

      for (let index = 0; index < studioObjectsArray.length; index++) {
        const obj = studioObjectsArray[index]
        obj.userData.__threlte_studio_default_camera_visible = obj.visible
        obj.visible = false
      }

      const originalOverrideMaterial = scene.overrideMaterial
      scene.overrideMaterial = null

      renderer.render(scene, defaultCamera)

      scene.overrideMaterial = originalOverrideMaterial

      for (let index = 0; index < studioObjectsArray.length; index++) {
        const obj = studioObjectsArray[index]
        obj.visible = obj.userData.__threlte_studio_default_camera_visible
      }

      // reset viewport
      renderer.setViewport(viewport)

      // draw to canvas
      context.clearRect(0, 0, width * dpr, height * dpr)
      context.drawImage(
        canvas,
        0,
        (size.y - height) * dpr,
        width * dpr,
        height * dpr,
        0,
        0,
        width * dpr,
        height * dpr
      )

      resetCamera(defaultCamera)
    },
    {
      before: autoRenderTask,
      autoInvalidate: false
    }
  )

  onMount(invalidate)
</script>

<Portal>
  <Pane
    position="draggable"
    {width}
    title="Default Camera"
    userExpandable={false}
    expanded
    resizable={false}
    padding='6px'
    storePositionLocally={false}
    x={99999}
    y={99999}
  >
    <Element>
      <canvas
        bind:this={canvasEl}
        style="width: {width}px; height: {height}px; display: block"
      ></canvas>
    </Element>
  </Pane>
</Portal>

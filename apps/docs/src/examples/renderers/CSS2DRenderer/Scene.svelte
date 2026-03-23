<script lang="ts">
  import CounterLabel from './CounterLabel.svelte'
  import CssObject from './CssObject.svelte'
  import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
  import { OrbitControls } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'
  import type { ColorRepresentation, Vector3Tuple } from 'three'

  let { element }: { element: HTMLElement } = $props()

  const { autoRenderTask, camera, scene, size } = useThrelte()

  // note that the renderer won't be reactive if `element` updates
  // you'd have to do `$derived(new CSS2DRenderer({element}))` if you'd want that to be the case
  const cssRenderer = new CSS2DRenderer({ element })

  $effect(() => {
    cssRenderer.setSize($size.width, $size.height)
  })

  // We are running two renderers, and don't want to run
  // updateMatrixWorld twice; tell the renderers that we'll handle
  // it manually.
  // https://threejs.org/docs/#api/en/core/Object3D.updateWorldMatrix
  const last = scene.matrixWorldAutoUpdate
  scene.matrixWorldAutoUpdate = false
  $effect(() => {
    return () => {
      scene.matrixWorldAutoUpdate = last
    }
  })

  // To update the matrices *once* per frame, we'll use a task that is added
  // right before the autoRenderTask. This way, we can be sure that the
  // matrices are updated before the renderers run.
  useTask(
    () => {
      scene.updateMatrixWorld()
    },
    { before: autoRenderTask }
  )

  // The CSS2DRenderer needs to be updated after the autoRenderTask, so we
  // add a task that runs after it.
  useTask(
    () => {
      // Update the DOM
      cssRenderer.render(scene, camera.current)
    },
    {
      after: autoRenderTask,
      autoInvalidate: false
    }
  )

  type CssObjectParams = {
    color: ColorRepresentation
    label: string
    position: Vector3Tuple
  }

  const params: CssObjectParams[] = [
    {
      color: '#4F6FF6',
      label: 'Hello',
      position: [-1, 2, 1]
    },
    {
      color: '#6FF64F',
      label: 'CSS',
      position: [1, 2, 1]
    },
    {
      color: '#F64F6F',
      label: 'Renderer',
      position: [1, 2, -1]
    }
  ]
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh position.y={1}>
  <T.BoxGeometry args={[2, 2, 2]} />
  <T.MeshStandardMaterial color="#F64F6F" />
</T.Mesh>

{#each params as { color, label, position }}
  <CssObject
    {position}
    center={[0, 0.5]}
  >
    {#snippet content()}
      <CounterLabel {label} />
    {/snippet}

    <T.Mesh>
      <T.SphereGeometry args={[0.25]} />
      <T.MeshStandardMaterial {color} />
    </T.Mesh>
  </CssObject>
{/each}

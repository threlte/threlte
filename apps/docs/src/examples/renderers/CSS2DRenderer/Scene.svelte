<script lang="ts">
  import { tick } from 'svelte'
  import { T, useFrame, useRender, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
  import CssObject from './CssObject.svelte'
  import CounterLabel from './CounterLabel.svelte'

  const { scene, size } = useThrelte()

  // Set up the CSS2DRenderer to run in a div placed atop the <Canvas>
  const element = document.querySelector('#css-renderer-target')
  const cssRenderer = new CSS2DRenderer({ element })
  $: cssRenderer.setSize($size.width, $size.height)

  // We are running two renderers, and don't want to run
  // updateMatrixWorld twice; tell the renderers that we'll handle
  // it manually.
  // https://threejs.org/docs/#api/en/core/Object3D.updateWorldMatrix
  scene.matrixWorldAutoUpdate = false

  useRender(async ({ renderer, scene, camera }) => {
    // Flush pending Svelte changes, especially tweening
    await tick()
    // Manually update matrixes for the scene
    scene.updateMatrixWorld()
    // Update the Threlte canvas
    renderer.render(scene, camera.current)
    // Update the DOM
    cssRenderer.render(scene, camera.current)
  })
</script>

<T.PerspectiveCamera makeDefault position={[5, 5, 5]}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh position.y={1}>
  <T.BoxGeometry args={[2, 2, 2]} />
  <T.MeshStandardMaterial color="#F64F6F" />
</T.Mesh>

<CssObject position={[-1, 2, 1]} center={[0, 0.5]}>
  <CounterLabel label="Hello" />

  <T.Mesh slot="three">
    <T.SphereGeometry args={[0.25]} />
    <T.MeshStandardMaterial color="#4F6FF6" />
  </T.Mesh>
</CssObject>

<CssObject position={[1, 2, 1]} center={[0, 0.5]}>
  <CounterLabel label="CSS" />

  <T.Mesh slot="three">
    <T.SphereGeometry args={[0.25]} />
    <T.MeshStandardMaterial color="#6FF64F" />
  </T.Mesh>
</CssObject>

<CssObject position={[1, 2, -1]} center={[0, 0.5]}>
  <CounterLabel label="Renderer" />

  <T.Mesh slot="three">
    <T.SphereGeometry args={[0.25]} />
    <T.MeshStandardMaterial color="#F64F6F" />
  </T.Mesh>
</CssObject>

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

  // Tell ThreeJS renderers not to call scene.updateMatrixWorld() with every
  // render. Since we're running two renderers, this would result in double
  // updates.
  scene.matrixWorldAutoUpdate = false

  useRender(async ({ renderer, scene, camera }) => {
    // 1. Flush any pending svelte changes and element updates, especially tweening.
    // https://svelte.dev/tutorial/tick
    await tick()

    // 2. Tell ThreeJS to update the state of its components based on this new information.
    // Normally this happens as part of a .render() call, but we set matrixWorldAutoUpdate = false
    // in order to avoid both render calls triggering it.
    // https://threejs.org/docs/#api/en/core/Object3D.updateWorldMatrix
    scene.updateMatrixWorld()

    // 3. Tell both renderers to update the canvas and DOM elements on screen.
    renderer.render(scene, camera.current)
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
</CssObject>

<CssObject position={[1, 2, 1]} center={[0, 0.5]}>
  <CounterLabel label="CSS" />
</CssObject>

<CssObject position={[1, 2, -1]} center={[0, 0.5]}>
  <CounterLabel label="Renderer" />
</CssObject>

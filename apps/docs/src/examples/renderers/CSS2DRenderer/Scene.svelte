<script lang="ts">
  import { tick } from 'svelte'
  import { T, useFrame, useRender, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
  import CssObject from './CssObject.svelte'

  // Set up the CSS2DRenderer to run in a div placed atop the <Canvas>
  const element = document.querySelector('#css-renderer-target')
  const cssRenderer = new CSS2DRenderer({ element })

  const { size } = useThrelte()
  $: cssRenderer.setSize($size.width, $size.height)

  useRender(async (ctx) => {
    await tick()
    ctx.renderer?.render(ctx.scene, ctx.camera.current)
    cssRenderer.render(ctx.scene, ctx.camera.current)
  })

  let helloCount = 0;
  let worldCount = 0;

  function clickHello() { helloCount++ }
  function clickWorld() { worldCount++ }
</script>

<T.PerspectiveCamera makeDefault position={[5, 5, 5]}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh position.y={1}>
  <T.BoxGeometry args={[2, 2, 2]} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

<CssObject position={[-1, 2, 1]} center={[0, 0.5]}>
  <button on:click={clickHello}>
    Hello - {helloCount}
  </button>
</CssObject>

<CssObject position={[1, 2, 1]} center={[0, 0.5]}>
  <button on:click={clickWorld}>
    World - {worldCount}
  </button>
</CssObject>

<style>
  button {
    background: rgb(226 232 240);
    border-color: rgb(71 85 105);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    pointer-events: auto;
  }
</style>

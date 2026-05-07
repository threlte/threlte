<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, Slider, Textarea } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { MathUtils } from 'three'

  let options = $state({
    text: 'Hello\nWorld',
    bevelEnabled: true,
    bevelOffset: 0,
    bevelSegments: 20,
    bevelSize: 0.2,
    bevelThickness: 0.1,
    curveSegments: 12,
    depth: 1,
    size: 5,
    smooth: 0.1
  })
</script>

<Pane
  title="Text3DGeometry"
  position="fixed"
>
  <Textarea
    bind:value={options.text}
    label="text"
  />
  <Checkbox
    label="bevelEnabled"
    bind:value={options.bevelEnabled}
  />
  <Slider
    label="bevelOffset"
    bind:value={options.bevelOffset}
    min={0}
    max={2}
  />
  <Slider
    label="bevelSegments"
    bind:value={options.bevelSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="bevelSize"
    bind:value={options.bevelSize}
    min={0}
    max={2}
  />
  <Slider
    label="bevelThickness"
    bind:value={options.bevelThickness}
    min={0}
    max={2}
  />
  <Slider
    label="curveSegments"
    bind:value={options.curveSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="depth"
    bind:value={options.depth}
    min={0}
    max={5}
  />
  <Slider
    label="size"
    bind:value={options.size}
    min={0}
    max={10}
  />
  <Slider
    label="smooth"
    bind:value={options.smooth}
    min={0}
    max={MathUtils.degToRad(180)}
  />
</Pane>

<div>
  <Canvas>
    <Scene {...options} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button, Separator } from 'svelte-tweakpane-ui'
  import { cameraControls, mesh } from './stores'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  let camera

  $: if ($cameraControls) {
    camera = $cameraControls._camera
  }
</script>

<Pane
  title="Camera Controls"
  position="fixed"
>
  <Button
    title="rotate theta 45deg"
    on:click={() => {
      $cameraControls.rotate(45 * DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate theta -90deg"
    on:click={() => {
      $cameraControls.rotate(-90 * DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate theta 360deg"
    on:click={() => {
      $cameraControls.rotate(360 * DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate phi 20deg"
    on:click={() => {
      $cameraControls.rotate(0, 20 * DEG2RAD, true)
    }}
  />
  <Separator />
  <Button
    title="truck(1, 0)"
    on:click={() => {
      $cameraControls.truck(1, 0, true)
    }}
  />
  <Button
    title="truck(0, 1)"
    on:click={() => {
      $cameraControls.truck(0, 1, true)
    }}
  />
  <Button
    title="truck(-1, -1)"
    on:click={() => {
      $cameraControls.truck(-1, -1, true)
    }}
  />
  <Separator />
  <Button
    title="dolly 1"
    on:click={() => {
      $cameraControls.dolly(1, true)
    }}
  />
  <Button
    title="dolly -1"
    on:click={() => {
      $cameraControls.dolly(-1, true)
    }}
  />
  <Separator />
  <Button
    title="zoom `camera.zoom / 2`"
    on:click={() => {
      $cameraControls.zoom(camera.zoom / 2, true)
    }}
  />
  <Button
    title="zoom `- camera.zoom / 2`"
    on:click={() => {
      $cameraControls.zoom(-camera.zoom / 2, true)
    }}
  />
  <Separator />
  <Button
    title="move to ( 3, 5, 2)"
    on:click={() => {
      $cameraControls.moveTo(3, 5, 2, true)
    }}
  />
  <Button
    title="fit to the bounding box of the mesh"
    on:click={() => {
      $cameraControls.fitToBox($mesh, true)
    }}
  />
  <Separator />
  <Button
    title="move to ( -5, 2, 1 )"
    on:click={() => {
      $cameraControls.setPosition(-5, 2, 1, true)
    }}
  />
  <Button
    title="look at ( 3, 0, -3 )"
    on:click={() => {
      $cameraControls.setTarget(3, 0, -3, true)
    }}
  />
  <Button
    title="move to ( 1, 2, 3 ), look at ( 1, 1, 0 )"
    on:click={() => {
      $cameraControls.setLookAt(1, 2, 3, 1, 1, 0, true)
    }}
  />
  <Separator />
  <Button
    title="move to somewhere between ( -2, 0, 0 ) -> ( 1, 1, 0 ) and ( 0, 2, 5 ) -> ( -1, 0, 0 )"
    on:click={() => {
      $cameraControls.lerpLookAt(-2, 0, 0, 1, 1, 0, 0, 2, 5, -1, 0, 0, Math.random(), true)
    }}
  />
  <Separator />
  <Button
    title="reset"
    on:click={() => {
      $cameraControls.reset(true)
    }}
  />
  <Button
    title="saveState"
    on:click={() => {
      $cameraControls.saveState(true)
    }}
  />
  <Separator />
  <Button
    title="disable mouse/touch controls"
    on:click={() => {
      $cameraControls.enabled = false
    }}
  />
  <Button
    title="enable mouse/touch controls"
    on:click={() => {
      $cameraControls.enabled = true
    }}
  />
</Pane>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

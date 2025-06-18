<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Checkbox, Pane, Separator } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import type { CameraControlsRef } from '@threlte/extras'
  import { type Mesh, MathUtils } from 'three'

  let controls = $state.raw<CameraControlsRef>()
  let mesh = $state.raw<Mesh>()

  /**
   * controls.enabled can not be bound to since its not reactive
   */
  let enabled = $state(true)
  $effect(() => {
    if (controls !== undefined) {
      controls.enabled = enabled
    }
  })
</script>

<Pane
  title="Camera Controls"
  position="fixed"
>
  <Button
    title="rotate theta 45deg"
    on:click={() => {
      controls?.rotate(45 * MathUtils.DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate theta -90deg"
    on:click={() => {
      controls?.rotate(-90 * MathUtils.DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate theta 360deg"
    on:click={() => {
      controls?.rotate(360 * MathUtils.DEG2RAD, 0, true)
    }}
  />
  <Button
    title="rotate phi 20deg"
    on:click={() => {
      controls?.rotate(0, 20 * MathUtils.DEG2RAD, true)
    }}
  />
  <Separator />
  <Button
    title="truck(1, 0)"
    on:click={() => {
      controls?.truck(1, 0, true)
    }}
  />
  <Button
    title="truck(0, 1)"
    on:click={() => {
      controls?.truck(0, 1, true)
    }}
  />
  <Button
    title="truck(-1, -1)"
    on:click={() => {
      controls?.truck(-1, -1, true)
    }}
  />
  <Separator />
  <Button
    title="dolly 1"
    on:click={() => {
      controls?.dolly(1, true)
    }}
  />
  <Button
    title="dolly -1"
    on:click={() => {
      controls?.dolly(-1, true)
    }}
  />
  <Separator />
  <Button
    title="zoom `camera.zoom / 2`"
    on:click={() => {
      controls?.zoom(controls.camera.zoom / 2, true)
    }}
  />
  <Button
    title="zoom `- camera.zoom / 2`"
    on:click={() => {
      controls?.zoom(-controls.camera.zoom / 2, true)
    }}
  />
  <Separator />
  <Button
    title="move to ( 3, 5, 2)"
    on:click={() => {
      controls?.moveTo(3, 5, 2, true)
    }}
  />
  <Button
    title="fit to the bounding box of the mesh"
    on:click={() => {
      if (mesh !== undefined) {
        controls?.fitToBox(mesh, true)
      }
    }}
  />
  <Separator />
  <Button
    title="set position to ( -5, 2, 1 )"
    on:click={() => {
      controls?.setPosition(-5, 2, 1, true)
    }}
  />
  <Button
    title="look at ( 3, 0, -3 )"
    on:click={() => {
      controls?.setTarget(3, 0, -3, true)
    }}
  />
  <Button
    title="move to ( 1, 2, 3 ), look at ( 1, 1, 0 )"
    on:click={() => {
      controls?.setLookAt(1, 2, 3, 1, 1, 0, true)
    }}
  />
  <Separator />
  <Button
    title="move to somewhere between ( -2, 0, 0 ) -> ( 1, 1, 0 ) and ( 0, 2, 5 ) -> ( -1, 0, 0 )"
    on:click={() => {
      controls?.lerpLookAt(-2, 0, 0, 1, 1, 0, 0, 2, 5, -1, 0, 0, Math.random(), true)
    }}
  />
  <Separator />
  <Button
    title="reset"
    on:click={() => {
      controls?.reset(true)
    }}
  />
  <Button
    title="saveState"
    on:click={() => {
      controls?.saveState()
    }}
  />
  <Separator />
  <Checkbox
    bind:value={enabled}
    label="enabled"
  />
</Pane>

<Canvas>
  <Scene
    bind:controls
    bind:mesh
  />
</Canvas>

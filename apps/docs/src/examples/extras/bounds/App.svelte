<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox, List, Button, Wheel } from 'svelte-tweakpane-ui'
  import { Suspense } from '@threlte/extras'

  let camera = $state<'perspective' | 'orthographic'>('perspective')
  let controls = $state<'orbit' | 'camera' | 'trackball' | 'none'>('orbit')
  let animate = $state(true)
  let margin = $state(1.5)
  let enabled = $state(true)
  let version = $state(0)
</script>

<Pane
  title=""
  position="fixed"
>
  <List
    label="camera"
    bind:value={camera}
    options={{
      OrthographicCamera: 'orthographic',
      PerspectiveCamera: 'perspective'
    }}
  />
  <List
    label="controls"
    bind:value={controls}
    options={{
      OrbitControls: 'orbit',
      CameraControls: 'camera',
      TrackballControls: 'trackball',
      None: 'none'
    }}
  />
  <Wheel
    bind:value={margin}
    label="margin"
    step={0.1}
  />
  <Checkbox
    bind:value={animate}
    label="animate"
  />
  <Checkbox
    bind:value={enabled}
    label="enabled"
  />
  <Button
    title="Reset scene"
    on:click={() => (version += 1)}
  />
</Pane>

<div>
  {#key version}
    <Canvas>
      <Suspense>
        <Scene
          {camera}
          {controls}
          {margin}
          {animate}
          {enabled}
        />
      </Suspense>
    </Canvas>
  {/key}
</div>

<style>
  div {
    height: 100%;
  }
</style>

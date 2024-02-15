<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Environment } from '@threlte/extras'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Checkbox, Point, Folder, List } from 'svelte-tweakpane-ui'

  let isBackground = true
  let path = '/hdr/Bridge2_cube/'
  let files: string | string[] = [
    'posx.jpg',
    'negx.jpg',
    'posy.jpg',
    'negy.jpg',
    'posz.jpg',
    'negz.jpg'
  ]
  let selection = ''

  $: if (selection != '') {
    switch (selection) {
      case 'cube_ldr':
        path = '/hdr/Bridge2_cube/'
        files = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']
        break
      case 'cube_hdr':
        path = '/hdr/pisaHDR/'
        files = ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr']
        break
      case 'equirect_ldr':
        path = '/hdr/'
        files = 'equirect_ruined_room.jpg'
        break
      case 'equirect_hdr':
        path = '/hdr/'
        files = 'shanghai_riverside_1k.hdr'
        break
      default:
        console.log(`Sorry, we are out of.`)
    }
  }
  let options = {
    cube_ldr: 'cube_ldr',
    cube_hdr: 'cube_hdr',
    equirect_ldr: 'equirect_ldr',
    equirect_hdr: 'equirect_hdr'
  }
  let useGround = true
  let scale = { x: 100, y: 100, z: 100 }
  let radius = 100
  let height = 5
</script>

<Pane
  title="Environment"
  position="fixed"
  expanded={false}
>
  <Folder title="core">
    <Checkbox
      label="isBackground"
      bind:value={isBackground}
    />
  </Folder>
  <Folder title="Ground Projection">
    <List
      bind:value={selection}
      label="scene"
      {options}
    />
    <Checkbox
      label="use ground environment"
      bind:value={useGround}
    />
    <Point
      bind:value={scale}
      label="scale"
    />
    <Slider
      bind:value={radius}
      label="radius"
      min={10}
      max={300}
    />
    <Slider
      bind:value={height}
      label="height"
      min={1}
      max={50}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Environment
      {path}
      {files}
      {isBackground}
      groundProjection={useGround
        ? { radius, height, scale: [scale.x, scale.y, scale.z] }
        : undefined}
    />
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

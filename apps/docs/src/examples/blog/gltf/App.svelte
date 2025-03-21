<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, ThemeUtils, Separator } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let settings = $state({
    wireframe: false,
    background: false,
    border: true,
    enemy: false,
    player: false,
    potion: false,
    turtle: true,
    heart: true,
    runeState: false,
    runeHost: false,
    runeEffect: false
  })
</script>

<div>
  <Canvas>
    <Scene {settings} />
  </Canvas>
</div>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="GLTF file"
>
  <Checkbox
    bind:value={settings.wireframe}
    label="wireframe"
  />
  <Separator />
  <Checkbox
    bind:value={settings.border}
    label="border"
  />
  <Checkbox
    bind:value={settings.heart}
    label="heart"
  />
  <Checkbox
    bind:value={settings.turtle}
    label="turtle"
  />
  <Checkbox
    bind:value={settings.player}
    label="player"
  />
  <Checkbox
    bind:value={settings.enemy}
    label="enemy"
  />
  <Checkbox
    bind:value={settings.potion}
    label="potion"
  />
  <Checkbox
    bind:value={settings.runeHost}
    label="host rune"
  />
  <Checkbox
    bind:value={settings.runeEffect}
    label="effect rune"
  />
</Pane>

<style>
  div {
    height: 100%;
  }
</style>

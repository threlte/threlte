<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ToneMapping, Wrapping } from 'three'
  import { Canvas } from '@threlte/core'
  import { Color, Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import {
    ClampToEdgeWrapping,
    MirroredRepeatWrapping,
    RepeatWrapping,
    ACESFilmicToneMapping,
    AgXToneMapping,
    CineonToneMapping,
    LinearToneMapping,
    NeutralToneMapping,
    NoToneMapping,
    ReinhardToneMapping
  } from 'three'

  const toneMappingOptions: Record<PropertyKey, ToneMapping> = {
    ACESFilmic: ACESFilmicToneMapping,
    AgX: AgXToneMapping,
    Cineon: CineonToneMapping,
    Linear: LinearToneMapping,
    NeutralToneMapping,
    None: NoToneMapping,
    Reinhard: ReinhardToneMapping
  }

  const wrappingOptions: Record<PropertyKey, Wrapping> = {
    ClampToEdge: ClampToEdgeWrapping,
    MirroredRepeat: MirroredRepeatWrapping,
    Repeat: RepeatWrapping
  }

  const canvasWidth = 1024
  const canvasHeight = 1024

  let degrees = $state(0)
  let gradientEndColor = $state('#ffff00')
  let gradientEndX = $state(0)
  let gradientEndY = $state(canvasHeight)
  let gradientStartColor = $state('#ff00ff')
  let gradientStartX = $state(0)
  let gradientStartY = $state(0)
  let sceneBackgroundColor = $state('#000000')
  let sceneToneMapping = $state(AgXToneMapping)
  let textureCenterX = $state(0)
  let textureCenterY = $state(0)
  let textureOffsetX = $state(0)
  let textureOffsetY = $state(0)
  let textureRepeatX = $state(1)
  let textureRepeatY = $state(1)
  let textureWrapS: Wrapping = $state(ClampToEdgeWrapping)
  let textureWrapT: Wrapping = $state(ClampToEdgeWrapping)

  let textureRotation = $derived((Math.PI / 180) * degrees)
</script>

<Pane position="fixed">
  <List
    bind:value={sceneToneMapping}
    options={toneMappingOptions}
    label="tone mapping"
  />
  <Color
    bind:value={sceneBackgroundColor}
    label="background color"
  />
  <Folder title="gradient props">
    <Color
      bind:value={gradientStartColor}
      label="start color"
    />
    <Color
      bind:value={gradientEndColor}
      label="end color"
    />
    <Slider
      bind:value={gradientStartX}
      label="start x"
      min={0}
      max={canvasWidth}
      step={1}
    />
    <Slider
      bind:value={gradientStartY}
      label="start y"
      min={0}
      max={canvasHeight}
      step={1}
    />
    <Slider
      bind:value={gradientEndX}
      label="end x"
      min={0}
      max={canvasWidth}
      step={1}
    />
    <Slider
      bind:value={gradientEndY}
      label="end y"
      min={0}
      max={canvasHeight}
      step={1}
    />
  </Folder>
  <Folder title="texture props">
    <List
      bind:value={textureWrapS}
      label="wrapS"
      options={wrappingOptions}
    />
    <List
      bind:value={textureWrapT}
      label="wrapT"
      options={wrappingOptions}
    />
    <Slider
      label="centerX"
      bind:value={textureCenterX}
      min={-0.5}
      max={1.5}
      step={0.5}
    />
    <Slider
      label="centerY"
      bind:value={textureCenterY}
      min={-0.5}
      max={1.5}
      step={0.5}
    />
    <Slider
      label="offsetX"
      bind:value={textureOffsetX}
      min={-2}
      max={2}
      step={1}
    />
    <Slider
      label="offsetY"
      bind:value={textureOffsetY}
      min={-2}
      max={2}
      step={1}
    />
    <Slider
      label="repeatX"
      bind:value={textureRepeatX}
      min={0}
      max={5}
      step={1}
    />
    <Slider
      label="repeatY"
      bind:value={textureRepeatY}
      min={0}
      max={5}
      step={1}
    />
    <Slider
      label="rotation (degrees)"
      bind:value={degrees}
      min={-360}
      max={360}
      step={1}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {sceneBackgroundColor}
      {gradientEndColor}
      {gradientStartColor}
      {textureCenterX}
      {textureCenterY}
      {textureOffsetX}
      {textureOffsetY}
      {textureRepeatX}
      {textureRepeatY}
      {textureRotation}
      {textureWrapS}
      {textureWrapT}
      {sceneToneMapping}
      {gradientStartX}
      {gradientStartY}
      {gradientEndX}
      {gradientEndY}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

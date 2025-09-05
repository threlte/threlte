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

  const canvasSize = 1024

  let sceneClearColor = $state('#000000')
  let sceneToneMapping = $state(AgXToneMapping)

  let gradientStartColor = $state('#ff00ff')
  let gradientEndColor = $state('#ffff00')
  let gradientStartX = $state(0)
  let gradientStartY = $state(0)
  let gradientEndX = $state(0)
  let gradientEndY = $state(canvasSize)

  let textureCenterX = $state(0)
  let textureCenterY = $state(0)
  let textureOffsetX = $state(0)
  let textureOffsetY = $state(0)
  let textureRepeatX = $state(1)
  let textureRepeatY = $state(1)
  let textureRotationDegrees = $state(0)
  let textureWrapS = $state<Wrapping>(ClampToEdgeWrapping)
  let textureWrapT = $state<Wrapping>(ClampToEdgeWrapping)

  let textureRotation = $derived((Math.PI / 180) * textureRotationDegrees)
</script>

<Pane position="fixed">
  <List
    bind:value={sceneToneMapping}
    options={toneMappingOptions}
    label="tone mapping"
  />
  <Color
    bind:value={sceneClearColor}
    label="clear color"
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
      max={canvasSize}
      step={1}
    />
    <Slider
      bind:value={gradientStartY}
      label="start y"
      min={0}
      max={canvasSize}
      step={1}
    />
    <Slider
      bind:value={gradientEndX}
      label="end x"
      min={0}
      max={canvasSize}
      step={1}
    />
    <Slider
      bind:value={gradientEndY}
      label="end y"
      min={0}
      max={canvasSize}
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
      bind:value={textureRotationDegrees}
      min={-360}
      max={360}
      step={1}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {gradientEndColor}
      {gradientEndX}
      {gradientEndY}
      {gradientStartColor}
      {gradientStartX}
      {gradientStartY}
      {sceneClearColor}
      {sceneToneMapping}
      {textureCenterX}
      {textureCenterY}
      {textureOffsetX}
      {textureOffsetY}
      {textureRepeatX}
      {textureRepeatY}
      {textureRotation}
      {textureWrapS}
      {textureWrapT}
      {canvasSize}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>

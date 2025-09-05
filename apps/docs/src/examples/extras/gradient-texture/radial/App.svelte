<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ToneMapping, Wrapping } from 'three'
  import { Canvas } from '@threlte/core'
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
  import { Checkbox, Color, Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'

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
  const halfCanvasSize = 0.5 * 1024

  // from center to one of the corners
  const diagonal = Math.floor(Math.hypot(halfCanvasSize, halfCanvasSize))

  let sceneClearColor = $state('#000000')
  let sceneToneMapping = $state(AgXToneMapping)

  let gradientStartColor = $state('#ffff00')
  let gradientEndColor = $state('#ff00ff')
  let gradientInnerRadius = $state(0)
  let gradientOuterRadiusNumber = $state(diagonal)
  let gradientUseOuterRadiusAuto = $state(true)

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
  let gradientOuterRadius = $derived<number | 'auto'>(
    gradientUseOuterRadiusAuto ? 'auto' : gradientOuterRadiusNumber
  )
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
      bind:value={gradientInnerRadius}
      label="inner radius"
      min={0}
      max={gradientUseOuterRadiusAuto ? diagonal : gradientOuterRadiusNumber}
      step={1}
    />
    <Checkbox
      bind:value={gradientUseOuterRadiusAuto}
      label="use 'auto' outer radius"
    />
    {#if !gradientUseOuterRadiusAuto}
      <Slider
        bind:value={gradientOuterRadiusNumber}
        label="outer radius"
        min={0}
        max={canvasSize}
        step={1}
        on:change={({ detail }) => {
          gradientInnerRadius = Math.min(detail.value, gradientInnerRadius)
        }}
      />
    {/if}
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
      {gradientInnerRadius}
      {gradientOuterRadius}
      {gradientStartColor}
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

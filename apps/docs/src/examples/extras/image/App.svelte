<script
  lang="ts"
  context="module"
>
  export const brightness = writable(0)
  export const contrast = writable(0)
  export const hue = writable(0)
  export const saturation = writable(0)
  export const lightness = writable(0)
  export const negative = writable(false)
  export const monochromeColor = writable('#ed8922')
  export const monochromeStrength = writable(0)

  export const colorProcessingTexture = writable<VideoTexture | undefined>()
</script>

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Checkbox, Folder, Element, Color } from 'svelte-tweakpane-ui'
  import { writable } from 'svelte/store'
  import { VideoTexture } from 'three'

  let videoTexture: VideoTexture | undefined

  const textureOverrideEnabled = writable(false)

  $: {
    if ($textureOverrideEnabled && videoTexture) {
      videoTexture.source.data.play()
      colorProcessingTexture.set(videoTexture)
    } else {
      colorProcessingTexture.set(undefined)
    }
  }

  function videoAction(node: any) {
    videoTexture = new VideoTexture(node)
    colorProcessingTexture.set(videoTexture)
    return {
      destroy() {
        colorProcessingTexture.set(undefined)
        videoTexture?.dispose()
      }
    }
  }
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<Pane
  title="Image"
  position="fixed"
  expanded={true}
>
  <Folder title="Color processing">
    <Slider
      bind:value={$brightness}
      label="brightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$contrast}
      label="contrast"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$hue}
      label="hue"
      min={0}
      max={1}
    />
    <Slider
      bind:value={$saturation}
      label="saturation"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$lightness}
      label="lightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$monochromeStrength}
      label="monochromeStrength"
      min={0}
      max={1}
    />
    <Color
      bind:value={$monochromeColor}
      label="monochromeColor"
    />
    <Checkbox
      bind:value={$negative}
      label="negative"
    />
  </Folder>
  <Folder title="Texture override">
    <Checkbox
      bind:value={$textureOverrideEnabled}
      label="enabled"
    />
    <Element>
      <video
        use:videoAction
        loop
        crossOrigin="anonymous"
        playsinline
      >
        <source
          src="/video/grunge_texture.mp4"
          type="video/mp4"
        />
      </video>
    </Element>
  </Folder>
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
